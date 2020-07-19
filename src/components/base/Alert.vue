<template lang="pug">
.alert(:style="{ backgroundColor: color === 'Success' ? '#26a69a' : '#ef6a6a'}")
  .alert__content(@click="controlVisibility")
    .content__action X
    .content_text {{ message }}
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "Success"
    },
    message: {
      type: String,
      default: ""
    },
    closeAutomatically: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.closeAutomatically) {
        this.controlVisibility();
        this.$emit("close");
      }
    }, 2000);
  },
  methods: {
    controlVisibility() {
      const element = document.getElementsByClassName("alert");
      if (element[0]) {
        element[0].classList.add("alert--close");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/* The alert message box */
.alert {
  position: fixed;
  z-index: 15;
  top: 0px;
  width: 100%;
  padding: 1rem;
  color: white;
  align-items: center;
  margin-bottom: 15px;
  animation-name: moveInBottom;
  animation-duration: 1s;
  @media (max-width: 960px) {
    width: calc(100vw);
  }
  &--close {
    display: none;
  }
  .alert__content {
    position: relative;
    width: 100%;
    .content__action {
      position: absolute;
      right: 0;
    }
    .content_text {
      text-align: center;
    }
  }
}

/* The close button */
@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }

  80% {
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
