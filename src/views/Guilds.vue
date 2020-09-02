<template>
  <div class="view-guilds">
    <div v-if="!loggedIn" class="view-guilds-not-logged-in">
      <h2>Login to see mutual servers!</h2>
      <v-img
        alt="KittyBot Logo"
        class="shrink"
        contain
        src="../assets/KittyBlink.gif"
      />
    </div>
    <div
      v-else-if="guilds.length > 0"
      class="view-guilds-guilds"
      :class="{ mobile: isMobile }"
    >
      <router-link
        v-for="guild in guilds"
        :key="guild.id"
        :to="`/guilds/${guild.id}/dashboard`"
      >
        <v-img :src="guild.icon" height="128" width="128" />
        <span>{{ guild.name }}</span>
      </router-link>
    </div>
    <div v-else class="view-guilds-no-guilds">
      <h2>
        I'm not in any mutual servers in which you have Administrator permission
      </h2>
      <h2>Do you want to add me to your server?</h2>
      <invite-button />
    </div>
  </div>
</template>

<script>
import InviteButton from "../components/InviteButton";
import API from "../api";

export default {
  name: "ViewGuilds",

  props: {
    guilds: {
      required: true,
      type: Array,
    },
    loggedIn: {
      required: true,
      type: Boolean,
    },
  },

  data() {
    return {
      api: API,
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

.view-guilds {
  display: flex;
  justify-content: center;
  text-align: center;
  &-guilds {
    display: flex;
    justify-content: center;
    text-align: center;
    &.mobile {
      flex-direction: column;
    }
    & a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-decoration: none;
    }
  }
  &-no-guilds {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  &-not-logged-in {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
}
</style>
