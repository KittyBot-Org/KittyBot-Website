<template>
  <div class="view-commands">
    <h1>Commands</h1>
    <v-text-field v-model="search" placeholder="search..."></v-text-field>
    <div class="view-commands-list" :class="{ mobile: isMobile }">
      <entity-command-filter v-model="filter" :categories="categories" />
      <entity-commands :filter="filter" :search="search" :commands="commands" />
    </div>
  </div>
</template>

<script>
import API from "../api";
import EntityCommands from "../components/EntityCommands";
import EntityCommandFilter from "../components/EntityCommandFilter.vue";

export default {
  name: "ViewCommands",

  data() {
    return {
      filter: "All",
      search: "",
      categories: [],
      commands: [],
    };
  },

  created() {
    API.get("commands").then(
      (response) => {
        this.prefix = response.body.prefix;
        this.categories = response.body.categories;
        this.commands = response.body.commands;
        this.ready = true;
      },
      (error) => {
        this.addError(error);
      }
    );
  },

  components: {
    EntityCommands,
    EntityCommandFilter,
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
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
  &-list {
    display: flex;
    flex-direction: row;
    gap: 16px;
    &.mobile {
      flex-wrap: wrap;
    }
  }
}
</style>
