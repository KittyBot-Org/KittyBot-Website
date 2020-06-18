<template>
  <div class="view-home">
    <div class="view-home-title">
      <span id="title" :style="`font-size: ${titleSize}px`">KittyBot</span>

      <span id="subtitle" :style="`font-size: ${subTitleSize}px;`"
        >Here to manage your Discord</span
      >
      <invite-button />
    </div>
    <v-img
      alt="KittyBot Logo"
      class="shrink"
      contain
      src="../assets/KittyBlink.gif"
    />
  </div>
</template>

<script>
import InviteButton from "../components/InviteButton";

export default {
  name: "ViewHome",

  computed: {
    titleSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "42";
        default:
          return "72";
      }
    },
    subTitleSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "22";
        default:
          return "42";
      }
    },
  },

  components: {
    InviteButton,
  },
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.view-home {
  display: flex;
  align-items: center;
  justify-content: center;
  &-title {
    display: flex;
    flex-direction: column;
    margin-right: 32px;
  }
}

#title {
  .font-bungee;
  color: @primary;
  font-weight: bolder;
  overflow: hidden;
}
#subtitle {
  font-weight: bolder;
}
</style>
