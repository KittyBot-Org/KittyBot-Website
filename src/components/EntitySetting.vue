<template>
  <div class="entity-setting" :class="{ mobile: isMobile }">
    <span class="entity-setting-label">{{ label }}</span>
    <div class="entity-setting-content">
      <slot name="default" />
    </div>
    <div v-if="$slots.description" class="entity-setting-description">
      <slot name="description" />
    </div>
  </div>
</template>

<script>
export default {
  name: "EntitySetting",

  props: {
    label: {
      required: false,
      type: String,
    },
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.entity-setting {
  display: flex;
  &.mobile {
    flex-direction: column;
  }
  align-items: baseline;
  &-label {
    font-size: 15px;
    text-align: left;
    min-width: 220px;
    padding: 8px;
  }
  .mobile > &-label {
    min-width: auto;
    width: 100%;
  }
  &-content {
    max-width: 800px;
    min-width: 350px;
    padding: 8px;
  }
  .mobile > &-content {
    min-width: auto;
    width: 100%;
  }
  &-description {
    border-left: 2px solid #363636;
    border-radius: 2px;
    max-width: 800px;
    padding: 8px;
  }
  .mobile > &-description {
    min-width: auto;
    width: 100%;
  }
}
</style>
