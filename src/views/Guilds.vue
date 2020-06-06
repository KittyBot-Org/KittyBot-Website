<template>
  <div class="view-guilds">
    <div v-if="!loggedIn">
      <span>Please login to manage your guilds</span>
    </div>
    <router-link
      v-else
      class="view-guilds-guild"
      v-for="guild in guilds"
      :key="guild.id"
      :to="`/guilds/${guild.id}`"
    >
      <img :src="guild.icon" />
      <span>{{ guild.name }}</span>
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
@import "../style/style.less";

.view-guilds {
  display: flex;
  justify-content: center;
  &-guild {
    display: flex;
    flex-direction: column;
  }
}
</style>
