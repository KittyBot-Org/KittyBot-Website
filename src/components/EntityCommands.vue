<template>
  <expansion-panels class="entity-commands" :multiple="true">
    <expansion-panel v-for="cmd in sortedCommands" :key="cmd.name">
      <div slot="header" class="entity-commands-header">
        <b class="entity-commands-header-name">/{{ cmd.name }}</b>
        <span class="entity-commands-header-usage">{{ getUsage(cmd) }}</span>
      </div>
      <template>
        <p class="entity-commands-content-description">{{ cmd.description }}</p>
        <p
          v-if="cmd.permissions.length > 0 && !hasSubCommands(cmd)"
          class="entity-commands-content-permissions"
        >
          Requires: <span>{{ getPermissions(cmd) }}</span>
        </p>
        <template v-if="hasSubCommands(cmd)">
          <b>Sub Commands:</b>
          <div
            class="entity-commands-content-subcommands"
            :class="{ mobile: isMobile }"
          >
            <template v-for="(opt, i) in getSubCommands(cmd)">
              <div
                :key="`${i}-name`"
                class="entity-commands-content-subcommands-name"
              >
                <b class="entity-commands-content-subcommands-name-name"
                  >/{{ opt.name }}</b
                >
                <span
                  v-if="hasPermissions(opt)"
                  class="entity-commands-content-subcommands-name-perms"
                >
                  Requires: {{ getPermissions(opt) }}
                </span>
              </div>
              <div
                :key="`${i}-usage`"
                class="entity-commands-content-subcommands-usage"
              >
                {{ getUsage(opt) }}
              </div>
              <div
                :key="`${i}-description`"
                class="entity-commands-content-subcommands-description"
              >
                {{ opt.description }}
              </div>
            </template>
          </div>
        </template>
      </template>
    </expansion-panel>
  </expansion-panels>
</template>
<script>
import ExpansionPanels from "./ExpansionPanels";
import ExpansionPanel from "./ExpansionPanel";
export default {
  name: "EntityCommands",

  props: {
    filter: {
      required: true,
      type: String,
    },
    search: {
      required: true,
      type: String,
    },
    commands: {
      required: true,
      type: Array,
    },
  },

  components: {
    ExpansionPanels,
    ExpansionPanel,
  },

  methods: {
    getUsage(cmd) {
      if (cmd.options == undefined || this.hasSubCommands(cmd)) {
        return "";
      }
      var usage = "";
      cmd.options.forEach(
        (opt) => (usage += opt.required ? `[${opt.name}] ` : `(${opt.name}) `)
      );
      return usage;
    },
    getPermissions(opt) {
      var perms = "";
      if (opt.dev_only) {
        perms += "Developer ";
      }
      if (opt.permissions == undefined) {
        return perms;
      }
      opt.permissions.forEach((perm) => (perms += perm));
      return perms;
    },
    hasPermissions(opt) {
      if (
        opt.permissions == undefined ||
        (opt.permissions.length == 0 && !opt.dev_only)
      ) {
        return false;
      }
      return true;
    },
    hasSubCommands(cmd) {
      if (cmd.options == undefined) {
        return false;
      }
      return cmd.options.some((opt) => opt.type == 1 || opt.type == 2);
    },
    getSubCommands(cmd) {
      if (cmd.options == undefined) {
        return [];
      }
      var allCommands = [];
      cmd.options.forEach((opt) => {
        allCommands.push(
          ...this.collectOptions(opt, cmd.name, cmd.permissions, cmd.dev_only)
        );
      });
      return allCommands;
    },
    collectOptions(option, baseName, perms, devOnly) {
      var allCommands = [];
      switch (option.type) {
        case 1:
          allCommands.push({
            name: baseName + " " + option.name,
            description: option.description,
            options: option.options,
            dev_only: option.dev_only || devOnly,
            permissions:
              option.permissions == undefined
                ? perms
                : [...option.permissions, ...perms],
          });
          break;

        case 2:
          if (option.options != undefined) {
            option.options.forEach((opt) => {
              allCommands.push(
                ...this.collectOptions(
                  opt,
                  baseName + " " + option.name,
                  option.permissions == undefined
                    ? perms
                    : [...option.permissions, ...perms],
                  option.dev_only || devOnly
                )
              );
            });
          }
          break;
      }
      return allCommands;
    },
  },

  computed: {
    filteredCommands() {
      var cmds = this.commands.filter((cmd) =>
        cmd.name.includes(this.search.trim().toLowerCase())
      );
      if (this.filter == "All") {
        return cmds;
      }
      return cmds.filter((cmd) => cmd.category == this.filter);
    },
    sortedCommands() {
      return this.filteredCommands.slice(0).sort((a, b) => a.name > b.name);
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../style/style.less";

.entity-commands {
  display: flex;
  &-header {
    display: flex;
    width: 100%;
    &-name {
      margin-right: 16px;
      color: @primary;
    }
  }
  &-content {
    &-permissions > span {
      color: #5c5fea;
    }
    &-subcommands {
      display: grid;
      &-name {
        display: flex;
        flex-direction: column;
        &-name {
          color: @primary;
        }
        &-perms {
          font-size: 12px;
          color: grey;
        }
      }
      &:not(.mobile) {
        grid-template-columns: minmax(280px, auto) auto auto;
        & > div {
          border-bottom: 1px grey solid;
          padding: 8px;
          &:last-child,
          &:nth-last-child(2),
          &:nth-last-child(3) {
            border-bottom: none;
          }
        }
      }
      &.mobile {
        grid-template-columns: 1fr;
        & > div {
          padding-left: 4px;
          padding-right: 4px;
          &:nth-child(3n) {
            border-bottom: 1px grey solid;
            padding-bottom: 8px;
            margin-bottom: 12px;
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>
