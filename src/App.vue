<template>
  <v-app>
    <v-app-bar app clipped-left :color="getAppBarColor">
      <v-app-bar-nav-icon v-if="isDashBoard" @click="drawer = !drawer" />
      <v-avatar v-else tile>
        <v-img src="./assets/KittyBlink.gif" />
      </v-avatar>

      <div class="nav">
        <router-link to="/" exact>Home </router-link>
        <router-link to="/features">Features </router-link>
        <router-link to="/commands">Commands </router-link>
        <a target="_blank" href="https://github.com/TopiSenpai/KittyBot"
          >Source Code
        </a>
        <router-link to="/about">About </router-link>
        <router-link to="/guilds">Dashboard </router-link>
      </div>

      <v-spacer />

      <v-btn icon @click="switchTheme">
        <v-icon>brightness_4</v-icon>
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
        :text="true"
        :color="getLoginButtonColor"
        :href="api.getURL('discord_login')"
        @click="loading = true"
      >
        Login
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-if="isDashBoard" v-model="drawer" clipped app>
      <v-list shaped nav>
        <v-list-item :to="`/guilds`" exact>
          <v-list-item-avatar tile>
            <v-icon>
              dashboard
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Guilds</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAdmin" to="/admin/dashboard" exact>
          <v-list-item-avatar tile>
            <v-icon>
              supervisor_account
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="guild in guilds"
          :key="guild.id"
          :to="`/guilds/${guild.id}/dashboard`"
        >
          <v-list-item-avatar tile>
            <v-img :src="guild.icon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ guild.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-alert v-if="isAlertVisible" dismissible type="error">
        <template v-slot:close="">
          <v-btn icon @click="cleanErrors">
            <v-icon>cancel</v-icon>
          </v-btn>
        </template>
        <span v-for="(error, i) in errors" :key="i">
          {{ error }}
          <br />
        </span>
      </v-alert>
      <router-view
        class="dashboard-navigation-view"
        :guilds="guilds"
        :logged-in="loggedIn"
        :key="$route.path"
        @error="addError"
      />
    </v-main>
  </v-app>
</template>

<script>
import API from "./api";

export default {
  name: "App",

  data() {
    return {
      alert: true,
      errors: [],
      drawer: null,
      api: API,
      loading: false,
      loggedIn: false,
      name: "",
      id: "",
      icon: null,
      guilds: [],
    };
  },

  created() {
    this.$vuetify.theme.dark = API.theme.isDark;
    if (
      this.$route.query.code != undefined &&
      this.$route.query.state != undefined
    ) {
      API.post(
        "login",
        { code: this.$route.query.code, state: this.$route.query.state },
        {}
      ).then(
        (response) => {
          this.$router.replace({ query: null });
          if (response.status == 200) {
            API.authKey.set = response.body.key;
            this.loadData();
          } else {
            this.addError(response.status, response.statusText);
          }
        },
        (error) => {
          this.addError(error);
        }
      );
    } else {
      this.loadData();
    }
  },

  computed: {
    isAdmin() {
      return this.id == API.ADMIN_ID;
    },
    isDashBoard() {
      return !(
        this.$route.fullPath == "/" ||
        this.$route.fullPath == "/features" ||
        this.$route.fullPath == "/commands" ||
        this.$route.fullPath == "/about"
      );
    },
    getAppBarColor() {
      return this.isDashBoard ? "" : "#5c5fea";
    },
    getLoginButtonColor() {
      return this.isDashBoard ? "#5c5fea" : "";
    },
    isAlertVisible() {
      return this.errors.length > 0;
    },
    shortName() {
      if (this.name.includes(" ")) {
        return this.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substr(0, 2);
      } else {
        return name.substr(0, 2);
      }
    },
  },

  methods: {
    cleanErrors() {
      this.errors = [];
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
          (response) => {
            this.loggedIn = response.status == 200;
            this.icon = response.body.icon;
            this.name = response.body.name;
            this.id = response.body.id;
            this.guilds = response.body.guilds;
          },
          (error) => {
            this.addError(error);
          }
        );
      }
    },
    logout() {
      this.loading = true;
      API.authKey.set = "";
      this.loggedIn = false;
      this.icon = null;
      this.name = "";
      this.guilds = [];
      this.loading = false;
    },
  },
};
</script>

<style lang="less">
@import "./style/style.less";

.dashboard-navigation-view {
  padding: 16px;
}

html {
  overflow-y: auto !important;
}
</style>
