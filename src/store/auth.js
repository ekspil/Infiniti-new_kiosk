import axios from "axios";
const host = "localhost:3000";
const state = () => ({
  token: null,
  user: {},
});

const mutations = {
  setToken(state, info) {
    if (info) {
      const { token, name, id } = info;
      state.token = token;
      state.user.name = name;
      state.user.id = id;
    } else {
      state.token = null;
    }
  },

  setUser(state, user = {}) {
    state.user = user;
  },
};

const actions = {
  async login({ commit }, { login, password }) {
    const result = await axios.post(
      "http://" + host + "/api/terminal/users/auth",
      {
        login,
        password,
      }
    );

    if (result && result.data && result.data.id) {
      commit("setUserData", result.data);
      return true;
    } else {
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
