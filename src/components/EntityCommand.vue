<template>
  <div class="entity-command" :class="{ mobile: isMobile }">
    <span class="entity-command-command"
      >{{ prefix }}{{ command.command }}</span
    >
    <div class="entity-command-description">
      {{ command.description }}
    </div>
  </div>
</template>
<script>
export default {
  name: "EntityCommand",

  props: {
    prefix: {
      required: true,
      type: String,
    },
    command: {
      required: true,
      type: Object,
    },
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../style/style.less";

.entity-command {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 8px;
  &-command {
    color: @primary;
    font-weight: 800;
  }
  .mobile > &-command {
    width: 100%;
  }
  &-description {
    padding-left: 16px;
  }
  .mobile > &-description {
    width: 100%;
  }
}
</style>
