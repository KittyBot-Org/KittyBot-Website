<template>
  <div class="view-home" :class="{ mobile: isMobile }">
    <div class="view-home-header">
      <v-img
        alt="KittyBot Logo"
        :max-width="340"
        src="../assets/KittyBlink.gif"
      />
      <div class="view-home-header-title">
        <span class="view-home-header-title-title">KittyBot</span>

        <span class="view-home-header-title-subtitle"
          >Here to manage your Discord</span
        >
        <invite-button />
      </div>
    </div>
    <div class="view-home-cards">
      <div v-for="(card, i) in cards" :key="i" class="view-home-cards-card">
        <v-icon class="view-home-cards-card-icon" :size="48" color="white">{{
          card.icon
        }}</v-icon>
        <span class="view-home-cards-card-title">{{ card.title }} </span>
        <p class="view-home-cards-card-text">{{ card.text }}</p>
      </div>
    </div>
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
          icon: "how_to_reg",
          title: "Easy to use",
          text:
            "KittyBot uses the new slash commands and is easier to use then ever",
        },
        {
          icon: "money_off",
          title: "100% Free",
          text: "KittyBot is 100% free",
        },
        {
          icon: "headset",
          title: "High Quality Audio",
          text:
            "KittyBot provides high quality audio with custom filter support",
        },
        {
          icon: "flash_on",
          title: "Feature Rich",
          text: "KittyBot can do a lot of different things",
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
  flex-direction: column;
  &-header {
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
        font-size: 60px;
      }
      &-subtitle {
        font-size: 26px;
      }
    }
  }
  &-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: #5c5fea;
    color: white;
    border-radius: 8px;
    &-card {
      display: flex;
      flex-direction: column;
      justify-content: top;
      align-items: center;
      text-align: center;
      padding: 16px;
      width: 235px;
      &-icon {
        padding: 8px;
      }
      &-title {
        font-weight: bolder;
        font-size: 22px;
      }
      &-text {
        font-size: 16px;
        opacity: 0.8;
      }
    }
  }
}
</style>
