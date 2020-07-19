<template lang="pug">
  .register
    alert(v-if="alertStatus" :message="message" @close="alertStatus = false" :color="color")
    .register__card
      .card__form
        img.card__logo(src="https://cdn3.vectorstock.com/i/1000x1000/60/97/abstract-book-logo-icon-vector-24016097.jpg")
        h4 Register
        .input-container
        b-input(v-model="name" type="text" id="name" label="Name")
        b-input(v-model="email" type="text" id="email" label="E-mail")
        b-input(v-model="password" type="password" id="password" label="Password")
        b-button.form__action(:loading="loading" @click="handleCreateUser") Create account
        b-button.form__action(:loading="loading" @click="$router.push('/login')") Back
</template>

<script>
export default {
  components: {
    Alert: () => import("../../components/base/Alert"),
    BButton: () => import("../../components/base/Button"),
    BInput: () => import("../../components/base/Input")
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    loading: false,
    alertStatus: false,
    color: "Error",
    message: "Dados Inválidos"
  }),
  methods: {
    async handleCreateUser() {
      if (!this.name || !this.email || !this.password) {
        this.alertStatus = true;
        this.message = "All fields are required";
        return;
      }
      const body = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      try {
        const { data } = await this.$http.post("/api/v1/user", body);
        if (data) {
          this.$router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/background-login.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: flex-end;
  position: relative;
  .register__title {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    color: white;
    font-size: 2rem;
    font-weight: 300;
  }
  .register__card {
    width: 500px;
    position: relative;
    background-color: white;
    justify-content: center;
    align-items: center;
    height: 100vh;
    display: flex;
    padding: 0 3rem;
    .card__logo {
      width: 100px;
      margin-bottom: 50px;
      margin-left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
    }
    .card__form {
      display: flex;
      flex-direction: column;
      width: 100%;
      h4 {
        margin-bottom: 2rem;
        font-weight: 300;
      }
      p {
        margin-bottom: 1rem;
        margin-bottom: 3rem;
        font-weight: 300;
      }
      .form__forgot {
        color: #868e96;
        font-size: 0.7rem;
        padding: 20px 0;
      }
      .form__action {
        margin-top: 20px;
      }
    }
    @media (max-width: 700px) {
      width: 100%;
    }
  }
}
</style>
