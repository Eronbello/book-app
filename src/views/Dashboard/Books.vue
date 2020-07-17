<template lang="pug">
  .home
    .home__view
      modal(:open="modalStatus" @close="close")
        modal-book(v-if="modalStatus" :borrowed_by="bookSelected.borrowed_by" :title="bookSelected.title" :id="bookSelected.id" :description="bookSelected.description" :author="bookSelected.author" :background="bookSelected.background" @click="cancel" :category="bookSelected.category" buttonText="Cancel")
      h1.view__title  {{ title }}
      .view__content()
        template(v-for="book in mybooks")
          card-book(:available="book.available" :borrowed_by="book.borrowed_by" :title="book.title" :id="book.id" :description="book.description" :author="book.author" :background="book.background" :category="book.category  " @click="clicked" buttonText="Details")
</template>

<script>
import { dragscroll } from "vue-dragscroll";
import { mapGetters } from "vuex";
export default {
  directives: {
    dragscroll
  },
  components: {
    Card: () => import("../../components/base/Card"),
    CardBook: () => import("../../components/base/CardBook"),
    Modal: () => import("../../components/base/Modal"),
    ModalBook: () => import("../../components/base/ModalBook")
  },
  data: () => ({
    title: "My books",
    modalStatus: false,
    bookSelected: {},
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
    ...mapGetters("mybooks", ["mybooks"])
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
      this.modalStatus = false;
      console.log(book.id);
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
