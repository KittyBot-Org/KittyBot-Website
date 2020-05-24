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
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/guilds",
    name: "Guilds",
    component: Guilds
  },
  {
    path: "/guild/:guildId",
    name: "Guild",
    component: Guild
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
