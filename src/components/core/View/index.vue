<template lang="pug">
  .view
    //- transition(name="fade" mode="out-in")
    router-view
</template>

<style lang="scss" scoped>
.view {
  margin-left: 250px;
  height: calc(100vh - 65px);
  overflow-y: auto;
  @media (max-width: 960px) {
    margin-left: 0;
  }
}
.router-link-active {
  color: red;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.3 ease;
  opacity: 0;
}
</style>
