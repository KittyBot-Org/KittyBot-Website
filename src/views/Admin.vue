<template>
  <div class="admin">
    <v-data-table
      :headers="headers"
      :items="guilds"
      item-key="name"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:[`item.icon`]="{ item }">
        <v-avatar><v-img :src="item.icon" /></v-avatar>
      </template>
      <template v-slot:[`item.open`]="{ item }">
        <v-btn
          icon
          color="#5c5fea"
          target="_blank"
          :to="`/guilds/${item.id}/dashboard`"
        >
          <v-icon>open_in_new</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <!--  <v-list>
      <v-list-item-group>
        <v-list-item v-for="guild in guilds" :key="guild.id">
          <v-list-item-avatar tile>
            <v-img :src="guild.icon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <span>{{ guild.name }}({{ guild.id }})</span>
          </v-list-item-content>
          <span>Members: {{ guild.count }}</span>
          <v-list-item-action>
            <v-btn
              icon
              color="#5c5fea"
              target="_blank"
              :to="`/guilds/${guild.id}/dashboard`"
            >
              <v-icon>open_in_new</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list> -->
  </div>
</template>

<script>
import API from "../api";

export default {
  name: "Admin",

  data() {
    return {
      headers: [
        { value: "icon", sortable: false },
        { text: "Name", value: "name" },
        { text: "ID", value: "id" },
        { text: "Member Count", value: "count" },
        { value: "open", sortable: false },
      ],
      guilds: [],
    };
  },
  created() {
    API.get(`guilds/all`).then(
      (response) => {
        this.guilds = response.body.guilds;
      },
      (error) => {
        this.addError(error);
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
