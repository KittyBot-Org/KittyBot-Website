<template>
  <div class="view-dashboard">
    <div v-if="ready" class="view-dashboard-settings">
      <v-expansion-panels v-model="openPanel" multiple>
        <settings-group title="General">
          <entity-setting label="Enable NSFW Commands">
            <v-switch v-model="settings.nsfw_enabled" />
          </entity-setting>

          <v-divider />

          <entity-setting label="DJ Role">
            <role-selector v-model="settings.dj_role_id" :roles="roles" />
          </entity-setting>
        </settings-group>

        <settings-group title="Logs">
          <entity-setting label="Enable Logs">
            <v-switch v-model="settings.log_messages_enabled" />
          </entity-setting>
          <entity-setting label="Log Channel">
            <channel-selector
              v-model="settings.log_channel_id"
              :channels="channels"
            />
          </entity-setting>
        </settings-group>

        <settings-group title="Snipes">
          <entity-setting label="Snipes Globally Enabled">
            <v-switch v-model="settings.snipes_enabled" />
          </entity-setting>
          <entity-setting label="Snipe Disabled Channels">
            <channel-selector
              v-model="settings.snipe_disabled_channels"
              :channels="channels"
              chips
              clearable
              deletable-chips
              multiple
            />
          </entity-setting>
        </settings-group>

        <settings-group title="Ignored Channels/Users">
          <entity-setting label="Ignored Channels">
            <channel-selector
              v-model="settings.bot_disabled_channels"
              :channels="channels"
              chips
              clearable
              deletable-chips
              multiple
            />
          </entity-setting>
          <entity-setting label="Ignored Users">
            <user-selector
              v-model="settings.bot_ignored_users"
              :users="users"
              chips
              clearable
              deletable-chips
              multiple
            />
          </entity-setting>
        </settings-group>

        <settings-group title="Stream Announcements">
          <entity-setting label="Channel">
            <channel-selector
              v-model="settings.stream_announcement_channel_id"
              :channels="channels"
            />
          </entity-setting>
          <entity-setting label="Message">
            <v-textarea
              v-model="settings.stream_announcement_message"
              placeholder="Stream Announcement Message"
            />
            <div slot="description">
              <span>Placeholders:</span>
              <ul>
                <li>${user}</li>
              </ul>
            </div>
          </entity-setting>
          <entity-setting label="Streams"> </entity-setting>
        </settings-group>

        <settings-group title="Announcements">
          <entity-setting label="Announcement Channel">
            <channel-selector
              v-model="settings.announcement_channel_id"
              :channels="channels"
            />
          </entity-setting>

          <v-divider />

          <entity-setting label="Enable Join Messages">
            <v-switch v-model="settings.join_messages_enabled" />
          </entity-setting>
          <entity-setting label="Join Message">
            <v-textarea
              v-model="settings.join_messages"
              placeholder="Join Message"
            />
            <div slot="description">
              <span>Placeholders:</span>
              <ul>
                <li>${random_join_message}</li>
                <li>${inviter}</li>
                <li>${invite_link}</li>
                <li>${invite_code}</li>
                <li>${invite_uses}</li>
                <li>${user}</li>
                <li>${user_tag}</li>
                <li>${name}</li>
              </ul>
            </div>
          </entity-setting>

          <v-divider />

          <entity-setting label="Enable Leave Messages">
            <v-switch v-model="settings.leave_messages_enabled" />
          </entity-setting>
          <entity-setting label="Leave Message">
            <v-textarea
              v-model="settings.leave_messages"
              placeholder="Leave Message"
            />
            <div slot="description">
              <span>Placeholders:</span>
              <ul>
                <li>${random_leave_message}</li>
                <li>${user}</li>
                <li>${user_tag}</li>
                <li>${name}</li>
              </ul>
            </div>
          </entity-setting>
        </settings-group>

        <settings-group title="Roles">
          <entity-setting label="Self-assignable Roles">
            <div v-if="settings.self_assignable_role_groups.length > 0">
              <tbody>
                <tr
                  v-for="(group, i) in settings.self_assignable_role_groups"
                  :key="i"
                >
                  <td tile>
                    <v-avatar :size="32" tile>
                      <v-img :src="getRoleEmote(role)" />
                    </v-avatar>
                  </td>
                  <td :style="{ color: getRoleColor(role) }">
                    {{ getRoleName(role) }}
                  </td>
                  <td>
                    <v-btn icon @click="removeSelfAssignableRole(i)">
                      <v-icon color="red">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </div>
            <div v-else>
              <span>You have no self assignable roles set up yet</span>
            </div>
            <div class="view-dashboard-settings-selfassignable-roles">
              <emote-selector
                v-model="selectedEmote"
                placeholder="Select Emote..."
                :emotes="emotes"
              />
              <role-selector v-model="selectedRoles" :roles="roles" />
              <v-btn
                color="#5c5fea"
                :disabled="isAddButtonDisabled"
                @click="addSelfAssignabelRole()"
              >
                Add
              </v-btn>
            </div>
          </entity-setting>

          <entity-setting label="Invite Roles">
            <v-simple-table v-if="settings.invite_roles.length > 0">
              <template>
                <tbody>
                  <tr
                    v-for="invite in settings.invite_roles"
                    :key="invite.code"
                  >
                    <td>
                      {{ invite.code }}
                    </td>
                    <td>
                      {{
                        invite.roles.map(
                          (roleId) => roles.find((r) => r.id == roleId).name
                        )
                      }}
                    </td>
                    <td>
                      <v-btn icon @click="removeInviteRoles(invite.code)">
                        <v-icon color="red">delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div v-else>
              <span>You have no invite roles added yet</span>
            </div>
            <div class="view-dashboard-settings-selfassignable-roles">
              <v-autocomplete
                v-model="selectedInvite"
                placeholder="Select Invite..."
                :items="getInvites"
                no-data-text="No Invites found"
              >
                <template v-slot:item="{ item }">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
              <role-selector
                v-model="selectedRoles"
                :roles="getRolesForInvites"
                clearable
                multiple
              />
              <v-btn
                color="#5c5fea"
                :disabled="isInviteRolesAddButtonDisabled"
                @click="addInviteRoles()"
              >
                Add
              </v-btn>
            </div>
          </entity-setting>
        </settings-group>
      </v-expansion-panels>
    </div>
    <div class="view-dashboard-buttons">
      <v-snackbar v-model="snackbar" :color="snackbarColor">
        {{ result }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>
      <v-btn color="error" text :disabled="isSaveAndResetButtonDisabled">
        Reset
      </v-btn>
      <v-btn
        color="success"
        :loading="saveLoading"
        :disabled="isSaveAndResetButtonDisabled"
        @click="save"
      >
        Save
      </v-btn>
    </div>
  </div>
</template>

<script>
import EntitySetting from "../components/EntitySetting";
import SettingsGroup from "../components/SettingsGroup";
import RoleSelector from "../components/RoleSelector";
import ChannelSelector from "../components/ChannelSelector";
import UserSelector from "../components/UserSelector";
import EmoteSelector from "../components/EmoteSelector";
import { cloneDeep } from "lodash";
import API from "../api";

export default {
  name: "ViewDashboard",

  components: {
    EntitySetting,
    SettingsGroup,
    RoleSelector,
    ChannelSelector,
    UserSelector,
    EmoteSelector,
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
      users: [],
      invites: [],
      selectedRole: null,
      selectedEmote: null,
      selectedInvite: null,
      selectedRoles: [],
      saveLoading: false,
      color: "#f5f5f5",
      snackbar: false,
      snackbarColor: "",
      result: "",
    };
  },

  computed: {
    isAddButtonDisabled() {
      return this.selectedRole == null || this.selectedEmote == null;
    },
    isInviteRolesAddButtonDisabled() {
      return this.selectedInvite == null || this.selectedRoles.length == 0;
    },
    isSaveAndResetButtonDisabled() {
      return !API.areSettingsChanged(this.settings, this.initialSettings);
    },
    getInvites() {
      return this.invites.map((c) => {
        return {
          text: c.code,
          value: c.code,
        };
      });
    },
    getRolesForInvites() {
      if (this.selectedInvite == null) {
        return [];
      }
      const inviteRoles = this.settings.invite_roles.find(
        (i) => i.code == this.selectedInvite
      );
      const roles = inviteRoles == undefined ? [] : inviteRoles.roles;
      return this.roles.filter((r) => !roles.includes(r.value));
    },
    guildId() {
      return this.$route.params.guildId;
    },
  },

  created() {
    if (API.token.get == null) {
      return;
    }
    Promise.all([
      API.get(`guilds/${this.guildId}/channels`),
      API.get(`guilds/${this.guildId}/emotes`),
      API.get(`guilds/${this.guildId}/users`),
      API.get(`guilds/${this.guildId}/roles`),
      API.get(`guilds/${this.guildId}/invites`),
      API.get(`guilds/${this.guildId}/settings`),
    ]).then(
      (responses) => {
        responses[0].body.channels.forEach((e) => {
          this.channels.push({
            name: e.name,
            id: e.id,
          });
        });
        responses[1].body.emotes.forEach((e) => {
          this.emotes.push({
            id: e.id,
            name: e.name,
            url: e.url,
          });
        });
        responses[2].body.users.forEach((e) => {
          this.users.push({
            id: e.id,
            name: e.name,
            url: e.url,
            color: e.color,
          });
        });
        responses[3].body.roles.forEach((e) => {
          this.roles.push({
            id: e.id,
            name: e.name,
            color: e.color,
          });
        });
        responses[4].body.invites.forEach((e) => {
          this.invites.push({
            code: e.code,
            userId: e.user_id,
            uses: e.uses,
          });
        });
        this.initialSettings = responses[5].body;
        this.settings = cloneDeep(this.initialSettings);
        this.ready = true;
      },
      (error) => {
        this.addError(error);
      }
    );
  },

  methods: {
    addError(response) {
      this.$emit("error", response);
    },
    getRoleEmote(sRole) {
      let emote = this.emotes.find((e) => e.id == sRole.emote);
      return emote === undefined ? "../assets/loading.png" : emote.url;
    },
    getRoleName(sRole) {
      let role = this.roles.find((r) => r.id == sRole.role);
      return role === undefined ? "loading..." : role.name;
    },
    getRoleColor(sRole) {
      let role = this.roles.find((r) => r.id == sRole.role);
      return role === undefined ? "" : role.color;
    },
    removeSelfAssignableRole(roleIndex) {
      this.settings.self_assignable_roles.splice(roleIndex, 1);
    },
    addSelfAssignabelRole() {
      this.settings.self_assignable_roles.push({
        role: this.selectedRole,
        emote: this.selectedEmote,
      });
      this.selectedRole = null;
      this.selectedEmote = null;
    },
    getInviteRoles(code) {
      return this.settings.invite_roles.find((i) => i.code == code);
    },
    addInviteRoles() {
      const inviteRoles = this.getInviteRoles(this.selectedInvite);
      if (inviteRoles == undefined) {
        this.settings.invite_roles.push({
          code: this.selectedInvite,
          roles: this.selectedRoles,
        });
      } else {
        inviteRoles.roles.push(...this.selectedRoles);
      }
      this.selectedInvite = null;
      this.selectedRoles = [];
    },
    removeInviteRoles(code) {
      var i = this.settings.invite_roles.findIndex((i) => i.code == code);
      this.settings.invite_roles.splice(i, 1);
    },
    save() {
      this.saveLoading = true;
      API.post(`guilds/${this.guildId}/settings`, this.settings).then(
        () => {
          let settings = cloneDeep(this.settings);
          Object.keys(settings).forEach((s) => {
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
          this.saveLoading = false;
          this.snackbar = true;
          this.snackbarColor = "success";
          this.result = "Updated settings!";
        },
        () => {
          this.saveLoading = false;
          this.snackbar = true;
          this.snackbarColor = "error";
          this.result = "Failed to update settings!";
        }
      );
    },
    reset() {
      this.resetDialog = false;
      this.settings = cloneDeep(this.initialSettings);
      this.selectedRole = null;
      this.selectedEmote = null;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.view-dashboard {
  display: flex;
  flex-direction: column;
  padding-bottom: 84px;
  .theme--light &-buttons {
    background-color: #ffffff;
  }
  .theme--dark &-buttons {
    background-color: #272727;
  }
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
    z-index: 1;
    position: fixed;
    bottom: 0px;
    right: 0px;
    left: 0px;
    justify-content: flex-end;
    padding: 16px;
    & *:not(:last-child) {
      margin-right: 16px;
    }
  }
}
</style>
