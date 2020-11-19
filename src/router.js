import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home";
import Commands from "./views/Commands";
import Login from "./views/Login";
import Privacy from "./views/Privacy";
import Guilds from "./views/Guilds";
import Admin from "./views/Admin";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/privacy",
    component: Privacy,
    meta: {
      title: "Privacy",
    },
  },
  {
    path: "/commands",
    component: Commands,
    meta: {
      title: "Commands",
    },
  },
  {
    path: "/admin/dashboard",
    component: Admin,
    meta: {
      title: "Admin",
    },
  },
  {
    path: "/guilds/",
    component: Guilds,
    meta: {
      title: "Guilds",
    },
  },
  {
    path: "/guilds/:guildId/dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
    },
  },
  {
    path: "*",
    component: NotFound,
    meta: {
      title: "NotFound",
    },
  },
];

const router = new VueRouter({
  history: true,
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = `KittyBot - ${to.meta.title}`;
  });
});

export default router;
