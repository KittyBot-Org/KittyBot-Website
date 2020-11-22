<template>
  <v-app-bar app clipped-left :color="getAppBarColor">
    <v-app-bar-nav-icon
      v-if="isDashBoard || isMobile"
      @click="drawer = !drawer"
    />
    <v-avatar v-else tile>
      <v-img src="../assets/KittyBlink.gif" />
    </v-avatar>

    <div
      v-if="!isMobile"
      class="nav"
      :class="{ 'not-dashboard': !isDashBoard }"
    >
      <router-link
        v-for="n of nav"
        :key="n.name"
        class="nav"
        :to="n.to"
        exact
        >{{ n.name }}</router-link
      >
      <a
        class="nav"
        target="_blank"
        href="https://github.com/KittyBot-Org/KittyBot"
        >GitHub
      </a>
    </div>

    <v-spacer />

    <guild-selector :guilds="guilds" />

    <language-selector />

    <v-btn :class="{ 'not-dashboard': !isDashBoard }" icon @click="switchTheme">
      <v-icon>brightness_4</v-icon>
    </v-btn>
    <v-menu v-if="user != null" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-avatar :size="38">
            <v-img :src="user.icon" :alt="`${user.name}'s profile`" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout()">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      v-else
      :class="{ 'not-dashboard': !isDashBoard }"
      :loading="loading"
      :text="true"
      :color="getLoginButtonColor"
      @click="login"
    >
      Login
    </v-btn>
  </v-app-bar>
</template>
<script>
import LanguageSelector from "./LanguageSelector";
import GuildSelector from "./GuildSelector";
import API from "../api";

export default {
  name: "NavigationBar",

  props: {
    nav: {
      required: true,
      type: Array,
    },
    user: {
      required: true,
      validator: (prop) => prop instanceof Object || prop === null,
    },
    guilds: {
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      loading: false,
      drawer: false,
    };
  },

  components: {
    LanguageSelector,
    GuildSelector,
  },

  computed: {
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
    getAppBarColor() {
      return this.isDashBoard ? "" : "#5c5fea";
    },
    getLoginButtonColor() {
      return this.isDashBoard ? "#5c5fea" : "";
    },
  },

  methods: {
    switchTheme() {
      let isDark = !API.theme.isDark;
      API.theme.setDark = isDark;
      this.$vuetify.theme.dark = isDark;
    },
    login() {
      this.loading = true;
      let windowRef = open(
        API.getURL("discord_login"),
        "KittyBotLoginWindow",
        "width=600,height=800"
      );
      const intervalId = setInterval(() => {
        if (windowRef.closed) {
          clearInterval(intervalId);
          this.loading = false;
        }
      }, 250);
    },
    logout() {
      API.post("logout");
      API.token.set = "";
      this.$emit("logout");
      this.loading = false;
      if (this.$route.path != "") {
        this.$router.push("/");
      }
    },
  },
};
</script>
