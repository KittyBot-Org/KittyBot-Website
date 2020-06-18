<template>
  <div class="admin">
    All Guilds:
    <div class="admin-guilds">
      <div v-for="guild in guilds" :key="guild.id">
        <v-img :src="guild.icon" />
        <span>{{ guild.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../api";

export default {
  name: "Admin",

  data() {
    return {
      guilds: [],
    };
  },

  created() {
    API.get(`guilds/all`).then(
      (response) => {
        this.guilds = response.body.guilds;
      },
      (response) => {
        this.addError(response);
      }
    );
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

.admin {
  display: flex;
  justify-content: center;
  &-guilds {
    display: flex;
    text-align: center;
    & a {
      text-decoration: none;
    }
  }
}
</style>
