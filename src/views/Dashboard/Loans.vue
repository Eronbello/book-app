<template lang="pug">
  .loans
    alert(v-if="alertStatus" :message="message" @close="alertStatus = false")
    .loans__view
      modal(:open="modalStatus" @close="close")
        modal-book(v-if="modalStatus" :title="bookSelected.title" :id="bookSelected.id" :description="bookSelected.description" :author="bookSelected.author" :background="bookSelected.background" :category="bookSelected.category" @click="cancel" buttonText="Cancel")
      h1.view__title  {{ title }}
      .view__content()
        template(v-for="book in loans")
          card-book(:title="book.title" :id="book.id" :description="book.description" :author="book.author" :background="book.background" @click="clicked" :category="book.category" :borrowed_by="book.borrowed_by" buttonText="Details")
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
    title: "My loans",
    modalStatus: false,
    bookSelected: {},
    message: "",
    alertStatus: false,
    books: [
      {
        id: "1",
        title: "The water cure",
        author: "Joanne Ramos",
        description: "Description",
        available: true,
        background:
          "https://image.slidesharecdn.com/read-pdf-the-water-cure-full-download-191227170206/95/read-pdf-the-water-cure-full-download-1-638.jpg?cb=1577466155"
      },
      {
        id: "2",
        title: "The water cure",
        author: "Joanne Ramos",
        available: false,
        description: "Description",
        background:
          "https://image.slidesharecdn.com/read-pdf-the-water-cure-full-download-191227170206/95/read-pdf-the-water-cure-full-download-1-638.jpg?cb=1577466155"
      }
    ]
  }),
  computed: {
    ...mapGetters("loans", ["loans"])
  },
  methods: {
    ...mapActions("books", ["setData"]),
    ...mapActions("loans", ["setDataLoan"]),
    ...mapActions("mybooks", ["setDataMyBooks"]),
    clicked(book) {
      this.modalStatus = true;
      this.bookSelected = book;
    },
    filterListBooks(filters) {
      this.title = filters.title;
    },
    close() {
      this.modalStatus = false;
    },
    cancel(book) {
      const { id } = book;
      const user_id = null;
      this.$http
        .post("http://192.168.0.14:3000/api/v1/loans", {
          id,
          user_id
        })
        .then(() => {
          this.setData();
          this.setDataLoan();
          this.setDataMyBooks();
          this.modalStatus = false;
          this.message = "Successfully canceled";
          this.alertStatus = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.loans {
  .loans__header {
    .loans__list {
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .loans__view {
    width: 100%;
    .view__title {
      color: #676767;
      margin: 1rem 1rem;
      font-size: 3rem;
    }
    .view__content {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
    }
  }
}
</style>
