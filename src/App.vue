<template>
  <v-app>
    <v-app-bar app clipped-left :color="getAppBarColor">
      <v-app-bar-nav-icon
        v-if="isDashBoard || isMobile"
        @click="drawer = !drawer"
      />
      <v-avatar v-else tile>
        <v-img src="./assets/KittyBlink.gif" />
      </v-avatar>

      <div v-if="!isMobile" class="nav">
        <router-link
          v-for="n of nav"
          :key="n.name"
          class="nav"
          :to="n.to"
          exact
          >{{ n.name }}</router-link
        >
        <a
          class="nav"
          target="_blank"
          href="https://github.com/KittyBot-Org/KittyBot"
          >GitHub
        </a>
      </div>

      <v-spacer />

      <v-autocomplete
        v-if="isDashBoard"
        class="guild-selector"
        :class="{ 'small-mobile': isSmallMobile }"
        v-model="selectedGuild"
        placeholder="Select Guild..."
        :single-line="true"
        :items="guilds"
        item-value="id"
        item-text="name"
        no-data-text="No mutal guilds found"
        @change="selectGuild"
      >
        <template v-slot:item="{ item }">
          <template>
            <v-list-item-avatar>
              <guild-icon
                :icon="item.icon"
                :alt="`${item.name} profile`"
                :text="item.name"
                :size="38"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </template>
        <template v-slot:selection="{ item }">
          <guild-icon
            :icon="item.icon"
            :alt="`${item.name} profile`"
            :text="item.name"
            :size="36"
            style="margin-right: 8px; margin-bottom: 4px"
          />
          <span style="margin-bottom: 4px">{{ item.name }}</span>
        </template>
      </v-autocomplete>

      <v-btn icon @click="switchTheme">
        <v-icon>brightness_4</v-icon>
      </v-btn>
      <v-menu v-if="loggedIn" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <guild-icon
              :icon="icon"
              :alt="`${name} profile`"
              :text="name"
              :size="38"
            />
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout()">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-else
        :loading="loading"
        :text="true"
        :color="getLoginButtonColor"
        :href="api.getURL('discord_login')"
        @click="loading = true"
      >
        Login
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-if="isDashBoard || isMobile"
      v-model="drawer"
      mobile-breakpoint="960"
      clipped
      app
    >
      <v-list shaped nav>
        <v-list-item-group v-if="isMobile" style="padding-bottom: 8px">
          <v-list-item v-for="n of nav" :key="n.name" :to="n.to">
            <v-list-item-avatar tile>
              <v-icon :size="38">
                {{ n.icon }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ n.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            href="https://github.com/TopiSenpai/KittyBot"
            target="_blank"
          >
            <v-list-item-avatar tile>
              <v-icon>code</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>GitHub</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item v-if="!isMobile" :to="`/guilds`" exact>
          <v-list-item-avatar tile>
            <v-icon>list</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Guilds</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isAdmin" to="/admin/dashboard" exact>
          <v-list-item-avatar tile>
            <v-icon>supervisor_account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="guild in guilds"
          :key="guild.id"
          :to="`/guilds/${guild.id}/dashboard`"
        >
          <v-list-item-avatar tile>
            <guild-icon
              :icon="guild.icon"
              :alt="`${guild.name} guild`"
              :text="guild.name"
              :size="40"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ guild.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-alert v-if="isAlertVisible" dismissible type="error">
        <template v-slot:close="">
          <v-btn icon @click="cleanErrors">
            <v-icon>cancel</v-icon>
          </v-btn>
        </template>
        <span v-for="(error, i) in errors" :key="i">
          {{ error }}
          <br />
        </span>
      </v-alert>
      <router-view
        class="dashboard-navigation-view"
        :guilds="guilds"
        :logged-in="loggedIn"
        :key="$route.path"
        @error="addError"
      />
    </v-main>
  </v-app>
</template>

<script>
import GuildIcon from "./components/GuildIcon";
import API from "./api";

export default {
  name: "App",

  data() {
    return {
      nav: [
        {
          name: "Home",
          icon: "home",
          to: "/",
        },
        {
          name: "Dashboard",
          icon: "dashboard",
          to: "/guilds",
        },
        {
          name: "Features",
          icon: "star",
          to: "/features",
        },
        {
          name: "Commands",
          icon: "comment",
          to: "/commands",
        },
        {
          name: "Privacy",
          icon: "security",
          to: "/privacy",
        },
      ],
      alert: true,
      errors: [],
      drawer: null,
      api: API,
      loading: false,
      loggedIn: false,
      name: "",
      id: "",
      icon: null,
      guilds: [],
      selectedGuild: -1,
    };
  },

  beforeUpdate() {
    this.selectedGuild = this.$route.params.guildId;
  },

  components: {
    GuildIcon,
  },

  created() {
    this.$vuetify.theme.dark = API.theme.isDark;
    if (
      this.$route.query.code != undefined &&
      this.$route.query.state != undefined
    ) {
      API.post(
        "login",
        { code: this.$route.query.code, state: this.$route.query.state },
        {}
      ).then(
        (response) => {
          this.$router.replace({ query: null });
          if (response.status == 200) {
            API.authKey.set = response.body.key;
            this.loadData();
          } else {
            this.addError(response);
          }
        },
        (error) => {
          this.addError(error);
        }
      );
    } else {
      this.loadData();
    }
  },

  computed: {
    isAdmin() {
      return API.ADMIN_IDS.includes(this.id);
    },
    isDark() {
      return API.theme.isDark;
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    isSmallMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    isDashBoard() {
      return !(
        this.$route.fullPath == "/" ||
        this.$route.fullPath == "/features" ||
        this.$route.fullPath == "/commands" ||
        this.$route.fullPath == "/privacy"
      );
    },
    getAppBarColor() {
      return this.isDashBoard ? "" : "#5c5fea";
    },
    getLoginButtonColor() {
      return this.isDashBoard ? "#5c5fea" : "";
    },
    isAlertVisible() {
      return this.errors.length > 0;
    },
    shortName() {
      if (this.name.includes(" ")) {
        return this.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substr(0, 2);
      } else {
        return name.substr(0, 2);
      }
    },
  },

  methods: {
    selectGuild(guildId) {
      if (guildId != undefined) {
        this.$router.push({ path: `/guilds/${guildId}/dashboard` });
      }
    },
    cleanErrors() {
      this.errors = [];
    },
    addError(response) {
      this.errors.push(
        `${response.url}: ${response.status}: ${
          response.body.error == undefined
            ? response.statusText
            : response.body.error
        }`
      );
    },
    switchTheme() {
      let isDark = !API.theme.isDark;
      API.theme.setDark = isDark;
      this.$vuetify.theme.dark = isDark;
    },
    loadData() {
      if (API.authKey.get != null) {
        API.get("user/me").then(
          (response) => {
            this.loggedIn = response.status == 200;
            this.icon = response.body.icon;
            this.name = response.body.name;
            this.id = response.body.id;
            this.guilds = response.body.guilds;
          },
          (error) => {
            this.addError(error);
          }
        );
      }
    },
    logout() {
      API.post("logout").then();
      this.loading = true;
      API.authKey.set = "";
      this.loggedIn = false;
      this.icon = null;
      this.name = "";
      this.guilds = [];
      this.loading = false;
      this.id = "";
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less">
@import "./style/style.less";

.guild-selector {
  width: min-content;
  .small-mobile {
    width: 100%;
  }
  .v-text-field__details {
    display: none;
  }
}

.v-application {
  .font-default();
}

.dashboard-navigation-view {
  padding: 16px;
}

.nav .dark {
  color: #ffffff !important;
}

html {
  overflow-y: auto !important;
}
</style>
