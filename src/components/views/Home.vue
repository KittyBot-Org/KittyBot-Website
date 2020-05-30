<template>
  <div class="view-home">
    <div class="view-home-title">
      <span class="title">KittyBot</span>
      <img alt="KittyBot Logo" src="../../assets/KittyBlink.gif" />
      <a
        class="login"
        href="https://discordapp.com/api/oauth2/authorize?client_id=587697058602025011&permissions=1345711302&scope=bot"
      >
        Invite me to your
        <img
          height="40px"
          alt="Discord Logo"
          src="../../assets/DiscordLogo.png"
        />
      </a>
      <span class="subtitle">Here to manage your Discord</span>
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
  name: "ViewHome"
};
</script>

<style lang="less" scoped>
@import "../../style/style.less";

.view-home-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  .font-bungee;
  color: @primary;
  font-weight: bolder;
  font-size: 64px;
}
.subtitle {
  .font-bangers;
  font-weight: bolder;
  font-size: 42px;
}
</style>
