import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(VueResource);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
