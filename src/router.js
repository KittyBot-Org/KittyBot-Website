import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/views/Home";
import About from "./components/views/About";
import Guilds from "./components/views/Guilds";
import Guild from "./components/views/Guild";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/guilds",
    component: Guilds
  },
  {
    path: "/guild/:guildId",
    component: Guild
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
