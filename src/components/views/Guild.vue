<template>
  <div class="view-guild">
    {{ settings }}
  </div>
</template>

<script>
export default {
  name: "ViewGuilds",

  data() {
    return {
      settings: ""
    };
  },

  created() {
    this.$http.get(`http://localhost:6969/guild/${this.$route.params.guildId}/settings/get`, { withCredentials: true }).then(response => {
        console.log(response);
        this.settings = response.body;
      });
  }
};
</script>

<style lang="less" scoped>
@import "../../style/style.less";

.view-guilds {
  display: flex;
}
</style>
