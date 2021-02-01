<template>
  <div class="expansion-panel" :class="{ dark: isDark }">
    <button
      class="expansion-panel-header"
      :class="{ dark: isDark }"
      @click="clickHeader"
    >
      <slot name="header" />
      <v-btn icon
        ><v-icon>{{ open ? "expand_less" : "expand_more" }}</v-icon></v-btn
      >
    </button>
    <div v-if="open" class="expansion-panel-content">
      <slot name="default" />
    </div>
  </div>
</template>
<script>
export default {
  name: "ExpansionPanel",

  data() {
    return {
      open: false,
    };
  },

  methods: {
    clickHeader() {
      this.open = !this.open;
    },
  },

  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    },
  },
};
</script>
<style lang="less" scoped>
.expansion-panel {
  width: 100%;
  border-radius: 4px;
  background-color: #eeeeee;
  &.dark {
    background-color: #272727;
  }
  &-header {
    border-radius: 4px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    &:hover {
      transition: background-color 0.2s;
      background-color: #d8d8d8;
      &.dark {
        background-color: #383838;
      }
    }
  }
  &-content {
    text-align: start;
    padding: 8px;
  }
}
</style>
