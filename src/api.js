import Vue from "vue";

const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.kittybot.de/"
    : "http://localhost:6969/";
const CLIENT_ID =
  process.env.NODE_ENV === "production"
    ? "587697058602025011"
    : "695662898919506020";
const OWNER_IDS = ["170939974227591168", "394607709741252621"];
const TOKEN = "token";
const IS_DARK = "IS_DARK";
const SETTING_PROPS = [
  "stream_announcement_channel_id",
  "stream_announcement_message",
  "stream_announcements",

  "announcement_channel_id",

  "request_channel_id",
  "requests_enabled",

  "join_messages_enabled",
  "join_messages",

  "leave_messages_enabled",
  "leave_messages",

  "log_channel_id",
  "log_messages_enabled",

  "nsfw_enabled",

  "inactive_role_id",
  "inactive_duration",

  "dj_role_id",

  "snipes_enabled",
  "snipe_disabled_channels",

  "bot_disabled_channels",
  "bot_ignored_users",

  "self_assignable_roles",
  "self_assignable_role_groups",

  "invite_roles",
];

const token = {
  get get() {
    return localStorage.getItem(TOKEN);
  },
  set set(token) {
    if (token == "") {
      localStorage.removeItem(TOKEN);
    } else {
      localStorage.setItem(TOKEN, token);
    }
  },
};

const theme = {
  get isDark() {
    let dark = localStorage.getItem(IS_DARK);
    if (dark == null) {
      localStorage.setItem(IS_DARK, true);
      return true;
    }
    return dark == "true";
  },
  set setDark(isDark) {
    localStorage.setItem(IS_DARK, `${isDark}`);
  },
};

function post(url, body, options = getOptions()) {
  return Vue.http.post(getURL(url), body, options);
}

function get(url, options = getOptions()) {
  return Vue.http.get(getURL(url), options);
}

function getURL(url) {
  return BACKEND_URL + url;
}

function getOptions() {
  return {
    headers: {
      Authorization: token.get,
    },
  };
}

function areSelfAssignableRolesChanged(setting, initialSetting) {
  return (
    setting.some((settingEntry, i) => {
      return (
        initialSetting[i] === undefined ||
        settingEntry.role != initialSetting[i].role ||
        settingEntry.emote != initialSetting[i].emote
      );
    }) ||
    initialSetting.some((settingEntry, i) => {
      return (
        setting[i] === undefined ||
        settingEntry.role != setting[i].role ||
        settingEntry.emote != setting[i].emote
      );
    })
  );
}

function areInviteRolesChanged() {
  //setting, initialSetting) {
  return false; //setting != initialSetting;
}

function areSettingsChanged(settings, initialSettings) {
  return SETTING_PROPS.some((s) => {
    const setting = settings[s];
    if (s == "self_assignable_roles") {
      if (setting instanceof Array) {
        return areSelfAssignableRolesChanged(setting, initialSettings[s]);
      }
    } else if (s == "invite_roles") {
      if (setting instanceof Array) {
        var bol = areInviteRolesChanged(setting, initialSettings[s]);
        console.log(bol);
        return bol;
      }
    } else if (s == "prefix" && setting != undefined) {
      return setting.length == 1 && setting != initialSettings[s];
    } else {
      return setting != initialSettings[s];
    }
  });
}

export default {
  CLIENT_ID,
  OWNER_IDS,
  post,
  get,
  token,
  theme,
  getURL,
  areSettingsChanged,
  areSelfAssignableRolesChanged,
};
