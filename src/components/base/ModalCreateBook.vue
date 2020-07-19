<template lang="pug">
  .modal-book
    .modal__title New Book
    .modal__content
      .content__image
        h4 Preview
        img(:src="background")
      .content__details
        b-input(v-model="title" type="text" id="name" label="Title")
        b-input(v-model="author" type="text" id="author" label="Author")
        b-input(v-model="description" type="text" id="description" label="Description")
        b-input(v-model="background" type="text" id="background" label="Background")
        b-select(v-model="category_id" :options="categories")
    .modal__action
      b-button(:loading="loading"  @click="$emit('click', {author, title, category_id, description, background})") Save
</template>
<script>
export default {
  components: {
    BButton: () => import("../../components/base/Button"),
    BInput: () => import("../../components/base/Input"),
    BSelect: () => import("../../components/base/Select")
  },
  data: () => ({
    author: "",
    title: "",
    category_id: "",
    description: "",
    categories: [],
    background: ""
  }),
  props: {
    loading: {
      type: Boolean,
      required: false
    }
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.$http
        .get("/api/v1/categories")
        .then(response => {
          this.categories = response.data.data;
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-book {
  display: flex;
  color: #676767;
  flex-direction: column;
  .modal__title {
    height: 4rem;
    width: 100%;
    background-color: #40bac4;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 700;
    font-size: 2rem;
  }
  .modal__content {
    width: 100%;
    display: flex;
    flex-direction: row;
    @media (max-width: 600px) {
      .content__image {
        display: none;
      }
      .content__details {
        width: 100% !important;
      }
    }
    .content__image {
      width: 30%;
      height: 100%;
      padding: 1rem;
      h4 {
        text-align: center;
      }
      img {
        width: 100%;
      }
    }
    .content__details {
      width: 70%;
      padding: 1rem;
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .modal__action {
    height: 3rem;
    padding: 2rem 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: 100%;
    }
  }
  .modal__action--cancel {
    background-color: #ef6a6a;
    color: white !important;
  }
}
</style>
