<template lang="pug">
  .home
    alert(v-if="alertStatus" :message="message" @close="alertStatus = false" :color="color")
    .home__header
      #cards.home__list(v-dragscroll.y="false" v-dragscroll.x="true")
        template(v-for="filter in filters")
          card(:background="filter.background" :title="filter.title" :url="filter.url" @click="filterListBooks")
    .home__view
      modal(:open="modalStatus" @close="close")
        modal-book(v-if="modalStatus" :loading="loading" :borrowed_by="bookSelected.borrowed_by" :title="bookSelected.title" :id="bookSelected.id" :description="bookSelected.description" :author="bookSelected.author" :background="bookSelected.background" :category="bookSelected.category" @click="borrow" buttonText="Borrow")
      h1.view__title  {{ title }}
      .view__content()
        template(v-for="book in all")
          card-book(:available="book.available" :borrowed_by="book.borrowed_by" :title="book.title" :category="book.category" :id="book.id" :description="book.description" :author="book.author" :background="book.background" @click="selectBook" :buttonText="book.borrowed_by ? 'Details' : 'Borrow'")
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
    modalStatus: false,
    color: "",
    message: "",
    alertStatus: false,
    bookSelected: {},
    loading: false,
    filters: [
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/v1/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      },
      {
        background:
          "https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg",
        title: "Available",
        url: "api/available"
      }
    ]
  }),
  mounted() {
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
    ...mapGetters("books", ["all"])
  },
  methods: {
    ...mapActions("books", ["setData"]),
    ...mapActions("loans", ["setDataLoan"]),
    ...mapActions("mybooks", ["setDataMyBooks"]),
    selectBook(book) {
      this.bookSelected = book;
      this.modalStatus = true;
    },
    filterListBooks(filter) {
      console.log(filter);
      this.title = filter.title;
    },
    borrow(book) {
      this.loading = true;
      const { id } = book;
      const user_id = sessionStorage.getItem("id");
      this.$http
        .post("http://192.168.0.14:3000/api/v1/loans", {
          id,
          user_id
        })
        .then(() => {
          this.setData();
          this.setDataLoan();
          this.setDataMyBooks();
          this.color = "Success";
          this.modalStatus = false;
          this.message = "Successfully added to your library";
          this.alertStatus = true;
          this.loading = true;
        })
        .catch(() => {
          this.modalStatus = false;
          this.color = "Error";
          this.message = "Error adding to your library";
          this.alertStatus = true;
          this.loading = true;
        });
    },
    close() {
      this.modalStatus = false;
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
