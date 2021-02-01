<template>
  <div class="expansion-panels">
    <slot />
  </div>
</template>
<script>
export default {
  name: "ExpansionPanels",
};
</script>
<style lang="less" scoped>
.expansion-panels {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
</style>
