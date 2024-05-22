import axios from "axios";
const host = "https://infiniti-kiosk-back-ekspil.amvera.io";
const state = () => ({
  data: null,
});

const mutations = {};

const actions = {

  async paySBP({ dispatch, commit }, body) {
    try {
      const result = await axios.post(
        host + "/api/kassa/paySBP/",
        body
      );
      return result.data;
    } catch (e) {
      console.log(dispatch, commit, e);
      throw e;
    }
  },
  async returnSBPPayment({ dispatch, commit }, body) {
    try {
      const result = await axios.post(
        host + "/api/kiosk/cancelSBP",
        body
      );
      console.log(result.data)
      return result.data;
    } catch (e) {
      console.log(dispatch, commit);
      throw e;
    }
  },
  async checkSBPApply({ dispatch, commit }, body) {
    try {
      const result = await axios.post(
        host + "/api/kassa/checkSBP/",
        body
      );
      return result.data;
    } catch (e) {
      console.log(dispatch, commit, e);
      throw e;
    }
  },
  async getAllGroups({ dispatch, commit }, { password }) {
    try {
      const result = await axios.get(
        host + "/api/terminal/groups/get"
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
        host + "/api/kiosk/helpers/get"
      );
      return result.data;
    } catch (e) {
      console.log(dispatch, commit, password);
      throw e;
    }
  },
  async getAllProducts({ dispatch, commit }, { password, archive }) {
    try {
      let url = host + "/api/terminal/products/get";
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
        host + "/api/terminal/mods/get"
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
        host + "/api/terminal/kiosks/get/" + name,
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
