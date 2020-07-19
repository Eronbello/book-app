<template lang="pug">
  .input-container
    input.input(:id="id" :type='type', :value="value" ref="input" required='' @input="updateValue()")
    label.label(:for='id') {{ label }}
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    updateValue() {
      this.$emit("input", this.$refs.input.value);
    }
  }
};
</script>
