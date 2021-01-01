<template>
  <div v-if="show" class="shadow" />
</template>
<script>
export default {
  name: "PageShadow",

  props: {
    show: {
      required: true,
      type: Boolean,
    },
  },
};
</script>
<style lang="less" scoped>
.shadow {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-color: black;
}
</style>
