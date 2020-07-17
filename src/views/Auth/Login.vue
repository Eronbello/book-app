<template lang="pug">
  .login
    .login__title Bem-vindo á Estante Virtual
    .login__card
      .card__form
        img.card__logo(src="https://cdn3.vectorstock.com/i/1000x1000/60/97/abstract-book-logo-icon-vector-24016097.jpg")
        h4 Login
        .input-container
          input#email.input(v-model="email" name="email" type='text', pattern='.+', required='')
          label.label(for='email') E-mail
        .input-container
          input#password.input(v-model="password" type='password', pattern='.+', required='')
          label.label(for='password') Senha
        //- .form__forgot Esqueceu sua senha?
        button.form__action(@click="handleAuth") Entrar
        button.form__action(@click="$router.push('/register')") Criar conta
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    ...mapActions("user", ["setUserData"]),
    async handleAuth() {
      const body = {
        email: this.email,
        password: this.password
      };
      try {
        const { data } = await this.$http.post(
          "http://localhost:3000/auth/login",
          body
        );
        if (data.user) {
          this.setUserData(data.user);
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("id", data.user.id);
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
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
  .login__title {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    color: white;
    font-size: 2rem;
    font-weight: 300;
  }
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
