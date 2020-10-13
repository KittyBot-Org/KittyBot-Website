<template>
  <div class="admin">
    <v-data-table
      :headers="headers"
      :items="guilds"
      item-key="name"
      :loading="loading"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:[`item.icon`]="{ item }">
        <guild-icon
          :icon="item.icon"
          :alt="`${item.name} profile`"
          :text="item.name"
          :size="36"
        />
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
      <template v-slot:[`item.name`]="{ item }">{{
        item.name.length > 36 ? item.name.substr(0, 35) + "..." : item.name
      }}</template>
      <template v-slot:[`item.owner`]="{ item }">{{
        item.owner == undefined ? "not loaded" : item.owner
      }}</template>
    </v-data-table>
  </div>
</template>

<script>
import GuildIcon from "../components/GuildIcon";
import API from "../api";

export default {
  name: "Admin",

  components: {
    GuildIcon,
  },

  data() {
    return {
      headers: [
        { value: "icon", sortable: false },
        { text: "Name", value: "name" },
        { text: "ID", value: "id" },
        { text: "Owner", value: "owner" },
        { text: "Member Count", value: "count" },
        { value: "open", sortable: false },
      ],
      guilds: [],
      loading: true,
    };
  },
  created() {
    API.get(`guilds/all`).then(
      (response) => {
        this.guilds = response.body.guilds;
        this.loading = false;
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
