<template lang="pug">
  .home
    alert(v-if="isAlertOpen" :message="message" @close="isAlertOpen = false" :color="color")
    .home__header
      #cards.home__list(v-dragscroll.y="false" v-dragscroll.x="true")
        card(background="https://cdn.shopify.com/s/files/1/1038/1798/products/007-hardcover-inside-book-stationery-mockup-psd-presentation-isometric-free.jpg?v=1525178081" title="Availables" @click="filterAvailables")
        card(background="https://cdn.shopify.com/s/files/1/1038/1798/products/007-hardcover-inside-book-stationery-mockup-psd-presentation-isometric-free.jpg?v=1525178081" title="Borroweds" @click="filterBorroweds")
        template(v-for="category in categories")
          card(:background="category.url" :title="category.title" :id="category.id" @click="filterListBooksByCategory")
    .home__view
      modal(:open="isModalOpen" @close="isModalOpen = false")
        modal-book(v-if="isModalOpen" :loading="isLoading" :borrowed_by="selectedBook.borrowed_by" :title="selectedBook.title" :id="selectedBook.id" :description="selectedBook.description" :author="selectedBook.author" :background="selectedBook.background" :category_id="selectedBook.category_id" :category_title="selectedBook.category_title" @click="borrow" buttonText="Borrow")
      h1.view__title  {{ title }}
      .view__content()
        template(v-for="book in books")
          card-book(:available="book.available" :borrowed_by="book.borrowed_by" :title="book.title" :category_id="book.category_id"
          :category_title="book.category_title" :id="book.id" :description="book.description" :author="book.author" :background="book.background" @click="selectBook" :buttonText="book.borrowed_by ? 'Details' : 'Borrow'")
</template>

<script>
import { dragscroll } from "vue-dragscroll";
import { mapGetters, mapActions } from "vuex";
export default {
  directives: {
    dragscroll
  },
  components: {
    Card: () => import("../../components/base/Card"),
    CardBook: () => import("../../components/base/CardBook"),
    Modal: () => import("../../components/base/Modal"),
    ModalBook: () => import("../../components/base/ModalBook"),
    Alert: () => import("../../components/base/Alert")
  },
  data: () => ({
    title: "Top books",
    isModalOpen: false,
    color: "",
    message: "",
    isAlertOpen: false,
    selectedBook: {},
    isLoading: false,
    categories: []
  }),
  mounted() {
    this.getCategories();
    this.stylingCard();
  },
  computed: {
    ...mapGetters("books", ["books"])
  },
  methods: {
    ...mapActions("books", [
      "borrowBook",
      "setDataByCategory",
      "setData",
      "setDataAvailables",
      "setDataBorroweds"
    ]),
    selectBook(book) {
      this.selectedBook = book;
      this.isModalOpen = true;
    },
    filterAvailables() {
      this.title = "Availables";
      this.setDataAvailables();
    },
    filterBorroweds() {
      this.title = "Borroweds";
      this.setDataBorroweds();
    },
    getCategories() {
      this.$http
        .get("/api/v1/categories")
        .then(response => {
          this.categories = [...this.categories, ...response.data.data];
        })
        .catch(() => {});
    },
    filterListBooksByCategory(category) {
      this.setDataByCategory(category.id);
      this.title = category.title;
    },
    borrow(book) {
      this.isLoading = true;
      const { id } = book;
      this.borrowBook(id)
        .then(() => {
          this.refreshStore();
          this.color = "Success";
          this.isModalOpen = false;
          this.title = "Top books";
          this.message = "Successfully added to your library";
          this.isAlertOpen = true;
        })
        .catch(() => {
          this.isModalOpen = false;
          this.color = "Error";
          this.message = "Error adding to your library";
          this.isAlertOpen = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    stylingCard() {
      function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
        document.getElementById("cards").scrollLeft -= delta * 20;
        e.preventDefault();
      }

      if (document.getElementById("cards").addEventListener) {
        // IE9, Chrome, Safari, Opera
        document
          .getElementById("cards")
          .addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
        document
          .getElementById("cards")
          .addEventListener("DOMMouseScroll", scrollHorizontally, false);
      } else {
        // IE 6/7/8
        document
          .getElementById("cards")
          .attachEvent("onmousewheel", scrollHorizontally);
      }
    }
  },
  beforeDestroy() {
    if (this.title !== "Top books") {
      this.setData();
    }
  }
};
</script>
