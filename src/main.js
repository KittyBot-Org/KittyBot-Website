import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";

Sentry.init({
  dsn:
    "https://6a900b0e67d34d05bd5dc65dbdd94513@o408367.ingest.sentry.io/5279237",
  integrations: [new VueIntegration({ Vue, attachProps: true })],
});
Vue.config.productionTip = false;

Vue.use(VueResource);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
