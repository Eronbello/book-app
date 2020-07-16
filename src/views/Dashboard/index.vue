<template lang="pug">
  .dashboard
    sidebar-core
    .dashboard__content
      bar-core
      view-core
</template>

<script>
export default {
  name: "index",

  components: {
    SidebarCore: () => import("../../components/core/Sidebar/"),
    ViewCore: () => import("../../components/core/View/"),
    BarCore: () => import("../../components/core/Bar/")
  },

  data: () => ({
    expandOnHover: false
  })
};
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: row;
  .dashboard__content {
    flex-direction: column;
  }
}
</style>
