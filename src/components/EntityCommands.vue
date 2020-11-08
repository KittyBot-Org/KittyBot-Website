<template>
  <div class="entity-commands">
    <div v-if="isMobile" class="entity-commands-list">
      <div
        v-for="(cmd, i) in commands"
        class="entity-commands-list-entry"
        :key="cmd.id"
      >
        <div class="entity-commands-list-entry-command">{{ cmd.command }}</div>
        <div class="entity-commands-list-entry-usage">{{ cmd.usage }}</div>
        <div class="entity-commands-list-entry-description">
          {{ cmd.description }}
        </div>
        <v-divider v-if="i < commands.length - 1" />
      </div>
    </div>
    <table v-else class="entity-commands-table">
      <tr v-for="cmd in commands" :key="cmd.id">
        <td>
          <div class="entity-commands-command">
            {{ cmd.command }}
          </div>
        </td>
        <td>
          <div class="entity-commands-usage">
            {{ cmd.usage }}
          </div>
        </td>
        <td>
          <div class="entity-commands-description">
            {{ cmd.description }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "EntityCommands",

  props: {
    commands: {
      required: true,
      type: Array,
    },
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../style/style.less";

.entity-commands {
  &-list {
    &-entry {
      &-command {
        color: @primary;
      }
      &-command,
      &-usage,
      &-description {
        text-align: start;
      }
    }
  }
  &-table {
    width: 100%;
  }
  &-command {
    text-align: start;
    color: @primary;
  }
  &-usage,
  &-description {
    text-align: start;
    margin-left: 8px;
  }
}
</style>
