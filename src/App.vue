<template>
  <div class="app">
    <div class="app-nav">
      <div class="app-nav-group">
        <router-link to="/">Home</router-link>
        <router-link to="#features">Features</router-link>
        <router-link to="#commands">Commands</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/guilds">Guilds</router-link>
      </div>
      <div class="app-nav-group">
        <div v-if="loggedIn">
          <img class="icon" :src="icon" />
        </div>
        <a v-else class="login" :href="`${backend}/discord_login`">login with Discord</a>
      </div>
    </div>
    <router-view :guilds="guilds" :loggedIn="loggedIn" :backend="backend" />
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
    console.log(this);
    this.$http.get("http://localhost:6969/user/me", { withCredentials: true }).then(response => {
        this.loggedIn = response.status == 200;
        let info = response.body;
        this.name = info.name;
        this.icon = info.icon;
        this.guilds = info.guilds;

      });
  }
}
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
    padding-top: 12px;
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
}

.icon {
  width: 42px;
  height: 42px;
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

.login {
  border: 4px solid @primary;
  border-radius: 32px;
  padding: 8px;
  color: @primary;
  &:hover {
    color: @primary-dark;
    border-color: @primary-dark;
  }
}
</style>
