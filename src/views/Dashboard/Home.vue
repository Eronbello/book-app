<template lang="pug">
  .home
    alert(v-if="isAlertOpen" :message="message" @close="isAlertOpen = false" :color="color")
    .home__header
      #cards.home__list(v-dragscroll.y="false" v-dragscroll.x="true")
        template(v-for="category in categories")
          card(:background="category.url" :title="category.title" :id="category.id" @click="filterListBooksByCategory")
    .home__view
      modal(:open="isModalOpen" @close="isModalOpen = false")
        modal-book(v-if="isModalOpen" :loading="isLoading" :borrowed_by="bookSelected.borrowed_by" :title="bookSelected.title" :id="bookSelected.id" :description="bookSelected.description" :author="bookSelected.author" :background="bookSelected.background" :category_id="bookSelected.category_id" :category_title="bookSelected.category_title" @click="borrow" buttonText="Borrow")
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
    bookSelected: {},
    isLoading: false,
    categories: []
  }),
  mounted() {
    this.getCategories();
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
  },
  computed: {
    ...mapGetters("books", ["books"])
  },
  methods: {
    ...mapActions("books", ["setData", "setDataByCategory", "borrowBook"]),
    ...mapActions("loans", ["setDataLoan"]),
    ...mapActions("mybooks", ["setDataMyBooks"]),
    selectBook(book) {
      this.bookSelected = book;
      this.isModalOpen = true;
    },
    getCategories() {
      this.$http
        .get("/api/v1/categories")
        .then(response => {
          this.categories = response.data.data;
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
          this.setData();
          this.setDataLoan();
          this.setDataMyBooks();
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
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .home__header {
    .home__list {
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .home__view {
    width: 100%;
    .view__title {
      color: #676767;
      margin: 50px 1rem;
      font-size: 3rem;
      @media (max-width: 600px) {
        text-align: center;
      }
    }
    .view__content {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
    }
  }
}
</style>
