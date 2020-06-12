<template>
  <div class="dashboard-navigation">
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title class="headline">
        <span>KittyBot</span>
      </v-toolbar-title>

      <v-spacer />

      <navigation />

      <v-spacer />

      <v-btn icon @click="switchTheme">
        <v-icon>invert_colors</v-icon>
      </v-btn>
      <v-menu v-if="loggedIn" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar v-if="icon == null">
              <span>{{ shortName }}</span>
            </v-avatar>
            <v-avatar v-else :src="icon">
              <v-img :alt="`${name} profile`" :src="icon" />
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
        :loading="loading"
        :outlined="true"
        color="#7289DA"
        :href="api.getURL('discord_login')"
        @click="loading = true"
      >
        Login
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" clipped app>
      <v-list shaped nav>
        <v-list-item :to="`/guilds`" exact>
          <v-list-item-icon />
          <v-list-item-content>
            <v-list-item-title>Guilds</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="guild in guilds"
          :key="guild.id"
          :to="`/guilds/${guild.id}/dashboard`"
        >
          <v-list-item-icon>
            <v-img width="24" :src="guild.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ guild.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-alert v-if="isAlertVisible" dismissible type="error">
        <template v-slot:close="">
          <v-btn icon @click="cleanErrors">
            <v-icon>cancel</v-icon>
          </v-btn>
        </template>
        <span v-for="(error, i) in errors" :key="i">
          {{ error }}
        </span>
      </v-alert>
      <router-view
        class="dashboard-navigation-view"
        :guilds="guilds"
        :logged-in="loggedIn"
        :key="$route.path"
        @error="addError"
      />
    </v-content>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import API from "../api";

export default {
  name: "DashboardNavigation",

  data() {
    return {
      alert: true,
      errors: [],
      items: [
        { title: "Home", icon: "home", to: "/" },
        { title: "Guilds", icon: "", to: "/guilds" },
        { title: "About", icon: "help_box", to: "/about" }
      ],
      drawer: null,
      api: API,
      loading: false,
      loggedIn: false,
      name: "",
      icon: null,
      guilds: []
    };
  },

  created() {
    if (
      this.$route.query.code != undefined &&
      this.$route.query.state != undefined
    ) {
      API.post(
        "login",
        { code: this.$route.query.code, state: this.$route.query.state },
        {}
      ).then(response => {
        this.$router.replace({ query: null });
        if (response.status == 200) {
          API.authKey.set = response.body.key;
          this.loadData();
        } else {
          console.log("response", response);
          this.addError(response.status, response.statusText);
        }
      });
    } else {
      this.loadData();
    }
  },

  computed: {
    isAlertVisible() {
      return this.errors.length > 0;
    },
    shortName() {
      if (this.name.includes(" ")) {
        return this.name
          .split(" ")
          .map(n => n[0])
          .join("")
          .substr(0, 2);
      } else {
        return name.substr(0, 2);
      }
    }
  },

  methods: {
    cleanErrors() {
      this.errros = [];
    },
    addError(response) {
      this.errors.push(
        `${response.url}: ${response.status}: ${response.statusText}`
      );
    },
    switchTheme() {
      let isDark = !API.theme.isDark;
      API.theme.setDark = isDark;
      this.$vuetify.theme.dark = isDark;
    },
    loadData() {
      if (API.authKey.get != null) {
        API.get("user/me").then(
          response => {
            this.loggedIn = response.status == 200;
            this.icon = response.body.icon;
            this.name = response.body.name;
            this.guilds = response.body.guilds;
          },
          response => {
            this.addError(response);
          }
        );
      }
    },
    logout() {
      this.loading = true;
      API.authKey.set;
      this.loggedIn = false;
      this.icon = null;
      this.name = "";
      this.guilds = [];
      this.loading = false;
    }
  },

  components: {
    Navigation
  }
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.dashboard-navigation {
  display: flex;
  flex-direction: column;
  &-view {
    padding: 16px;
  }
}
</style>
