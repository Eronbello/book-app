<template lang="pug">
  .home
    alert(v-if="alertStatus" :message="message" @close="alertStatus = false" :color="color")
    .home__view
      modal(:open="modalStatus" @close="close")
        modal-create-book(:loading="loading" @click="save" v-if="modalStatusCreate")
        modal-book(v-if="modalStatus && !modalStatusCreate" :loading="loading" :borrowed_by="bookSelected.borrowed_by" :title="bookSelected.title" :id="bookSelected.id" :description="bookSelected.description" :author="bookSelected.author" :background="bookSelected.background" @click="cancel" :category_title="bookSelected.category_title" :category_id="bookSelected.category_id" buttonText="Cancel")
      .view__title  
        h1 {{ title }}
        button(@click="modalStatusCreate = true; modalStatus = true") ADD BOOK
      .view__content()
        template(v-for="book in mybooks")
          card-book(:available="book.available" :borrowed_by="book.borrowed_by" :title="book.title" :id="book.id" :description="book.description" :author="book.author" :background="book.background" :category_id="book.category_id" 
          :category_title="book.category_title" @click="clicked" buttonText="Edit")
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
    ModalCreateBook: () => import("../../components/base/ModalCreateBook"),
    Alert: () => import("../../components/base/Alert"),
    BButton: () => import("../../components/base/Button")
  },
  data: () => ({
    title: "My books",
    modalStatusCreate: false,
    modalStatus: false,
    loading: false,
    bookSelected: {},
    message: "",
    color: "",
    alertStatus: false
  }),
  computed: {
    ...mapGetters("mybooks", ["mybooks"])
  },
  methods: {
    ...mapActions("books", ["setData"]),
    ...mapActions("loans", ["setDataLoan"]),
    ...mapActions("mybooks", ["setDataMyBooks"]),
    clicked(book) {
      this.modalStatus = true;
      console.log(book);
      this.bookSelected = book;
    },
    filterListBooks(filters) {
      this.title = filters.title;
    },
    close() {
      this.modalStatusCreate = false;
      this.modalStatus = false;
    },
    save(book) {
      this.loading = true;
      const user_id = sessionStorage.getItem("id");
      const data = {
        title: book.title,
        author: book.author,
        description: book.description,
        category_id: book.category_id,
        background: book.background,
        available: false,
        user_id: user_id
      };
      this.$http
        .post("http://192.168.0.14:3000/api/v1/book", data)
        .then(() => {
          this.setData();
          this.setDataLoan();
          this.setDataMyBooks();
          this.modalStatus = false;
          this.color = "Success";
          this.message = "Added successfully";
          this.alertStatus = true;
          this.loading = false;
          this.modalStatusCreate = false;
        })
        .catch(() => {
          this.loading = false;
          this.modalStatus = false;
          this.color = "Error";
          this.message = "Error adding";
          this.alertStatus = true;
          this.modalStatusCreate = false;
        });
    },
    cancel(book) {
      this.loading = true;
      const { id } = book;
      this.$http
        .delete(`http://192.168.0.14:3000/api/v1/book/${id}`)
        .then(() => {
          this.setData();
          this.setDataLoan();
          this.setDataMyBooks();
          this.modalStatus = false;
          this.color = "Success";
          this.message = "Successfully canceled";
          this.alertStatus = true;
          this.loading = false;
        })
        .catch(() => {
          this.modalStatus = false;
          this.color = "Error";
          this.message = "Error canceled";
          this.alertStatus = true;
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
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
      margin: 1rem 1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      @media (max-width: 600px) {
        flex-direction: column;
        h1 {
          margin-bottom: 15px;
        }
      }
      h1 {
        font-size: 3rem;
      }
      button {
        width: 200px;
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
