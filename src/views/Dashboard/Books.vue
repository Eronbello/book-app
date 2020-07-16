<template lang="pug">
  .home
    .home__view
      modal(:open="modalStatus" @close="close")
        modal-book(v-if="modalStatus" :title="bookSelected.title" :id="bookSelected.id" :description="bookSelected.description" :author="bookSelected.author" :background="bookSelected.background" @click="clicked")
      h1.view__title  {{ title }}
      .view__content()
        template(v-for="book in books")
          card-book(:available="book.available" :title="book.title" :id="book.id" :description="book.description" :author="book.author" :background="book.background" @click="clicked")
</template>

<script>
import { dragscroll } from "vue-dragscroll";
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
  methods: {
    clicked(book) {
      this.modalStatus = true;
      console.log(book);
      this.bookSelected = book;
    },
    filterListBooks(filters) {
      this.title = filters.title;
    },
    close() {
      this.modalStatus = false;
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
