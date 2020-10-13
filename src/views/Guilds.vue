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
      v-else-if="guilds.length == 0"
      class="view-guilds-empty"
      :class="{ mobile: isMobile }"
    >
      <h2>
        I'm not in any mutual servers in which you have Administrator permission
      </h2>
      <h2>Do you want to add me to your server?</h2>
      <invite-button />
    </div>
    <v-simple-table v-else class="view-guilds-list">
      <template>
        <tbody>
          <tr v-for="guild in guilds" :key="guild.id">
            <td>
              <guild-icon
                :icon="guild.icon"
                :text="guild.name"
                :alt="guild.name"
                :size="78"
              />
            </td>
            <td>
              <span>{{ guild.name }}</span>
            </td>
            <td>
              <v-btn :to="`/guilds/${guild.id}/dashboard`" color="primary"
                >Open Dashboard</v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
