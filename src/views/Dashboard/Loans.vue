<template lang="pug">
  .home
    alert(v-if="alertStatus" :message="message" @close="alertStatus = false" :color="color")
    .home__view
      modal(:open="modalStatus" @close="close")
        modal-book(v-if="modalStatus" :loading="loading" :title="bookSelected.title" :id="bookSelected.id" :description="bookSelected.description" :author="bookSelected.author" :background="bookSelected.background" :category_id="bookSelected.category_id" :category_title="bookSelected.category_title" @click="cancel" buttonText="Cancel")
      h1.view__title  {{ title }}
      .view__content()
        template(v-for="book in loans")
          card-book(:title="book.title" :id="book.id" :description="book.description" :author="book.author" :background="book.background" @click="clicked" :category_id="book.category_id" :category_title="book.category_title" :borrowed_by="book.borrowed_by" buttonText="Details")
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    Card: () => import("../../components/base/Card"),
    CardBook: () => import("../../components/base/CardBook"),
    Modal: () => import("../../components/base/Modal"),
    ModalBook: () => import("../../components/base/ModalBook"),
    Alert: () => import("../../components/base/Alert")
  },
  data: () => ({
    title: "My library",
    modalStatus: false,
    bookSelected: {},
    loading: false,
    message: "",
    color: "",
    alertStatus: false
  }),
  computed: {
    ...mapGetters("loans", ["loans"])
  },
  methods: {
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
      this.loading = true;
      const { id } = book;
      const user_id = null;
      this.$http
        .post("/api/v1/loans", {
          id,
          user_id
        })
        .then(() => {
          this.refreshStore();
          this.modalStatus = false;
          this.color = "Success";
          this.message = "Successfully canceled";
          this.loading = false;
          this.alertStatus = true;
        })
        .catch(() => {
          this.loading = false;
          this.modalStatus = false;
          this.color = "Error";
          this.message = "Error canceled";
          this.alertStatus = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.view__title {
  font-size: 3rem;
}
</style>
