import { createStore } from "vuex";
import authModule from "./modules/auth";

export default createStore({
  state: {
    loading: false,
    toast: {
      show: false,
      type: "",
      msg: "",
    },
  },
  getters: {},
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setToast(state, payload) {
      state.toast = payload

      setTimeout(() => {
        state.toast.show = false
        state.toast.type = ''
        state.toast.msg = ''
      }, 4000)
    }
  },
  actions: {},
  modules: {
    auth: authModule,
  },
});
