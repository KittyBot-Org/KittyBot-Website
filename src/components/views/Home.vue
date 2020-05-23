<template>
  <div class="view-home">
    <div class="view-home-title">
      <span class="title">KittyBot</span>
      <img alt="Vue logo" src="../../assets/KittyBlink.gif" />
      <span class="subtitle">Here to manage your Discord</span>
    </div>
    <div id="features">
      <span>Features</span>
    </div>
    <div id="commands">
      <span>Commands</span>
    </div>
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
