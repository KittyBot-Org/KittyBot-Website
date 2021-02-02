<template>
  <v-autocomplete
    v-model="selectedEmote"
    placeholder="Select Emote..."
    :items="parsedEmotes"
    :multiple="multiple"
    :no-data-text="noDataText"
  >
    <template v-slot:item="{ item }">
      <v-list-item-avatar tile>
        <v-img :src="item.url" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title :style="{ color: item.color }">{{
          item.text
        }}</v-list-item-title>
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
    emotes: {
      required: true,
      type: Array,
    },
    multiple: {
      required: false,
      type: Boolean,
      default: false,
    },
    noDataText: {
      required: false,
      type: String,
      default: "No Emotes found",
    },
  },

  computed: {
    parsedEmotes() {
      return this.emotes.map((e) => {
        return {
          text: e.name,
          url: e.url,
          value: e.id,
        };
      });
    },
    selectedEmote: {
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
