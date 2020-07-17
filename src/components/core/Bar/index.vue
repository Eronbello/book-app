<template lang="pug">
  .bar
    h1.bar__name {{ name }}
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    search: "Procurar livro"
  }),
  computed: {
    ...mapGetters("user", ["name"])
  }
};
</script>
<style lang="scss" scoped>
.bar {
  width: 100vw;
  height: 65px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  .bar__search {
    margin-left: 1rem;
    margin-right: 20px;
  }
  .bar__name {
    font-size: 1rem;
    margin-right: 2rem;
    color: #676767;
  }
}
</style>
