<template>
  <div class="view-home">
    <div class="view-home-title">
      <span id="title" :style="`font-size: ${titleSize}px`">KittyBot</span>
      <v-img
        alt="KittyBot Logo"
        class="shrink"
        contain
        src="../assets/KittyBlink.gif"
      />
      <a
        class="login"
        href="https://discordapp.com/api/oauth2/authorize?client_id=587697058602025011&permissions=1345711302&scope=bot"
      >
        <v-img class="login-logo" src="../assets/Discord-Logo.png" />
        <div class="login-text">
          <span>Invite me to your</span>
          <v-img class="login-text-img" src="../assets/Discord-Wordmark.png" />
        </div>
      </a>
      <span id="subtitle" :style="`font-size: ${titleSize}px;`"
        >Here to manage your Discord</span
      >
    </div>
    <!--<div id="features">
      <span>Features</span>
    </div>
    <div id="commands">
      <span>Commands</span>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "ViewHome",

  computed: {
    titleSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "42";
        default:
          return "64";
      }
    },
    subTitleSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "22";
        default:
          return "42";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.view-home-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#title {
  .font-bungee;
  color: @primary;
  font-weight: bolder;
}
#subtitle {
  .font-bangers;
  font-weight: bolder;
}
</style>
