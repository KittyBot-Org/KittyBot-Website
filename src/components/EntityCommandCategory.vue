<template>
  <div class="entity-command-categories" :id="category.name">
    <div class="entity-command-categories-header">
      <v-avatar tile><v-img :src="category.emote_url" /></v-avatar>
      <span class="entity-command-categories-header-name">{{
        category.name
      }}</span>
    </div>
    <entity-command
      v-for="command of category.commands"
      :key="command.name"
      :command="command"
      :prefix="prefix"
    />
    <v-divider />
  </div>
</template>
<script>
import EntityCommand from "../components/EntityCommand";

export default {
  name: "EntityCommandCategory",

  props: {
    prefix: {
      required: true,
      type: String,
    },
    category: {
      required: true,
      type: Object,
    },
  },

  components: {
    EntityCommand,
  },
};
</script>
<style lang="less" scoped>
@import "../style/style.less";

.entity-command-categories {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 8px;
  padding-bottom: 32px;
  flex-grow: 1;
  &-header {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
