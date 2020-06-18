<template>
  <div class="normal-navigation">
    <navigation />
    <v-content>
      <router-view />
    </v-content>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";

export default {
  name: "NormalNavigation",

  components: {
    Navigation,
  },
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.normal-navigation {
  display: flex;
  flex-direction: column;
}
</style>
