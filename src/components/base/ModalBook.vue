<template lang="pug">
  .modal-book
    .modal__title {{ title }}
    .modal__content
      .content__image
        img(:src="background")
      .content__details
        .details__author Author: {{ author }}
        .details__author Category: {{ category_title }}
        .details__description Description: {{ description }}
    .modal__action
      b-button(:loading="loading" :disabled="!!borrowed_by" @click="$emit('click', {id})") {{ buttonText }}
      //- button.modal__action--borrow(:disabled="!!borrowed_by" @click="$emit('click', {id})")
</template>
<script>
export default {
  components: {
    BButton: () => import("../../components/base/Button")
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    category_id: {
      type: Number,
      required: true
    },
    category_title: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: false
    },
    description: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: false
    },
    borrowed_by: {
      type: Number,
      required: false
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
    .content__image {
      width: 30%;
      height: 100%;
      padding: 1rem;
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
