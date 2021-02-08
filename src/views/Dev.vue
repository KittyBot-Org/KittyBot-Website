<template>
  <div class="dev">
    <v-data-table
      :headers="headers"
      :items="filteredGuilds"
      :search="search"
      item-key="name"
      :loading="loading"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Guilds</v-toolbar-title>
          <v-divider class="mx-8" inset vertical />
          <v-spacer />
          <v-text-field
            class="search"
            v-model="search"
            placeholder="search..."
          />
          <v-spacer />
          <v-switch
            class="sort-switch"
            v-model="onlyPlayers"
            label="Active Players only"
          />
        </v-toolbar>
      </template>
      <template v-slot:[`item.icon`]="{ item }">
        <guild-icon
          :icon="item.icon"
          :alt="`${item.name} profile`"
          :text="item.name"
          :size="36"
        />
      </template>
      <template v-slot:[`item.open_in_new`]="{ item }">
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
  name: "Dev",

  components: {
    GuildIcon,
  },

  data() {
    return {
      sortBy: "name",
      sortDesc: false,
      headers: [
        { value: "icon", sortable: false, filterable: false },
        { text: "Name", value: "name" },
        { text: "ID", value: "id" },
        { text: "Owner", value: "owner" },
        { text: "Member Count", value: "count" },
        { text: "Plays Music", value: "plays_music" },
        { text: "Queue Size", value: "queue_size" },
        { text: "History Size", value: "history_size" },
        { value: "open_in_new", sortable: false, filterable: false },
      ],
      guilds: [],
      search: "",
      onlyPlayers: false,
      loading: true,
    };
  },

  created() {
    API.get(`guilds`).then(
      (response) => {
        this.guilds = response.body.guilds;
        this.loading = false;
      },
      (error) => {
        this.addError(error);
      }
    );
  },

  computed: {
    filteredGuilds() {
      if (this.onlyPlayers) {
        return this.guilds.filter((guild) => guild.plays_music);
      }
      return this.guilds;
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
.search /deep/ .v-input__control .v-input__slot {
  margin-bottom: 0;
}
.sort-switch /deep/ .v-input__control .v-messages {
  min-height: 0 !important;
}
</style>
