<template>
  <v-select
    v-if="isDashBoard"
    class="guild-selector"
    :class="{ 'small-mobile': isSmallMobile }"
    v-model="selectedGuild"
    placeholder="Select Guild..."
    :single-line="true"
    :items="guilds"
    item-value="id"
    item-text="name"
    no-data-text="No mutal guilds found"
    @change="selectGuild"
  >
    <template v-slot:item="{ item }">
      <template>
        <v-list-item-avatar>
          <guild-icon
            :icon="item.icon"
            :alt="`${item.name} profile`"
            :text="item.name"
            :size="38"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
    <template v-slot:selection="{ item }">
      <guild-icon
        :icon="item.icon"
        :alt="`${item.name} profile`"
        :text="item.name"
        :size="36"
        style="margin-right: 8px; margin-bottom: 4px"
      />
      <span style="margin-bottom: 4px">{{ item.name }}</span>
    </template>
  </v-select>
</template>
<script>
import GuildIcon from "./GuildIcon";

export default {
  name: "GuildSelector",

  props: {
    guilds: {
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      selectedGuild: -1,
    };
  },

  beforeUpdate() {
    this.selectedGuild = this.$route.params.guildId;
  },

  components: {
    GuildIcon,
  },

  computed: {
    isSmallMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    isDashBoard() {
      let path = this.$route.path;
      if (path.substr(-1) == "/") {
        path = path.substr(0, path.length - 1);
      }
      return !["", "/features", "/commands", "/privacy"].includes(path);
    },
  },

  methods: {
    selectGuild(guildId) {
      if (guildId != undefined) {
        this.$router.push({ path: `/guilds/${guildId}/dashboard` });
      }
    },
  },
};
</script>
