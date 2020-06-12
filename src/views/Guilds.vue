<template>
  <div class="view-guilds">
    <div v-if="guilds.length > 0" class="view-guilds-guilds">
      <router-link
        v-for="guild in guilds"
        :key="guild.id"
        :to="`/guilds/${guild.id}/dashboard`"
      >
        <v-img :src="guild.icon" />
        <span>{{ guild.name }}</span>
      </router-link>
    </div>
    <div v-else class="view-guilds-no-guilds">
      <span
        >I'm not in a mutal server where you have administrator
        permissions</span
      >
      <span>Do you want to add me to your server?</span>
      <a
        class="login"
        :href="
          `https://discordapp.com/api/oauth2/authorize?client_id=${api.CLIENT_ID}&permissions=1345711302&scope=bot`
        "
      >
        <v-img class="login-logo" src="../assets/Discord-Logo.png" />
        <div class="login-text">
          <span>Invite me to your</span>
          <v-img class="login-text-img" src="../assets/Discord-Wordmark.png" />
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import API from "../api";

export default {
  name: "ViewGuilds",

  props: {
    guilds: {
      required: true,
      type: Array
    }
  },

  data() {
    return {
      api: API
    };
  }
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.view-guilds {
  display: flex;
  justify-content: center;
  &-guilds {
    display: flex;
    text-align: center;
    & a {
      text-decoration: none;
    }
  }
  &-no-guilds {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
}
</style>
