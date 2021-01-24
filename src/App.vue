<template>
  <div id="app">
    <page-shadow :show="loading" />
    <router-view v-if="$route.path == '/login'" class="view-login" />
    <v-app v-else>
      <navigation-bar
        :nav="nav"
        :user="user"
        :guilds="guilds"
        @logout="logout"
        @loading="setLoading"
        @toggle-drawer="toggleDrawer"
      />
      <navigation-drawer
        v-model="drawer"
        :nav="nav"
        :user="user"
        :guilds="guilds"
      />
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
          :logged-in="isLoggedIn"
          :key="$route.path"
          @error="addError"
        />
      </v-main>
    </v-app>
  </div>
</template>
<script>
import PageShadow from "./components/PageShadow";
import NavigationBar from "./components/NavigationBar";
import NavigationDrawer from "./components/NavigationDrawer";
import API from "./api";

export default {
  name: "App",

  data() {
    return {
      nav: [
        {
          name: "Home",
          icon: "home",
          to: "/",
        },
        {
          name: "Dashboard",
          icon: "dashboard",
          to: "/guilds",
        },
        {
          name: "Commands",
          icon: "comment",
          to: "/commands",
        },
        {
          name: "Privacy",
          icon: "security",
          to: "/privacy",
        },
      ],
      drawer: true,
      alert: true,
      errors: [],
      api: API,
      loading: false,
      user: null,
      guilds: [],
    };
  },

  components: {
    PageShadow,
    NavigationBar,
    NavigationDrawer,
  },

  created() {
    this.$vuetify.theme.dark = API.theme.isDark;
    this.loadData();
  },

  mounted() {
    window.addEventListener("storage", this.updateStorage);
  },

  computed: {
    isLoggedIn() {
      return this.user != undefined;
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    isAlertVisible() {
      return this.errors.length > 0;
    },
  },

  methods: {
    toggleDrawer() {
      console.log("app toggle");
      this.drawer = !this.drawer;
    },
    updateStorage() {
      this.loading = false;
      this.loadData();
    },
    cleanErrors() {
      this.errors = [];
    },
    addError(response) {
      this.errors.push(
        `${response.url}: ${response.status}: ${
          response.body.error == undefined
            ? response.statusText
            : response.body.error
        }`
      );
    },
    setDrawer(drawer) {
      this.drawer = drawer;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    loadData() {
      if (API.token.get != null) {
        API.get("user/me").then(
          (response) => {
            this.user = {
              icon: response.body.icon,
              name: response.body.name,
              id: response.body.id,
            };
            this.guilds = response.body.guilds;
          },
          (error) => {
            if (error.code == 401) {
              API.token.set = "";
            }
            this.addError(error);
          }
        );
      }
    },
    logout() {
      this.user = null;
      this.guilds = [];
    },
  },
};
</script>
<style lang="less">
@import "./style/style.less";

.guild-selector {
  width: min-content;
  .small-mobile {
    width: 100%;
  }
  .v-text-field__details {
    display: none;
  }
}

.v-application {
  .font-default();
}

.dashboard-navigation-view {
  padding: 16px;
}

.not-dashboard .nav,
button.not-dashboard {
  color: #ffffff !important;
}

html,
body,
#app {
  overflow-y: auto !important;
  min-width: 100%;
  height: 100%;
}
html {
  background-color: #121212;
}
</style>
