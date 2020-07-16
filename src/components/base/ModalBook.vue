<template lang="pug">
  .modal-book
    .modal__title {{ title }}
    .modal__content
      .content__image
        img(:src="background")
      .content__details
        .details__author Author: {{ author }}
        .details__description Description: {{ description }}
    .modal__action
      button.modal__action--borrow(v-if="!userId") Borrow
      button.modal__action--cancel(v-else) Cancel
</template>
<script>
export default {
  props: {
    id: {
      type: String,
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
    description: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    },
    userId: {
      type: String,
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
    background-color: #febcd9;
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
      height: 35px;
      border-radius: 200px;
      width: 100%;
      color: #40bac4;
      border: 0;
    }
  }
  .modal__action--borrow {
    background-color: #ecf4f8;
  }
  .modal__action--cancel {
    background-color: #ef6a6a;
    color: white !important;
  }
}
</style>
