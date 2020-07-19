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
import isValid from "../../utils/validateBook";
import { mapGetters, mapActions } from "vuex";
export default {
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
    ...mapActions("mybooks", ["createBook", "deleteBook"]),
    clicked(book) {
      this.modalStatus = true;
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
      if (!isValid(book)) {
        this.loading = false;
        this.color = "Error";
        this.message = "All fields are required";
        this.alertStatus = true;
        return;
      }
      this.createBook(data)
        .then(() => {
          this.refreshStore();
          this.modalStatus = false;
          this.color = "Success";
          this.message = "Added successfully";
          this.alertStatus = true;
          this.loading = false;
          this.modalStatusCreate = false;
        })
        .catch(() => {
          this.loading = false;
          this.color = "Error";
          this.message = "Error adding";
          this.alertStatus = true;
          this.modalStatus = false;
          this.modalStatusCreate = false;
        });
    },
    cancel(book) {
      this.loading = true;
      const { id } = book;
      this.deleteBook(id)
        .then(() => {
          this.refreshStore();
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
