<template lang="pug">
  .card-book
    .card_book__content
      button.card_book__background(@click="$emit('click', {id, title, author, description, background, category_id, borrowed_by, category_title})" v-bind:style="{ backgroundImage: 'url(' + background + ')' }")
        .details__borrowed(v-if="borrowed_by") Borrowed
      .card_book__details
        .details__name {{ title }}
        .details__author {{ author }}
        .details__author {{ category_title }}
        .details__description {{ shortDescription }}
        button.details__button(@click="$emit('click', {id, title, author, description, background, category_id, borrowed_by, category_title})") {{ buttonText }}
</template>

<script>
export default {
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
    description: {
      type: String,
      required: true
    },
    background: {
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
    buttonText: {
      type: String,
      required: true
    },
    borrowed_by: {
      type: Number,
      required: false
    }
  },
  computed: {
    shortDescription() {
      return this.description.substr(0, 25) + "...";
    }
  }
};
</script>

<style lang="scss" scoped>
.card-book {
  flex: 1;
  height: 270px;
  display: flex;
  min-width: 340px;
  max-width: 400px;
  flex-direction: row;
  margin: 1rem;
  .card_book__content {
    flex: 1;
    display: flex;
    .card_book__background {
      position: relative;
      flex: 0.5;
      height: 100%;
      transition: box-shadow 1s;
      border-radius: 1rem;
      background-position: center;
      background-size: cover;
      -webkit-box-shadow: 10px 10px 16px 0px rgba(189, 189, 189, 1);
      -moz-box-shadow: 10px 10px 16px 0px rgba(189, 189, 189, 1);
      box-shadow: 10px 10px 16px 0px rgba(189, 189, 189, 1);
      &:hover {
        cursor: pointer;
        -webkit-box-shadow: 5px 5px 8px 0px rgba(189, 189, 189, 1);
        -moz-box-shadow: 5px 5px 8px 0px rgba(189, 189, 189, 1);
        box-shadow: 5px 10px 8px 0px rgba(189, 189, 189, 1);
      }
      &:active {
        transform: translateY(5px);
      }
      .details__borrowed {
        background-color: #ef6a6a;
        color: white;
        padding: 1rem;
        text-align: center;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
    }
    .card_book__details {
      display: flex;
      flex: 0.5;
      justify-content: space-between;
      flex-direction: column;
      padding: 2rem 1rem;
      .details__description {
        font-size: 1rem;
        color: #b6c4c6;
        width: 70%;
      }
      .details__name {
        font-size: 1.5rem;
        font-weight: 800;
        color: #676767;
      }
      .details__author {
        font-size: 1rem;
        color: #b6c4c6;
      }
      .details__button {
        height: 35px;
        border-radius: 200px;
        width: 70%;
        background-color: #ecf4f8;
        color: #40bac4;
        border: 0;
        &:disabled {
          color: white;
          background-color: #dcdcdc;
        }
      }
    }
  }
}
</style>
