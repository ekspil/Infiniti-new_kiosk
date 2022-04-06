import axios from "axios";
const host = "localhost:3000";
const state = () => ({
  data: null,
});

const mutations = {};

const actions = {
  async getAllGroups({ dispatch, commit }, { password }) {
    try {
      const result = await axios.get(
        "http://" + host + "/api/terminal/groups/get"
      );
      return result.data;
    } catch (e) {
      console.log(dispatch, commit, password);
      throw e;
    }
  },
  async getAllProducts({ dispatch, commit }, { password, archive }) {
    try {
      let url = "http://" + host + "/api/terminal/products/get";
      if (archive) {
        url = url + "?archive=1";
      }
      const result = await axios.get(url);
      return result.data;
    } catch (e) {
      console.log(dispatch, commit, password);
      throw e;
    }
  },
  async getAllMods({ dispatch, commit }, { password }) {
    try {
      const result = await axios.get(
        "http://" + host + "/api/terminal/mods/get"
      );
      return result.data;
    } catch (e) {
      console.log(dispatch, commit, password);
      throw e;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
