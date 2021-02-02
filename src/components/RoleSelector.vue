<template>
  <v-autocomplete
    v-model="selectedRole"
    placeholder="Select Role..."
    :items="parsedRoles"
    :no-data-text="noDataText"
    :chips="chips"
    :clearable="clearable"
    :deletable-chips="deletableChips"
    :multiple="multiple"
  >
    <template v-slot:item="{ item }">
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
    roles: {
      required: true,
      type: Array,
    },
    noDataText: {
      required: false,
      type: String,
      default: "No Roles found",
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
    parsedRoles() {
      return this.roles.map((e) => {
        return {
          text: e.name,
          color: e.color,
          value: e.id,
        };
      });
    },
    selectedRole: {
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
