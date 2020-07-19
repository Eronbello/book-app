<template lang="pug">
  .sidebar
    nav.menu(tabindex='0' @focusout="close")
      .smartphone-menu-trigger(@click="controlMenu")
      h1.sidebar__title Books
      h2.sidebar__sub-title DISCOVER
      ul.sidebar__list
        router-link(to="/" exact-active-class="sidebar__item--active" v-on:click.native="controlMenu").sidebar__item
          i.sidebar__icon.fa.fa-home
          | Home
      h2.sidebar__sub-title LIBRARY
      ul.sidebar__list
        router-link(to="/books" exact-active-class="sidebar__item--active"  v-on:click.native="controlMenu").sidebar__item
          i.sidebar__icon.fa.fa-home
          | My books
        router-link(to="/loans" exact-active-class="sidebar__item--active" v-on:click.native="controlMenu").sidebar__item
          i.sidebar__icon.fa.fa-home
          | My library
</template>

<script>
export default {
  methods: {
    controlMenu() {
      const width = window.innerWidth;
      if (width > 960) {
        return;
      }
      const element = document.getElementsByClassName("menu");
      if (!element[0].classList.contains("menu--open")) {
        element[0].classList.add("menu--open");
      } else {
        setTimeout(function() {
          element[0].classList.remove("menu--open");
        }, 500);
      }
    },
    close() {
      const element = document.getElementsByClassName("menu");
      setTimeout(function() {
        element[0].classList.remove("menu--open");
      }, 500);
    }
  }
};
</script>
<style lang="scss" scoped>
$color-1st: #ffea92;
$color-2nd: white;

$menu-width-desktop: 250px;
$menu-width-tablet: 90px;
$menu-width-smartphone: 230px;

$icon-url-base: "http://www.entypo.com/images/";
$icon-url-dashboard: "${icon-url-base}/gauge.svg";
$icon-url-customers: "${icon-url-base}/briefcase.svg";
$icon-url-users: "${icon-url-base}/users.svg";
$icon-url-settings: "${icon-url-base}/tools.svg";

body {
  background: $color-1st;
  margin: 0;
  font-family: "Open Sans", Helvetica Neue, Helvetica, Arial, sans-serif;
  color: #fff;
  padding-left: $menu-width-desktop;
}
.menu {
  background: $color-2nd;
  height: 100vh;
  width: $menu-width-desktop;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  outline: none;
}
.menu--open {
  transform: translate3d(0, 0, 0) !important;
  box-shadow: 0 0 0 100em rgba(0, 0, 0, 0.6) !important;
}

@media screen and (max-width: 960px) {
  .menu {
    width: $menu-width-smartphone;
    box-shadow: 0 0 0 100em rgba(0, 0, 0, 0);
    transform: translate3d(-$menu-width-smartphone, 0, 0);
    transition: all 0.3s ease-in-out;

    .smartphone-menu-trigger {
      width: 40px;
      height: 40px;
      position: absolute;
      left: 100%;
      background: $color-2nd;

      &:before,
      &:after {
        content: "";
        width: 50%;
        height: 2px;
        background: #40bac4;
        border-radius: 10px;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }

      &:after {
        top: 55%;
        transform: translate3d(-50%, -50%, 0);
      }
    }

    ul {
      li {
        padding: 1em 1em 1em 3em;
        font-size: 1.2em;
      }
    }
  }
}
.sidebar {
  .sidebar__title {
    padding-left: 30px;
    padding-top: 30px;
    margin-bottom: 100px;
    font-size: 2rem;
    color: #676767;
    width: 100%;
  }
  .sidebar__sub-title {
    padding-left: 30px;
    color: #cad1d2;
    font-size: 1rem;
    margin-bottom: 40px;
  }
  .sidebar__list {
    padding-left: 30px;
    list-style-type: none;
    margin-bottom: 30px;
    .sidebar__item {
      padding-left: 20px;
      height: 50px;
      transition: all 0.5s;
      display: flex;
      flex-direction: row;
      width: 80%;
      align-items: center;
      text-decoration: none;
      text-decoration: none;
      color: #676767;
      font-weight: 600;
      font-size: 14px;
      .sidebar__icon {
        margin-right: 30px;
      }
    }
    .sidebar__item:not(:first-child) {
      margin-top: 20px;
    }
    .sidebar__item--active {
      border-radius: 200px;
      background-color: #40bac4;
      a {
        color: white;
      }
      -webkit-box-shadow: 10px 10px 16px 0px rgba(189, 189, 189, 1);
      -moz-box-shadow: 10px 10px 16px 0px rgba(189, 189, 189, 1);
      box-shadow: 10px 10px 16px 0px rgba(189, 189, 189, 1);
      color: white;
    }
  }
}
</style>
