import axios from "axios";
const host = "localhost:3000";
const state = () => ({
  token: null,
  user: {},
});

const mutations = {
  setToken(state, info) {
    if (info) {
      const { token, name, id,} = info;
      state.token = token;
      state.name = name;
      state.id = id;
    } else {
      state.token = null;
      state.name = null;
      state.id = null;
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
        "http://" + host + "/api/terminal/kiosks/auth",
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
