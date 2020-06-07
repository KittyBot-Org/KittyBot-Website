<template>
  <div class="view-guild">
    <div v-if="ready" class="view-guild-settings">
      <h1>Guild Settings</h1>
      <entity-setting label="Bot Prefix">
        <v-text-field
          v-model="settings.prefix"
          placeholder="Prefix"
          :counter="1"
        />
      </entity-setting>

      <entity-setting label="Enable Welcome Messages">
        <v-checkbox v-model="settings.welcome_message_enabled" />
      </entity-setting>

      <entity-setting label="Welcome Message">
        <v-textarea
          v-model="settings.welcome_message"
          placeholder="Welcome Message"
        />
      </entity-setting>

      <entity-setting label="Welcome Channel">
        <v-autocomplete
          v-model="settings.welcome_channel_id"
          :items="getChannels()"
        />
      </entity-setting>

      <entity-setting label="NSFW Commands Enabled">
        <v-checkbox v-model="settings.nsfw_enabled" />
      </entity-setting>

      <entity-setting label="Self-assignable Roles">
        <v-list :flat="true">
          <v-list-item
            v-for="(role, i) in settings.self_assignable_roles"
            :key="role.role"
          >
            <v-list-item-avatar>
              <v-img :src="getRoleEmote(role)" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ getRoleName(role) }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeSelfAssignableRole(i)">
                <v-icon color="red lighten-1">delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <div class="view-guild-settings-selfassignableroles">
          <v-autocomplete v-model="selectedRole" :items="getRoles()" />
          <v-autocomplete v-model="selectedEmote" :items="getEmotes()" />
          <v-btn
            :disabled="isAddButtonDisabled"
            @click="addSelfAssignabelRole()"
          >
            Add
          </v-btn>
        </div>
      </entity-setting>
    </div>
    <div class="view-guild-buttons">
      <v-btn
        :loading="saveLoading"
        :disabled="isSaveAndResetButtonDisabled"
        @click="save"
      >
        Save
      </v-btn>
      <v-btn :disabled="isSaveAndResetButtonDisabled" @click="reset">
        Reset
      </v-btn>
    </div>
  </div>
</template>

<script>
import EntitySetting from "../components/EntitySetting";
import { cloneDeep } from "lodash";
import API from "../api";

export default {
  name: "ViewGuilds",

  components: {
    EntitySetting
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
      selectedEmote: null,
      saveLoading: false
    };
  },

  computed: {
    isAddButtonDisabled() {
      return this.selectedRole == null || this.selectedEmote == null;
    },
    isSaveAndResetButtonDisabled() {
      return !API.areSettingsChanged(this.settings, this.initialSettings);
    }
  },

  created() {
    API.get(`guilds/${this.guildId()}/channels/get`).then(response => {
      if (response.status == 200) {
        response.body.channels.forEach(e => {
          this.channels.push({
            name: e.name,
            id: e.id
          });
        });
      } else {
        // TODO throw errors
      }
    });
    API.get(`guilds/${this.guildId()}/emotes/get`).then(response => {
      if (response.status == 200) {
        response.body.emotes.forEach(e => {
          this.emotes.push({
            id: e.id,
            name: e.name,
            url: e.url
          });
        });
      } else {
        // TODO throw errors
      }
    });
    API.get(`guilds/${this.guildId()}/roles/get`).then(response => {
      if (response.status == 200) {
        response.body.roles.forEach(e => {
          this.roles.push({
            id: e.id,
            name: e.name
          });
        });
      } else {
        // TODO throw errors
      }
    });
    API.get(`guilds/${this.guildId()}/settings/get`).then(response => {
      if (response.status == 200) {
        this.initialSettings = response.body;
        this.settings = cloneDeep(this.initialSettings);
      } else {
        // TODO throw error
      }
      this.ready = true;
    });
  },

  methods: {
    guildId() {
      return this.$route.params.guildId;
    },
    getRoleEmote(sRole) {
      let emote = this.emotes.find(e => e.id == sRole.emote);
      return emote === undefined ? "../assets/loading.png" : emote.url;
    },
    getRoleName(sRole) {
      let role = this.roles.find(r => r.id == sRole.role);
      return role === undefined ? "loading..." : role.name;
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
      return this.roles
        .filter(
          r => !this.settings.self_assignable_roles.find(sr => sr.role == r.id)
        )
        .map(r => {
          return {
            text: r.name,
            value: r.id
          };
        });
    },
    getEmotes() {
      return this.emotes
        .filter(
          e => !this.settings.self_assignable_roles.find(sr => sr.emote == e.id)
        )
        .map(e => {
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
    removeSelfAssignableRole(roleIndex){
      this.settings.self_assignable_roles.splice(roleIndex, 1);
    },
    save() {
      this.saveLoading = true;
      Object.keys(this.settings).forEach(s => {
        if (Object.is(this.settings[s], this.initialSettings[s])) {
          delete this.settings[s];
        } else {
          this.initialSettings[s] = cloneDeep(this.settings[s]);
        }
      });
      API.post(`guilds/${this.guildId()}/settings/set`, this.settings).then(
        response => {
          this.saveLoading = false;
          if (response.code != 200) {
            // TODO throw error
          }
        }
      );
    },
    reset() {
      this.settings = cloneDeep(this.initialSettings);
      this.selectedRole = null;
      this.selectedEmote = null;
    }
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
