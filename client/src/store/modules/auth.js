import api from "@/helpers/api";
import Cookies from "js-cookie";

const authModule = {
  namespaced: true,
  state: {
    account: Cookies.get("account") ? Cookies.get("account") : {},
    token: Cookies.get("token") ? Cookies.get("token") : "",
  },
  getters: {},
  mutations: {
    setAccount(state, payload) {
      state.account = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async register({ commit }, payload) {
      try {
        const res = await api.post("/auth/register", payload);

        Cookies.set("account", JSON.stringify(res.data.user));
        Cookies.set("token", res.data.token);

        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    },
    async login({ commit }, payload) {
      try {
        const res = await api.post("/auth/login", payload);

        Cookies.set("account", JSON.stringify(res.data.user));
        Cookies.set("token", res.data.token);

        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};

export default authModule;
