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
        <div v-if="loggedIn">
          <img class="icon" :src="icon" />
        </div>
        <a v-else :href="`${backend}/discord_login`">Login</a>
      </div>
    </div>
    <router-view class="app-view" :guilds="guilds" :loggedIn="loggedIn" :backend="backend" />
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      backend: "http://localhost:6969",
      loggedIn: false,
      name: "",
      icon: "",
      guilds: []
    };
  },

  created() {
    if(this.$route.query.code != undefined && this.$route.query.state != undefined){
      this.$http.post(`${this.backend}/login`, { code: this.$route.query.code, state: this.$route.query.state })
        .then(response => {
          this.$router.replace({'query': null});
          if(response.status == 200){
            localStorage.setItem("auth_key", response.body.key)
            this.request();
          }
        })
    }
    else{
      this.request();
    }
  },

  methods: {
    request(){
      if(localStorage.getItem("auth_key") != null){
        this.$http
          .get(`${this.backend}/user/me`, {
            headers: { Authorization: localStorage.getItem("auth_key") }
          })
          .then(response => {
            this.loggedIn = response.status == 200
            this.icon = response.body.icon
            this.name = response.body.name
            this.guilds = response.body.guilds
          });
      }
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
  &-view{
    margin-top: 12px;
  }
}

.icon {
  width: 42px;
  height: 42px;
  border: 1px solid @primary;
  border-radius: 30px;
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
