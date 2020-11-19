<template>
  <div>redirecting...</div>
</template>
<script>
import API from "../api";

export default {
  name: "Login",

  mounted() {
    if (
      this.$route.query.code == undefined ||
      this.$route.query.state == undefined
    ) {
      return;
    }
    API.post(
      "login",
      { code: this.$route.query.code, state: this.$route.query.state },
      {}
    ).then((response) => {
      //this.$router.replace({ query: null });
      if (response.status == 200) {
        API.authKey.set = response.body.token;
      }
    });
  },
};
</script>
