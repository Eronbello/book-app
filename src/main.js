import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import API from "./api/";
import reloadStoreMixins from "./mixins/reloadStoreMixins";
Vue.config.productionTip = false;
Vue.mixin(reloadStoreMixins);
Vue.prototype.$http = API;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
