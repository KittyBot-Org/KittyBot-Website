<template>
  <div class="invite-button">
    <a
      class="invite-button-login"
      :href="`https://discordapp.com/api/oauth2/authorize?client_id=${api.CLIENT_ID}&permissions=1345841383&scope=bot`"
    >
      <v-img
        contain
        class="invite-button-login-logo"
        src="../assets/Discord-Logo.png"
      />
      <div class="invite-button-login-text">
        <span>Invite me to your</span>
        <v-img
          class="invite-button-login-text-img"
          src="../assets/Discord-Wordmark.png"
        />
      </div>
    </a>
  </div>
</template>

<script>
import API from "../api";

export default {
  name: "InviteButton",

  data() {
    return {
      api: API,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.invite-button-login {
  display: inline-flex;
  align-items: center;
  border: 4px solid @discord;
  border-radius: 200px;
  padding: 12px;
  text-decoration: none;
  margin-top: 12px;

  &:hover {
    color: darken(@discord, 5%);
    border-color: darken(@discord, 5%);
  }

  &-logo {
    width: 52px;
    height: 52px;
  }

  &-text {
    color: @discord;
    font-weight: 900;
    font-size: 20px;
    &-img {
      width: 130px;
      height: 32px;
    }
  }
}
</style>
