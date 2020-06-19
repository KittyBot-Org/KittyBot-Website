<template>
  <div class="admin">
    <v-list>
      <v-list-item v-for="guild in guilds" :key="guild.id">
        <v-list-item-avatar tile>
          <v-img :src="guild.icon" />
        </v-list-item-avatar>
        <v-list-item-content>
          <span>{{ guild.name }}</span>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon :to="`/guilds/${guild.id}/dashboard`">
            <v-icon>open_in_full</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
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

</style>
