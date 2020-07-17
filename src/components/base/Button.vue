<template lang="pug">
  button(@click="$emit('click')" :disabled="loading || disabled")
    .loading(v-if="loading")
      i.fa.fa-spinner.fa-spin()
    slot(v-else)
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  i {
    font-size: 23px;
  }
}
</style>
