<template lang="pug">
  button.card(v-bind:style="{ backgroundImage: 'url(' + background + ')' }" @click="$emit('click', {title, id})")
    h1.card__title {{ title }}
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
    background: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: inline-block;
  width: 300px;
  position: relative;
  height: 200px;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  margin: 1rem;
  transition: all 0.2s;
  -webkit-box-shadow: 10px 10px 16px 0px rgba(189, 189, 189, 1);
  -moz-box-shadow: 10px 10px 16px 0px rgba(189, 189, 189, 1);
  box-shadow: 10px 10px 16px 0px rgba(189, 189, 189, 1);
  .card__title {
    position: absolute;
    bottom: 2rem;
    font-size: 1.6rem;
    left: 2rem;
    color: white;
  }
  &:hover {
    -webkit-box-shadow: 5px 5px 11px 0px rgba(189, 189, 189, 1);
    -moz-box-shadow: 5px 5px 11px 0px rgba(189, 189, 189, 1);
    box-shadow: 5px 5px 11px 0px rgba(189, 189, 189, 1);
    transform: translateY(-2px);
  }
  &:focus {
    outline: none !important;
  }
  &:active {
    transform: translateY(10px);
    outline: none !important;
  }
}
</style>
