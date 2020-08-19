<template>
  <div class="view-commands">
    <h1>Commands</h1>
    <entity-command-category
      v-for="category of categories"
      :key="category.name"
      :category="category"
      :prefix="prefix"
    />
  </div>
</template>

<script>
import EntityCommandCategory from "../components/EntityCommandCategory";
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
    EntityCommandCategory,
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
  }
}
</style>
