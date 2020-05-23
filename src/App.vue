<template>
  <div id="app">
    <div id="app-nav">
      <router-link to="/">Home</router-link>
      <a href="/#features">Features</a>
      <a href="/#commands">Commands</a>
      <router-link to="/about">About</router-link>
      <a class="login" href="/login">login with Discord</a>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
@import "./style/style.less";
html,
body,
#app {
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
    & * {
      margin-left: 4px;
      margin-right: 4px;
    }
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
