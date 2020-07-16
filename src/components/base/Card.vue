<template lang="pug">
  .card(v-bind:style="{ backgroundImage: 'url(' + background + ')' }" @click="$emit('click', {title, url})")
    h1.card__title {{ title }}
</template>

<script>
export default {
  props: {
    url: {
      type: String,
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
  border-radius: 20px;
  margin: 1rem;
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
}
</style>
