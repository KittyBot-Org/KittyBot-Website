<template>
  <v-select v-model="$i18n.locale" :items="languages">
    <template v-slot:item="{ item }">
      <template>
        <v-list-item-avatar>
          {{ item }}
          <!--<country-flag :country="item" size="small" />-->
        </v-list-item-avatar>
      </template>
    </template>
    <template v-slot:selection="{ item }">
      {{ item }}
      <!--<country-flag :country="item" size="small" />-->
    </template>
  </v-select>
</template>

<script>
//import CountryFlag from "vue-country-flag";

export default {
  name: "LanguageSelector",

  data() {
    return {
      languages: ["en", "de"],
    };
  },

  components: {
    //CountryFlag,
  },
};
</script>
