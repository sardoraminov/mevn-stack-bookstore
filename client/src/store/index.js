import { createStore } from "vuex";
import authModule from "./modules/auth";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule
  },
});
