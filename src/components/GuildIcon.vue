<template>
  <div class="guild-icon">
    <v-avatar
      :color="icon == null ? 'blue' : undefined"
      :size="size"
      :tile="!hasIcon"
    >
      <span v-if="hasIcon" :style="{ 'font-size': `${size / 2.5}px` }">{{
        shortText
      }}</span>
      <v-img v-else :src="icon" :alt="alt" />
    </v-avatar>
  </div>
</template>
<script>
export default {
  name: "GuildIcon",
  props: {
    icon: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 128,
    },
  },
  computed: {
    shortText() {
      if (this.text == null) {
        return "";
      }
      let text = this.text;
      if (this.text.includes(" ")) {
        text = this.text
          .split(" ")
          .map((n) => n[0])
          .join("");
      }
      return text.substr(0, this.size > 42 ? 3 : 2);
    },
    hasIcon() {
      return this.icon == null || this.icon == "";
    },
  },
};
</script>
40 src/router.js
