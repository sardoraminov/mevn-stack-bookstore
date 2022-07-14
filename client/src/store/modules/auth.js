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
      commit("setLoading", true, { root: true });
      try {
        const res = await api.post("/auth/register", payload);

        if (res.data.status === "bad") {
          commit("setLoading", false, { root: true });
          commit(
            "setToast",
            { show: true, type: "error", msg: res.data.msg },
            { root: true }
          );
        } else {
          Cookies.set("account", JSON.stringify(res.data.user));
          Cookies.set("token", res.data.token);

          commit("setLoading", false, { root: true });
          commit(
            "setToast",
            { show: true, type: "success", msg: res.data.msg },
            { root: true }
          );
          setTimeout(() => {
            window.location.href = "/explore";
          }, 2000);
        }
      } catch (error) {
        commit("setLoading", false, { root: true });
        commit(
          "setToast",
          { show: true, type: "error", msg: error.message },
          { root: true }
        );
        console.log(error.message);
      }
    },
    async login({ commit }, payload) {
      commit("setLoading", true, { root: true });

      try {
        const res = await api.post("/auth/login", payload);
        if (res.data.status === "bad") {
          commit("setLoading", false, { root: true });
          commit(
            "setToast",
            { show: true, type: "error", msg: res.data.msg },
            { root: true }
          );
        } else {
          Cookies.set("account", JSON.stringify(res.data.user));
          Cookies.set("token", res.data.token);

          commit("setLoading", false, { root: true });
          commit(
            "setToast",
            { show: true, type: "success", msg: res.data.msg },
            { root: true }
          );
          setTimeout(() => {
            window.location.href = "/explore";
          }, 2000);
        }
      } catch (error) {
        commit(
          "setToast",
          { show: true, type: "error", msg: error.message },
          { root: true }
        );
        commit("setLoading", false, { root: true });
        console.log(error.message);
      }
    },
  },
};

export default authModule;
