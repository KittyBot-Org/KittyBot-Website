<template>
  <v-autocomplete
    v-model="selectedUser"
    placeholder="Select User..."
    :items="parsedUsers"
    :no-data-text="noDataText"
    :chips="chips"
    :clearable="clearable"
    :deletable-chips="deletableChips"
    :multiple="multiple"
  >
    <template v-slot:item="{ item }">
      <v-list-item-avatar>
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
  name: "UserSelector",

  props: {
    value: {
      required: true,
    },
    users: {
      required: true,
      type: Array,
    },
    noDataText: {
      required: false,
      type: String,
      default: "No Users found",
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
    parsedUsers() {
      return this.users.map((e) => {
        return {
          text: e.name,
          url: e.url,
          color: e.color,
          value: e.id,
        };
      });
    },
    selectedUser: {
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
