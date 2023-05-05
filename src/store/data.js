import axios from "axios";
const host = "terminal-api.rb24.ru";
const state = () => ({
  data: null,
});

const mutations = {};

const actions = {
  async getAllGroups({ dispatch, commit }, { password }) {
    try {
      const result = await axios.get(
        "https://" + host + "/api/terminal/groups/get"
      );
      return result.data;
    } catch (e) {
      console.log(dispatch, commit, password);
      throw e;
    }
  },
  async getAllHelpers({ dispatch, commit }, { password }) {
    try {
      const result = await axios.get(
        "https://" + host + "/api/kiosk/helpers/get"
      );
      return result.data;
    } catch (e) {
      console.log(dispatch, commit, password);
      throw e;
    }
  },
  async getAllProducts({ dispatch, commit }, { password, archive }) {
    try {
      let url = "https://" + host + "/api/terminal/products/get";
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
        "https://" + host + "/api/terminal/mods/get"
      );
      return result.data;
    } catch (e) {
      console.log(dispatch, commit, password);
      throw e;
    }
  },
  async getKiosk({ dispatch, commit }, { name, key }) {
    try {
      const headers = {
        key,
      };

      const result = await axios.get(
        "https://" + host + "/api/terminal/kiosks/get/" + name,
        {
          headers,
        }
      );
      return result.data;
    } catch (e) {
      console.log(dispatch, commit, key);
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
