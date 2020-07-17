<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
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
  }
};
</script>
<style lang="scss">
@import "./styles/global.scss";
</style>
