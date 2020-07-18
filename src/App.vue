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
      this.$http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      this.setDataLoan();
      this.setUserByID();
      this.setData();
      this.setDataMyBooks();
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
    ...mapActions("user", ["setUserByID"]),
    ...mapActions("loans", ["setDataLoan"]),
    ...mapActions("mybooks", ["setDataMyBooks"])
  }
};
</script>
<style lang="scss">
@import "./styles/_global.scss";
</style>
