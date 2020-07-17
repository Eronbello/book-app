<template lang="pug">
  .home
    .home__header
      #cards.home__list(v-dragscroll.y="false" v-dragscroll.x="true")
        card(background="https://definicao.net/wp-content/uploads/2019/05/roxo-3.jpg" title="Available" url="api/available" @click="filterListBooks")
    .home__view
      modal(:open="modalStatus" @close="close")
        modal-book(v-if="modalStatus" :title="bookSelected.title" :id="bookSelected.id" :description="bookSelected.description" :author="bookSelected.author" :background="bookSelected.background" :category="bookSelected.category" @click="clicked")
      h1.view__title  {{ title }}
      .view__content()
        template(v-for="book in all")
          card-book(:available="book.available" :title="book.title" :category="book.category" :id="book.id" :description="book.description" :author="book.author" :background="book.background" @click="clicked")
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
    title: "Top books",
    modalStatus: false,
    bookSelected: {}
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
    clicked(book) {
      this.modalStatus = true;
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
      margin: 50px 1rem;
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
