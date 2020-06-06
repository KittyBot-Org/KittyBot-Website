<template>
  <div class="entity-setting">
    <span class="entity-setting-label">{{ label }}</span>
    <div class="entity-setting-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "EntitySetting",

  props: {
    label: {
      required: false,
      type: String
    }
  }
};
</script>

<style lang="less" scoped>

.entity-setting {
  display: flex;
  border: 1px solid green;
  &-label {
    text-align: left;
    min-width: 220px;
    padding: 8px;
    border: 1px solid red;
  }
  &-content {
    min-width: 800px;
    padding: 8px;
    border: 1px solid blue;
  }
}

</style>