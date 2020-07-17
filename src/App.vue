<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("id")) {
      this.setUserByID();
      this.setData();
    }
  },
  watch: {
    $route() {
      const token = sessionStorage.getItem("token");
      const { path } = this.$router.history.current;
      if (path === "/register" || path === "/login") {
        return;
      }
      if (!token) {
        this.$router.push("/login");
      }
    }
  },
  methods: {
    ...mapActions("books", ["setData"]),
    ...mapActions("user", ["setUserByID"])
  }
};
</script>
<style lang="scss">
@import "./styles/global.scss";
</style>
