<template lang="pug">
  .login
    alert(v-if="alertStatus" :message="message" @close="alertStatus = false" :color="color")
    .login__card
      .card__form
        img.card__logo(:src="logo")
        h4 Login
        b-input(v-model="email" type="text" id="email" label="E-mail")
        b-input(v-model="password" type="password" id="password" label="Password")
        b-button.form__action(:loading="loading"  @click="handleAuth") Login
        b-button.form__action(@click="$router.push('/register')") Create account
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {
    Alert: () => import("../../components/base/Alert"),
    BButton: () => import("../../components/base/Button"),
    BInput: () => import("../../components/base/Input")
  },
  data: () => ({
    logo: require("../../assets/logo-login.png"),
    loading: false,
    email: "",
    password: "",
    alertStatus: false,
    color: "Error",
    message: "Invalid email or password"
  }),
  methods: {
    ...mapActions("user", ["setUserData"]),
    ...mapActions("books", ["setData"]),
    ...mapActions("loans", ["setDataLoan"]),
    ...mapActions("mybooks", ["setDataMyBooks"]),
    async handleAuth() {
      if (!this.email || !this.password) {
        this.alertStatus = true;
        this.message = "All fields are required";
        return;
      }
      this.loading = true;
      const body = {
        email: this.email,
        password: this.password
      };
      this.$http
        .post("/auth/login", body)
        .then(({ data }) => {
          if (data.user) {
            this.setUserData(data.user);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("id", data.user.id);
            this.$http.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${sessionStorage.getItem("token")}`;
            this.setDataLoan();
            this.setData();
            this.setDataMyBooks();
            this.$router.push("/");
            this.loading = false;
          } else {
            this.message = data.error;
            this.alertStatus = true;
            this.loading = false;
          }
        })
        .catch(err => {
          this.message = err;
          this.alertStatus = true;
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/background-login.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: flex-end;
  position: relative;
  .login__card {
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
