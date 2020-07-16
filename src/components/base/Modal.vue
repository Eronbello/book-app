<template lang="pug">
  .modal-simple
    #myModal.modal
      .modal-content
        span.close(@click="$emit('close');") ×
        slot
</template>
<script>
export default {
  props: {
    open: Boolean
  },
  watch: {
    open() {
      this.open ? this.openModal() : this.close();
    }
  },
  methods: {
    openModal() {
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
    },
    close() {
      const modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
  }
};
</script>
<style>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  padding-left: 1rem;
  padding-right: 1rem;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  position: relative;
  max-width: 600px;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  right: 1rem;
  top: 0.3rem;
  position: absolute;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
