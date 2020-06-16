import Vue from "vue";
import VueRouter from "vue-router";
import NormalNavigation from "./views/NormalNavigation";
import Home from "./views/Home";
import Features from "./views/Features";
import Commands from "./views/Commands";
import About from "./views/About";
import DashboardNavigation from "./views/DashboardNavigation";
import Guilds from "./views/Guilds";
import Admin from "./views/Admin";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: NormalNavigation,
    children: [
      {
        path: "/",
        component: Home
      },
      {
        path: "/features",
        component: Features
      },
      {
        path: "/commands",
        component: Commands
      },
      {
        path: "/about",
        component: About
      }
    ]
  },
  {
    path: "/guilds",
    component: DashboardNavigation,
    children: [
      {
        path: "/",
        component: Guilds
      },
      {
        path: "admin/dashboard",
        component: Admin
      },
      {
        path: ":guildId/dashboard",
        component: Dashboard
      }
    ]
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
