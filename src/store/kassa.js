import axios from "axios";
const host = "api.rb24.ru"
const localhost = "localhost:3000"

export default {
  namespaced: true,
  state: {},
  actions: {
    async findOrderKassa({ dispatch, commit }, number) {
      try {
        const result = await axios.get(
          "https://" + host + "/api/kassa/getOrder/" + number
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async payTerminal({ dispatch, commit }, body) {
      try {
        const result = await axios.post(
          "http://" + localhost + "/api/kassa/payTerminal/",
          body
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit, e);
        throw e;
      }
    },
    async zReport({ dispatch, commit }, body) {
      try {
        const result = await axios.post(
          "https://" + host + "/api/kassa/zReport/",
          body
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async returnChekPayment({ dispatch, commit }, body) {
      try {
        const result = await axios.post(
          "http://" + localhost + "/api/kassa/returnChekPayment/",
          body
        );
        console.log(result.data)
        return result.data;
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async xReport({ dispatch, commit }, body) {
      try {
        const result = await axios.post(
          "https://" + host + "/api/kassa/xReport/",
          body
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    }
  }
};
