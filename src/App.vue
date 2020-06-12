<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import API from "./api";

export default {
  name: "App",

  created() {
    this.$vuetify.theme.dark = API.theme.isDark;
  }
};
</script>

<style lang="less">
@import "./style/style.less";

html {
  overflow-y: auto !important;
}

</style>
