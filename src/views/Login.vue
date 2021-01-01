<template>
  <v-img class="loading" src="../assets/loading.gif" :width="64" :height="64" />
</template>
<script>
import API from "../api";

export default {
  name: "Login",

  created() {
    if (
      this.$route.query.code == undefined ||
      this.$route.query.state == undefined
    ) {
      window.close();
      return;
    }
    API.post(
      "login",
      { code: this.$route.query.code, state: this.$route.query.state },
      {}
    ).then(
      (response) => {
        if (response.status == 202) {
          API.token.set = response.body.token;
        } else {
          API.token.set = "";
        }
        window.close();
      },
      () => {
        API.token.set = "";
        window.close();
      }
    );
  },
};
</script>
<style lang="less" scoped>
.loading {
  position: absolute;
  margin: 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
