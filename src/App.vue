<template>
  <v-app class="app">
    <div class="app-nav">
      <div class="app-nav-group">
        <router-link to="/">
          Home
        </router-link>
        <!--<a href="#features">Features</a>
        <a href="#commands">Commands</a>-->
        <router-link to="/about">
          About
        </router-link>
        <router-link to="/guilds">
          Guilds
        </router-link>
      </div>
      <div class="app-nav-group">
        <v-btn :outlined="true" color="#7289DA" @click="theme()">
          Theme
        </v-btn>
        <v-btn
          v-if="loggedIn"
          :loading="loading"
          :outlined="true"
          color="#7289DA"
          @click="logout"
        >
          Logout
        </v-btn>
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
        <v-avatar v-if="icon == null">
          <span>{{ shortName }}</span>
        </v-avatar>
        <v-avatar v-else :src="icon">
          <v-img :alt="`${name} profile`" :src="icon" />
        </v-avatar>
      </div>
    </div>

    <router-view class="app-view" :guilds="guilds" :logged-in="loggedIn" />
  </v-app>
</template>

<script>
import API from "./api";

export default {
  name: "App",

  data() {
    return {
      api: API,
      dark: true,
      loading: false,
      loggedIn: false,
      name: "",
      icon: null,
      guilds: []
    };
  },

  computed: {
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

  created() {
    this.$vuetify.theme.dark = this.dark;
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
          // TODO throw error
        }
      });
    } else {
      this.loadData();
    }
  },

  methods: {
    theme() {
      this.dark = !this.dark;
      this.$vuetify.theme.dark = this.dark;
    },
    loadData() {
      if (API.authKey.get != null) {
        API.get("user/me").then(response => {
          this.loggedIn = response.status == 200;
          if (response.status == 200) {
            this.icon = response.body.icon;
            this.name = response.body.name;
            this.guilds = response.body.guilds;
          }
        });
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
  }
};
</script>

<style lang="less">
@import "./style/style.less";
html,
body,
.app {
  display: flex;
  flex-direction: column;
  .font-default;
  background-color: @secondary !important;
  text-align: center;
  .fc;
  min-height: 100%;
  &-nav {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    height: 48px;
    &-group {
      &:first-child {
        width: 67%;
        & * {
          margin-left: 4px;
          margin-right: 4px;
        }
      }
      &:last-child {
        width: 33%;
      }
    }
  }
  &-view {
    flex-grow: 1;
    margin: 12px 22px 12px 22px;
  }
}

a {
  text-decoration: none;
  .fc !important;
  &:hover {
    .fc-dark !important;
  }
  &.router-link-exact-active {
    color: @primary !important;
  }
}
</style>
