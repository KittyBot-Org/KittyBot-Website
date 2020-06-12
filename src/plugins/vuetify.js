import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg"
  },
  theme: {
    themes: {
      light: {
        primary: "#5c5fea",
        anchor: "#000000"
      },
      dark: {
        primary: "#5c5fea",
        anchor: "#ffffff"
      }
    }
  }
});
