import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/views/Home";
import About from "./components/views/About";
import Guilds from "./components/views/Guilds";
import Guild from "./components/views/Guild";
import NotFound from "./components/views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/guilds",
    name: "guilds",
    component: Guilds,
  },
  {
    path: "/guilds/:guildId",
    name: "guild",
    component: Guild
  },
  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  history: true,
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
