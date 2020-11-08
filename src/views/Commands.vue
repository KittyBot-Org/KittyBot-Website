<template>
  <div class="view-commands">
    <h1>Commands</h1>
    <v-expansion-panels :multiple="true">
      <v-expansion-panel v-for="category in categories" :key="category.name">
        <v-expansion-panel-header>
          <div>
            <v-avatar :size="32" tile>
              <img :src="category.emote_url" />
            </v-avatar>
            <span class="view-commands-header">{{ category.name }}</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <entity-commands :commands="category.commands" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import EntityCommands from "../components/EntityCommands";
import API from "../api";

export default {
  name: "ViewCommands",

  data() {
    return {
      prefix: "",
      categories: [],
    };
  },

  created() {
    API.get("commands/get").then(
      (response) => {
        this.prefix = response.body.prefix;
        response.body.categories.forEach((e) => {
          this.categories.push({
            name: e.name,
            emote_url: e.emote_url,
            commands: e.commands,
          });
        });
        this.ready = true;
      },
      (error) => {
        this.addError(error);
      }
    );
  },

  components: {
    EntityCommands,
  },

  methods: {
    addError(response) {
      this.$emit("error", response);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.view-commands {
  text-align: center;
  h1 {
    color: @primary;
    margin-bottom: 8px;
  }
  &-header {
    margin-left: 8px;
  }
}
</style>
