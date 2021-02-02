<template>
  <v-autocomplete
    v-model="selectedChannel"
    placeholder="Select Channel..."
    :items="parsedChannels"
    :no-data-text="noDataText"
    :chips="chips"
    :clearable="clearable"
    :deletable-chips="deletableChips"
    :multiple="multiple"
  >
    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title>#{{ item.text }}</v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "RoleSelector",

  props: {
    value: {
      required: true,
    },
    channels: {
      required: true,
      type: Array,
    },
    noDataText: {
      required: false,
      type: String,
      default: "No Channels found",
    },
    chips: {
      required: false,
      type: Boolean,
      default: false,
    },
    clearable: {
      required: false,
      type: Boolean,
      default: false,
    },
    deletableChips: {
      required: false,
      type: Boolean,
      default: false,
    },
    multiple: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  computed: {
    parsedChannels() {
      return this.channels.map((c) => {
        return {
          text: c.name,
          value: c.id,
        };
      });
    },
    selectedChannel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
