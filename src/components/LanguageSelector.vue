<template>
  <div class="language-selector">
    {{ _i18n.locale }}
    <select
      class="language-selector"
      :class="{ isDark }"
      v-model="_i18n.locale"
    >
      <option v-for="language in languages" :key="language" :value="language">
        {{ language }}
        <country-flag :country="language" size="normal" />
      </option>
    </select>
  </div>
</template>

<script>
import CountryFlag from "vue-country-flag";

export default {
  name: "LanguageSelector",

  data() {
    return {
      languages: ["gb", "de"],
    };
  },

  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    },
    locale() {
      console.log(this._i18n.locale);
      return this._i18n.locale;
    },
  },

  components: {
    CountryFlag,
  },
};
</script>
<style lang="less" scoped>
.language-selector {
  color: #000000;
  &.isDark {
    color: #ffffff;
  }
}
</style>
