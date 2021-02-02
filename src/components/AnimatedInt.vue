<template>
  <span>{{ formattedValue }}</span>
</template>
<script>
import TWEEN from "tween";

export default {
  name: "AnimatedInt",

  props: {
    value: {
      required: true,
      type: Number,
    },
  },

  data() {
    return {
      tweeningValue: 0,
      format: new Intl.NumberFormat("de-DE", { maximumSignificantDigits: 3 }),
    };
  },

  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue);
    },
  },

  mounted() {
    this.tween(0, this.value);
  },

  computed: {
    formattedValue() {
      return this.format.format(this.tweeningValue);
    },
  },

  methods: {
    tween: function (startValue, endValue) {
      var vm = this;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue.toFixed(0);
        })
        .start();

      animate();
    },
  },
};
</script>
