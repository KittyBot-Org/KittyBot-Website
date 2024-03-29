<template>
  <div class="view-home">
    <div class="view-home-header">
      <v-img
        alt="KittyBot Logo"
        :max-width="340"
        src="../assets/KittyBlink.gif"
      />
      <div class="view-home-header-title">
        <span class="view-home-header-title-title">KittyBot</span>

        <span class="view-home-header-title-subtitle"
          >Here to manage your Discord</span
        >
        <invite-button />
      </div>
    </div>
    <div class="view-home-cards">
      <div v-for="(card, i) in cards" :key="i" class="view-home-cards-card">
        <v-icon class="view-home-cards-card-icon" :size="48" color="white">{{
          card.icon
        }}</v-icon>
        <span class="view-home-cards-card-title">{{ card.title }} </span>
        <p class="view-home-cards-card-text">{{ card.text }}</p>
      </div>
    </div>

    <div v-if="ready" class="view-home-infos">
      <div v-for="(inf, i) in infos" :key="i" class="view-home-infos-info">
        <animated-int
          class="view-home-infos-info-value"
          :value="info[inf.value]"
        />
        <span class="view-home-infos-info-name">{{ inf.name }}</span>
      </div>
    </div>

    <div class="view-home-botlists">
      <a
        class="view-home-botlists-botlist"
        href="https://api.kittybot.de/discord_invite"
        target="_blank"
      >
        <img src="https://discord.com/api/guilds/608506410803658753/widget.png?style=banner3" />
      </a>
      <a
        v-for="(botlist, i) in botlists"
        :key="i"
        class="view-home-botlists-botlist"
        target="_blank"
        :href="botlist.url"
      >
        <img
          :src="botlist.widget"
          :title="`Visit KittyBot listed on ${botlist.name}!`"
          :alt="`${botlist.name} KittyBot`"
        />
      </a>
    </div>
  </div>
</template>

<script>
import InviteButton from "../components/InviteButton";
import AnimatedInt from "../components/AnimatedInt.vue";
import API from "../api";

export default {
  name: "ViewHome",

  data() {
    const botId = "587697058602025011";
    return {
      ready: false,
      info: {},
      infos: [
        {
          name: "Total Shards",
          value: "shards",
        },
        {
          name: "Total Servers",
          value: "guilds",
        },
        {
          name: "Total Members",
          value: "users",
        },
        {
          name: "Active Audio players",
          value: "players",
        },
        {
          name: "Available Commands",
          value: "commands",
        },
      ],
      cards: [
        {
          icon: "how_to_reg",
          title: "Easy to use",
          text:
            "KittyBot uses the new slash commands and is easier to use than ever",
        },
        {
          icon: "money_off",
          title: "100% Free",
          text: "KittyBot is 100% free",
        },
        {
          icon: "headset",
          title: "High Quality Audio",
          text:
            "KittyBot provides high quality audio with custom filter support",
        },
        {
          icon: "flash_on",
          title: "Feature Rich",
          text: "KittyBot can do a lot of different things",
        },
      ],
      botlists: [
        {
          name: "top.gg",
          url: `https://top.gg/bot/${botId}`,
          widget: `https://top.gg/api/widget/${botId}.svg`,
        },
        {
          name: "discord.boats",
          url: `https://discord.boats/bot/${botId}`,
          widget: `https://discord.boats/api/widget/${botId}`,
        },
        {
          name: "discordlist.space",
          url: `https://discordlist.space/bot/${botId}`,
          widget: `https://api.discordlist.space/v2/bots/${botId}/widget?background=7289da&radius=8`,
        },
        {
          name: "botsfordiscord.com",
          url: `https://botsfordiscord.com/bots/${botId}`,
          widget: `https://botsfordiscord.com/api/bot/${botId}/widget?theme=dark`,
        },
      ],
    };
  },

  created() {
    API.get("info").then(
      (response) => {
        this.info = response.body;
        this.ready = true;
      },
      (error) => {
        this.addError(error);
      }
    );
  },

  methods: {
    addError(response) {
      this.errors.push(
        `${response.url}: ${response.status}: ${
          response.body.error == undefined
            ? response.statusText
            : response.body.error
        }`
      );
    },
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },

  components: {
    InviteButton,
    AnimatedInt,
  },
};
</script>

<style lang="less" scoped>
@import "../style/style.less";

.view-home {
  display: flex;
  flex-direction: column;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    flex-wrap: wrap;
    &-title {
      display: flex;
      flex-direction: column;
      font-weight: bolder;
      padding: 16px;
      &-title {
        .font-bungee;
        color: @primary;
        font-size: 60px;
      }
      &-subtitle {
        font-size: 26px;
      }
    }
  }
  &-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    justify-items: center;
    background-color: #5c5fea;
    color: white;
    border-radius: 8px;
    &-card {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 16px;
      width: 235px;
      &-icon {
        padding: 8px;
      }
      &-title {
        font-weight: bolder;
        font-size: 22px;
      }
      &-text {
        font-size: 16px;
        opacity: 0.8;
      }
    }
  }
  &-infos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 32px;
    &-info {
      display: flex;
      flex-direction: column;
      padding: 8px;
      &-value {
        font-size: 32px;
        font-weight: bolder;
        color: #5c5fea;
      }
    }
  }
  &-botlists {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    gap: 32px;
    padding: 32px;
    &-botlist,
    &-botlist img {
      border-radius: 8px;
      height: 150px;
    }
  }
}
</style>
