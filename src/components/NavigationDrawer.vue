<template>
  <v-navigation-drawer
    v-if="isDashBoard || isMobile"
    v-model="showDrawer"
    mobile-breakpoint="960"
    clipped
    app
  >
    <v-list shaped nav>
      <v-list-item-group v-if="isMobile" style="padding-bottom: 8px">
        <v-list-item v-for="n of nav" :key="n.name" :to="n.to">
          <v-list-item-avatar tile>
            <v-icon :size="38">
              {{ n.icon }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ n.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          href="https://github.com/TopiSenpai/KittyBot"
          target="_blank"
        >
          <v-list-item-avatar tile>
            <v-icon>code</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>GitHub</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          href="https://api.kittybot.de/discord_invite"
          target="_blank"
        >
          <v-list-item-avatar tile>
            <v-icon>help</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Support</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item v-if="!isMobile" :to="`/guilds`" exact>
        <v-list-item-avatar tile>
          <v-icon>list</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Guilds</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="isDev" to="/admin/dashboard" exact>
        <v-list-item-avatar tile>
          <v-icon>supervisor_account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Dev</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="guild in guilds"
        :key="guild.id"
        :to="`/guilds/${guild.id}/dashboard`"
      >
        <v-list-item-avatar tile>
          <guild-icon
            :icon="guild.icon"
            :alt="`${guild.name} guild`"
            :text="guild.name"
            :size="40"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ guild.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import GuildIcon from "./GuildIcon";
import API from "../api";

export default {
  name: "NavigationDrawer",

  props: {
    value: {
      required: true,
      type: Boolean,
    },
    nav: {
      required: true,
      type: Array,
    },
    guilds: {
      required: true,
      type: Array,
    },
    user: {
      required: true,
      validator: (prop) => prop instanceof Object || prop === null,
    },
  },

  components: {
    GuildIcon,
  },

  computed: {
    showDrawer: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    isDev() {
      if (this.user == null) {
        return false;
      }
      return API.DEV_IDS.includes(this.user.id);
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    isDashBoard() {
      let path = this.$route.path;
      if (path.substr(-1) == "/") {
        path = path.substr(0, path.length - 1);
      }
      return !["", "/features", "/commands", "/privacy"].includes(path);
    },
  },

  methods: {
    toggleDrawer() {
      this.$emit("toggle-drawer");
    },
  },
};
</script>
