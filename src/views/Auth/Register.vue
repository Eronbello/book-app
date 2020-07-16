<template lang="pug">
  .register
    .register__title Bem-vindo a Estante Virtual
    .register__card
      .card__form
        img.card__logo(src="https://cdn3.vectorstock.com/i/1000x1000/60/97/abstract-book-logo-icon-vector-24016097.jpg")
        h4 Register
        .input-container
          input#password.input(type='password', pattern='.+', required='')
          label.label(for='password') Nome
        .input-container
          input#email.input(name="email" type='text', pattern='.+', required='')
          label.label(for='email') E-mail
        .input-container
          input#password.input(type='password', pattern='.+', required='')
          label.label(for='password') Senha
        //- .form__forgot Esqueceu sua senha?
        button.form__action(@click="$router.push('/login')") Voltar
        button.form__action(@click="$router.push('/register')") Criar conta
</template>

<script>
export default {
  methods: {
    goToRegister() {
      this.$router.push("/register");
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
