import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import ExploreView from "../layouts/ExploreView.vue";
import LandingView from "../layouts/LandingView.vue";

import HomeView from "../views/Explore/HomeView.vue";
import AccountView from "../views/Explore/AccountView.vue";

import RegisterView from "../views/Landing/RegisterView.vue";
import LoginView from "../views/Landing/LoginView.vue";
import IndexView from "../views/Landing/IndexView.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingView,
    children: [
      {
        path: "",
        name: "Index",
        component: IndexView,
      },
      {
        path: "register",
        name: "Register",
        component: RegisterView,
      },
      {
        path: "login",
        name: "Login",
        component: LoginView,
      },
    ],
    beforeEnter: (to, from, next) => {
      if (Cookies.get("token")) {
        window.location.href = "/explore";
      } else {
        next();
      }
    },
  },
  {
    path: "/explore",
    name: "Explore",
    component: ExploreView,
    children: [
      {
        path: "",
        name: "Home",
        component: HomeView,
      },
      {
        path: 'account',
        name: "Account",
        component: AccountView
      }
    ],
    beforeEnter: (to, from, next) => {
      if (!Cookies.get("token")) {
        window.location.href = "/";
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
