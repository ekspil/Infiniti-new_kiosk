import axios from "axios";
const host = "infiniti-kiosk-back-ekspil.amvera.io";
const state = () => ({
  token: null,
  user: {},
});

const mutations = {
  setToken(state, info) {
    if (info) {
      const { token, name, id, uid} = info;
      state.token = token;
      state.name = name;
      state.id = id;
      state.uid = uid;
    } else {
      state.token = null;
      state.name = null;
      state.id = null;
      state.uid = null;
    }
  },

  setUser(state, user = {}) {
    state.user = user;
  },
};

const actions = {
  async login({ commit }, { name, key }) {
    try {
      const result = await axios.post(
        "https://" + host + "/api/terminal/kiosks/auth",
        {
          name,
          key,
        }
      );

      if (result && result.data && result.data.token) {
        commit("setToken", result.data);
        return true;
      } else {
        return false;
      }
    }
    catch (e) {
      console.log(e)
      return false;
    }

  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
