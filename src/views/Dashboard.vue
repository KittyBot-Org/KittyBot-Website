<template>
  <div class="view-dashboard">
    <div v-if="ready" class="view-dashboard-settings">
      <v-expansion-panels v-model="openPanel" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>General</v-expansion-panel-header>
          <v-expansion-panel-content>
            <entity-setting label="Bot Prefix">
              <v-text-field
                v-model="settings.prefix"
                placeholder="Prefix"
                :counter="1"
              />
            </entity-setting>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Welcome</v-expansion-panel-header>
          <v-expansion-panel-content>
            <entity-setting label="Enable Welcome Messages">
              <v-switch v-model="settings.welcome_message_enabled" />
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
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>NSFW</v-expansion-panel-header>
          <v-expansion-panel-content>
            <entity-setting label="NSFW Commands Enabled">
              <v-checkbox v-model="settings.nsfw_enabled" />
            </entity-setting>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Roles</v-expansion-panel-header>
          <v-expansion-panel-content>
            <entity-setting label="Self-assignable Roles">
              <v-list v-if="settings.self_assignable_roles.length > 0">
                <v-list-item
                  v-for="(role, i) in settings.self_assignable_roles"
                  :key="role.role"
                >
                  <v-list-item-avatar tile>
                    <v-img :src="getRoleEmote(role)" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      getRoleName(role)
                    }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="removeSelfAssignableRole(i)">
                      <v-icon color="red">delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <div v-else>
                <span>
                  You have no self assignable roles added yet
                </span>
              </div>
              <div class="view-dashboard-settings-selfassignable-roles">
                <v-autocomplete
                  v-model="selectedEmote"
                  placeholder="Select Emote..."
                  :items="getEmotes()"
                />
                <v-autocomplete
                  v-model="selectedRole"
                  placeholder="Select Role..."
                  :items="getRoles()"
                />
                <v-btn
                  color="#5c5fea"
                  :disabled="isAddButtonDisabled"
                  @click="addSelfAssignabelRole()"
                >
                  Add
                </v-btn>
              </div>
            </entity-setting>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="view-dashboard-buttons">
      <v-btn
        color="success"
        :loading="saveLoading"
        :disabled="isSaveAndResetButtonDisabled"
        @click="save"
      >
        Save
      </v-btn>

      <v-btn color="error" text :disabled="isSaveAndResetButtonDisabled">
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
  name: "ViewDashboard",

  components: {
    EntitySetting
  },

  data() {
    return {
      resetDialog: false,
      openPanel: [0],
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
    API.get(`guilds/${this.guildId()}/channels/get`).then(
      response => {
        response.body.channels.forEach(e => {
          this.channels.push({
            name: e.name,
            id: e.id
          });
        });
      },
      response => {
        this.addError(response);
      }
    );
    API.get(`guilds/${this.guildId()}/emotes/get`).then(
      response => {
        response.body.emotes.forEach(e => {
          this.emotes.push({
            id: e.id,
            name: e.name,
            url: e.url
          });
        });
      },
      response => {
        this.addError(response);
      }
    );
    API.get(`guilds/${this.guildId()}/roles/get`).then(
      response => {
        response.body.roles.forEach(e => {
          this.roles.push({
            id: e.id,
            name: e.name
          });
        });
      },
      response => {
        this.addError(response);
      }
    );
    API.get(`guilds/${this.guildId()}/settings/get`).then(
      response => {
        this.initialSettings = response.body;
        this.settings = cloneDeep(this.initialSettings);
        this.ready = true;
      },
      response => {
        this.addError(response);
        this.ready = true;
      }
    );
  },

  methods: {
    addError(response) {
      this.$emit("error", response);
    },
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
    removeSelfAssignableRole(roleIndex) {
      this.settings.self_assignable_roles.splice(roleIndex, 1);
    },
    save() {
      this.saveLoading = true;
      let settings = cloneDeep(this.settings);
      Object.keys(settings).forEach(s => {
        if (s == "self_assignable_roles" && settings[s] instanceof Array) {
          if (
            API.areSelfAssignableRolesChanged(
              settings[s],
              this.initialSettings[s]
            )
          ) {
            this.initialSettings[s] = cloneDeep(settings[s]);
          } else {
            delete settings[s];
          }
        } else {
          if (Object.is(settings[s], this.initialSettings[s])) {
            delete settings[s];
          } else {
            this.initialSettings[s] = cloneDeep(settings[s]);
          }
        }
      });
      API.post(`guilds/${this.guildId()}/settings/set`, settings).then(
        response => {
          this.saveLoading = false;
          if (response.code != 200) {
            // TODO throw error
          }
        }
      );
    },
    reset() {
      this.resetDialog = false;
      this.settings = cloneDeep(this.initialSettings);
      this.selectedRole = null;
      this.selectedEmote = null;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.view-dashboard {
  display: flex;
  flex-direction: column;
  &-settings {
    display: flex;
    flex-direction: column;
    &-selfassignable-roles {
      display: flex;
      flex-direction: row;
      align-items: center;
      & * {
        margin: 4px;
      }
    }
  }
  &-buttons {
    display: flex;
    flex-direction: row;
    padding-top: 8px;
    & *:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
