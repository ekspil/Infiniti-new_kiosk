import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth";
import data from "./data";
import kassa from "./kassa";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, data, kassa },
  plugins: [
    new createPersistedState({
      paths: ["auth"],
    }),
  ],
});
