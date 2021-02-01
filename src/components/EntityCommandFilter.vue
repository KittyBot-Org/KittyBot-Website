<template>
  <div class="entity-command-filter" :class="{ mobile: isMobile }">
    <v-btn
      :color="value == 'All' ? 'primary' : undefined"
      @click="clickFilter('All')"
      >All</v-btn
    >
    <v-btn
      v-for="category in categories"
      :key="category.name"
      :color="value == category.name ? 'primary' : undefined"
      @click="clickFilter(category.name)"
    >
      {{ category.name }}
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "EntityCommandFilter",

  props: {
    value: {
      required: true,
      type: String,
    },
    categories: {
      required: true,
      type: Array,
    },
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },

  methods: {
    clickFilter(filter) {
      this.$emit("input", filter);
    },
  },
};
</script>
<style lang="less" scoped>
.entity-command-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  &:not(.mobile) {
    flex-direction: column;
  }
}
</style>
