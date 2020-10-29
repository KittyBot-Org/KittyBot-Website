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
    <div v-else-if="guilds.length == 0" class="view-guilds-empty">
      <h2>
        I'm not in any mutual servers in which you have Administrator permission
      </h2>
      <h2>Do you want to add me to your server?</h2>
      <invite-button />
    </div>
    <div v-else class="view-guilds-list">
      <router-link
        :class="{ isDark, isMobile }"
        class="view-guilds-list-tr"
        v-for="guild in guilds"
        :key="guild.id"
        :to="`/guilds/${guild.id}/dashboard`"
      >
        <div class="view-guilds-list-td">
          <guild-icon
            :icon="guild.icon"
            :text="guild.name"
            :alt="guild.name"
            :size="60"
          />
        </div>
        <div class="view-guilds-list-td">
          {{ guild.name }}
        </div>
        <div v-if="!isMobile">
          <v-btn :to="`/guilds/${guild.id}/dashboard`" color="primary"
            >Open Dashboard</v-btn
          >
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import GuildIcon from "../components/GuildIcon";
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
    isDark() {
      return this.$vuetify.theme.dark;
    },
  },

  components: {
    InviteButton,
    GuildIcon,
  },
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.view-guilds {
  display: flex;
  justify-content: center;
  text-align: center;
  &-list {
    width: 100%;
    &-tr {
      display: flex;
      align-items: center;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      & *:not(:first-child) {
        margin-left: 8px;
      }
      &:not(.isMobile) {
        justify-content: space-between;
      }
      &:not(:last-child) {
        margin-bottom: 16px;
      }
      background-color: #eeeeee;
      &.isDark {
        background-color: #1e1e1e;
      }
      &:hover {
        transition: background-color 0.2s;
        background-color: #d8d8d8;
        &.isDark {
          background-color: #616161;
        }
      }
    }
  }
  &-empty {
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
