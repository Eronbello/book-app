<template lang="pug">
.select
  select.select-text(:value="value", @change='onChange($event.target.value)')
    option(v-for='option in options', :value='option.id')
      | {{option.title}}
    span.select-highlight
    span.select-bar
    label.select-label Select

</template>

<script>
export default {
  props: ["value", "options"],
  computed: {
    selected() {
      return this.value;
    }
  },
  methods: {
    onChange(value) {
      if (value === "") {
        value = null;
      }
      this.$emit("input", value);
    }
  }
};
</script>
