import Vue from "vue";

const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.anteiku.de/"
    : "http://localhost:6969/";
const AUTH_KEY = "AUTH_KEY";
const SETTING_PROPS = [
  "prefix",
  "welcome_message_enabled",
  "welcome_message",
  "welcome_channel_id",
  "nsfw_enabled",
  "self_assignable_roles"
];

const authKey = {
  get get() {
    return localStorage.getItem(AUTH_KEY);
  },
  set set(key) {
    if (key == undefined) {
      localStorage.removeItem(AUTH_KEY);
    } else {
      localStorage.setItem(AUTH_KEY, key);
    }
  }
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
      Authorization: authKey.get
    }
  };
}

function areSettingsChanged(settings, initialSettings) {
  return SETTING_PROPS.some(s => {
    const setting = settings[s];
    if (s == "self_assignable_roles" && setting instanceof Array) {
      return setting.some((settingEntry, i) => {
        return (
          initialSettings[s][i] === undefined ||
          settingEntry.role != initialSettings[s][i].role ||
          settingEntry.emote != initialSettings[s][i].emote
        );
      });
    } else {
      return setting != initialSettings[s];
    }
  });
}

export default {
  post,
  get,
  authKey,
  getURL,
  areSettingsChanged
};
