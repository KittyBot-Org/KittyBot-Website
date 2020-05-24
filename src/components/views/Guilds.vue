<template>
  <div class="view-guilds">
    <div v-if="!loggedIn">
      <span>Please login to manage guilds</span>
    </div>
    <router-link v-else v-for="guild in guilds" :key="guild.id" :to="`/guild/${guild.id}`">
      <span>{{ guild.name }}</span>
      <img :src="guild.icon" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ViewGuilds",

  props: {
    guilds: {
      required: true,
      type: Array
    },
    loggedIn: {
      required: true,
      type: Boolean
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/style.less";

.view-guilds {
  display: flex;
}
</style>
