<template lang="pug">
  .bar
    button(@click="logout").bar__logout
      img(src="../../../assets/turn-off.png")
    h1.bar__name {{ '' || name }}
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["name"])
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
.bar {
  width: 100vw;
  height: 65px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  .bar__search {
    margin-left: 1rem;
    margin-right: 20px;
  }
  .bar__logout {
    margin-left: 1rem;
    margin-right: 20px;
    width: 3rem;
    height: 3rem;
    background-color: white;
    border-radius: 200px;
    img {
      height: 1.5rem;
    }
  }
  .bar__name {
    font-size: 1rem;
    margin-right: 2rem;
    color: #676767;
  }
}
</style>
