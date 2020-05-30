<template>
  <div class="view-guild">{{ settings }}</div>
</template>

<script>
export default {
  name: "ViewGuilds",

  props: {
    backend: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      settings: ""
    };
  },

  created() {
    this.$http
      .get(`${this.backend}/guild/${this.$route.params.guildId}/settings/get`, {
        withCredentials: true
      })
      .then(response => {
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
