<template>
  <div class="app">
    <div class="app-nav">
      <div class="app-nav-group">
        <router-link to="/">Home</router-link>
        <!--<a href="#features">Features</a>
        <a href="#commands">Commands</a>-->
        <router-link to="/about">About</router-link>
        <router-link to="/guilds">Guilds</router-link>
      </div>
      <div class="app-nav-group">
        <v-btn
          v-if="loggedIn"
          :loading="loading"
          :outlined="true"
          color="#7289DA"
          @click="logout"
          >Logout</v-btn
        >
        <v-btn
          v-else
          :loading="loading"
          :outlined="true"
          color="#7289DA"
          :href="`${backend}/discord_login`"
          @click="loading = true"
          >Login</v-btn
        >
      </div>
      <v-avatar v-if="icon == null">
        <span>{{ shortName }}</span>
      </v-avatar>
      <v-avatar v-else :src="icon">
        <v-img :alt="`${name} profile`" :src="icon" />
      </v-avatar>
    </div>

    <router-view
      class="app-view"
      :guilds="guilds"
      :loggedIn="loggedIn"
      :backend="backend"
    />
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      loading: false,
      backend: "http://localhost:6969",
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
      this.$http
        .post(`${this.backend}/login`, {
          code: this.$route.query.code,
          state: this.$route.query.state
        })
        .then(response => {
          this.$router.replace({ query: null });
          if (response.status == 200) {
            localStorage.setItem("auth_key", response.body.key);
            this.request();
          }
        });
    } else {
      this.request();
    }
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

  methods: {
    request() {
      if (localStorage.getItem("auth_key") != null) {
        this.$http
          .get(`${this.backend}/user/me`, {
            headers: { Authorization: localStorage.getItem("auth_key") }
          })
          .then(response => {
            this.loggedIn = response.status == 200;
            this.icon = response.body.icon;
            this.name = response.body.name;
            this.guilds = response.body.guilds;
          });
      }
    },
    logout() {
      this.loading = true;
      localStorage.removeItem("auth_key");
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
  .font-default;
  background-color: @secondary;
  text-align: center;
  .fc;
  min-height: 100%;
  &-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    height: 48px;
    &-group {
      & * {
        margin-left: 4px;
        margin-right: 4px;
      }
    }
    & login {
      float: right;
    }
  }
  &-view {
    margin: 12px 22px 12px 22px;
  }
}

a {
  text-decoration: none;
  .fc;
  &:hover {
    .fc-dark;
  }
  &.router-link-exact-active {
    color: @primary;
  }
}
</style>
