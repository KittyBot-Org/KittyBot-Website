<template>
  <div class="view-guilds">
    <div
      v-if="guilds.length > 0"
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
      <span
        >I'm not in any mutal servers where you have administrator
        permissions</span
      >
      <span>Do you want to add me to your server?</span>
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
  &-guilds {
    display: flex;
    justify-content: center;
    text-align: center;
    &.mobile {
      flex-direction: column;
    }
    & a {
      justify-content: center;
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
