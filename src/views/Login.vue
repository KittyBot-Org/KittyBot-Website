<script>
import API from "../api";

export default {
  name: "Login",

  render() {
    return undefined;
  },

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
        this.$router.replace({ query: null });
        if (response.status == 202) {
          API.token.set = response.body.token;
        } else {
          API.token.set = "";
        }
        window.close();
      },
      () => {
        this.$router.replace({ query: null });
        API.token.set = "";
        window.close();
      }
    );
  },
};
</script>
