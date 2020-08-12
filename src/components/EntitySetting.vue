<template>
  <div class="entity-setting">
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
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.entity-setting {
  display: flex;
  align-items: baseline;
  &-label {
    text-align: left;
    min-width: 220px;
    padding: 8px;
  }
  &-content {
    max-width: 800px;
    min-width: 400px;
    padding: 8px;
  }
  &-description {
    border: 1px solid red;
    max-width: 800px;
    padding: 8px;
  }
}
</style>
