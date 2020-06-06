<template>
  <div class="view-guild">
    <div v-if="ready" class="view-guild-settings">
      <h1>Guild Settings</h1>
      <entity-setting label="Bot Prefix">
        <v-text-field v-model="settings.prefix" placeholder="Preifx" :counter="1"></v-text-field>
      </entity-setting>

      <entity-setting label="Enable Welcome Messages">
        <v-checkbox v-model="settings.welcome_message_enabled" />
      </entity-setting>

      <entity-setting label="Welcome Message">
        <v-textarea v-model="settings.welcome_message" placeholder="Welcome Message"></v-textarea>
      </entity-setting>

      <entity-setting label="Welcome Channel">
        <v-autocomplete
          v-model="settings.welcome_channel_id"
          :items="getChannels()"
        ></v-autocomplete>
      </entity-setting>

      <entity-setting label="NSFW Commands Enabled">
        <v-checkbox v-model="settings.nsfw_enabled" />
      </entity-setting>

      <entity-setting label="Self-assignable Roles">
        <v-list :flat="true">
          <v-list-item v-for="role in settings.self_assignable_roles" :key="role.role">
            <v-list-item-avatar>
              <v-img :src="getRoleEmote(role)"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ getRoleName(role) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="view-guild-settings-selfassignableroles">
          <v-autocomplete v-model="selectedRole" :items="getRoles()"></v-autocomplete>
          <v-autocomplete v-model="selectedEmote" :items="getEmotes()"></v-autocomplete>
          <v-btn @click="addSelfAssignabelRole()">Add</v-btn>
        </div>
      </entity-setting>
    </div>
    <div class="view-guild-buttons">
      <v-btn @click="save">Save</v-btn>
      <v-btn @click="reset">Reset</v-btn>
    </div>
  </div>
</template>

<script>
import EntitySetting from "../components/EntitySetting";

export default {
  name: "ViewGuilds",

  props: {
    backend: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      ready: false,
      initialSettings: {},
      settings: {},
      roles: [],
      channels: [],
      emotes: [],
      selectedRole: null,
      selectedEmote: null
    };
  },

  created() {
    this.$http
      .get(
        `${this.backend}/guilds/${this.$route.params.guildId}/settings/get`,
        { headers: { Authorization: localStorage.getItem("auth_key") } }
      )
      .then(response => {
        this.settings = response.body;
        Object.assign(this.initialSettings, this.settings);
      });
    this.$http
      .get(
        `${this.backend}/guilds/${this.$route.params.guildId}/channels/get`,
        { headers: { Authorization: localStorage.getItem("auth_key") } }
      )
      .then(response => {
        response.body.channels.forEach(e => {
          this.channels.push({
            name: e.name,
            id: e.id
          });
        });
      });
    this.$http
      .get(`${this.backend}/guilds/${this.$route.params.guildId}/emotes/get`, {
        headers: { Authorization: localStorage.getItem("auth_key") }
      })
      .then(response => {
        response.body.emotes.forEach(e => {
          this.emotes.push({
            id: e.id,
            name: e.name,
            url: e.url
          });
        });
      });
    this.$http
      .get(`${this.backend}/guilds/${this.$route.params.guildId}/roles/get`, {
        headers: { Authorization: localStorage.getItem("auth_key") }
      })
      .then(response => {
        response.body.roles.forEach(e => {
          this.roles.push({
            id: e.id,
            name: e.name
          });
        });
        this.ready = true;
      });
  },

  methods: {
    getRoleEmote(sRole){
      let emote = this.emotes.find(e => e.id == sRole.emote);
      if(emote == undefined){
        return "../../assets/loading.png";
      }
      return emote.url;
    },
    getRoleName(sRole){
      let role = this.roles.find(r => r.id == sRole.role);
      if(role == undefined){
        return "loading";
      }
      return role.name;
    },
    getChannels() {
      return this.channels.map(c => {
        return {
          text: c.name,
          value: c.id
        };
      });
    },
    getRoles() {
      return this.roles.filter(r => !this.settings.self_assignable_roles.find(sr => sr.role == r.id)).map(r => {
        return {
          text: r.name,
          value: r.id
        };
      });
    },
    getEmotes() {
      return this.emotes.filter(e => !this.settings.self_assignable_roles.find(sr => sr.emote == e.id)).map(e => {
        return {
          text: e.name,
          value: e.id
        };
      });
    },
    addSelfAssignabelRole() {      
      this.settings.self_assignable_roles.push({
        role: this.selectedRole,
        emote: this.selectedEmote
      });
      this.selectedRole = null;
      this.selectedEmote = null;
    },
    save() {},
    reset() {}
  },

  components: {
    EntitySetting
  }
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.view-guilds {
  display: flex;
  &-settings {
    display: flex;
    flex-grow: 1;
    &-selfassignableroles {
      display: flex;
      flex-direction: row;
    }
  }
  &-buttons {
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
  }
}
</style>
