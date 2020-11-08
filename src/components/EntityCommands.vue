<template>
  <div class="entity-commands">
    <div v-if="isMobile" class="entity-commands-list">
      <div
        v-for="(cmd, i) in commands"
        class="entity-commands-list-entry"
        :key="cmd.command"
      >
        <div class="entity-commands-list-entry-command">{{ cmd.command }}</div>
        <div class="entity-commands-list-entry-usage">{{ cmd.usage }}</div>
        <div
          class="entity-commands-list-entry-description"
          v-html="formatDescription(cmd.description)"
        />
        <v-divider v-if="i < commands.length - 1" />
      </div>
    </div>
    <table v-else class="entity-commands-table">
      <tr
        v-for="cmd in commands"
        :key="cmd.command"
        class="entity-commands-table-row"
      >
        <td>
          <div>
            {{ cmd.command }}
          </div>
        </td>
        <td>
          <div>
            {{ cmd.usage }}
          </div>
        </td>
        <td>
          <div v-html="formatDescription(cmd.description)" />
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

  methods: {
    formatDescription(description) {
      let elements = description.match(/\[.*?\)/g);
      if (elements != null && elements.length > 0) {
        for (let el of elements) {
          let txt = el.match(/\[(.*?)\]/)[1];
          let url = el.match(/\((.*?)\)/)[1];
          description = description.replace(
            el,
            `<a href="${url}" style="color: #5c5fea" target="_blank">${txt}</a>`
          );
        }
      }
      return description;
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
    border-collapse: collapse;
  }
  & td {
    text-align: start;
    vertical-align: top;
    & div {
      padding-left: 8px;
    }
  }
  & td:first-child {
    color: @primary;
  }
}
</style>
