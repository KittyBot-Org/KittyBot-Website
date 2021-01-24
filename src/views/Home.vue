<template>
  <div class="view-home" :class="{ mobile: isMobile }">
    <v-img
      alt="KittyBot Logo"
      :max-width="350"
      src="../assets/KittyBlink.gif"
    />
    <div class="view-home-title">
      <span class="view-home-title-title">KittyBot</span>

      <span class="view-home-title-subtitle">Here to manage your Discord</span>
      <invite-button />
    </div>
    <!--<div class="view-home-cards">
      <div v-for="(card, i) in cards" :key="i" class="view-home-cards-card">
        <v-icon :icon="card.icon" />
        <span>{{ card.icon }} </span>
        <p>{{ card.text }}</p>
      </div>
    </div>-->
  </div>
</template>

<script>
import InviteButton from "../components/InviteButton";

export default {
  name: "ViewHome",

  data() {
    return {
      cards: [
        {
          icon: "",
          title: "",
          text: "",
        },
      ],
    };
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
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
  justify-content: space-around;
  text-align: center;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-shrink: 1;
  &-title {
    display: flex;
    flex-direction: column;
    font-weight: bolder;
    padding: 16px;
    &-title {
      .font-bungee;
      color: @primary;
      font-size: 64px;
    }
    &-subtitle {
      font-size: 22px;
    }
  }
}
</style>
