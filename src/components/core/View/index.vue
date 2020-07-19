<template lang="pug">
  .view
    router-view
</template>

<style lang="scss" scoped>
.view {
  margin-left: 250px;
  height: calc(100vh - 65px);
  width: calc(100vw - 250px);
  overflow-y: auto;
  @media (max-width: 960px) {
    margin-left: 0;
    width: calc(100vw);
  }
}
</style>
