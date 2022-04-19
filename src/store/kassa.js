import axios from "axios";
const host = document.location.host.split(":")[0];

export default {
  state: {},
  actions: {
    async findOrderKassa({ dispatch, commit }, number) {
      try {
        const result = await axios.get(
          "http://" + host + ":3000/api/kassa/getOrder/" + number
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async newOrderKassa({ dispatch, commit }) {
      try {
        const result = await axios.get(
          "http://" + host + ":3000/api/kassa/create"
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async updateOrderKassa({ dispatch, commit }, body) {
      try {
        const result = await axios.post(
          "http://" + host + ":3000/api/kassa/updateOrder/" + body.route + "?printer=" + body.printer,
          body
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async printFiscal({ dispatch, commit }, body) {
      try {
        const result = await axios.post(
          "http://" + host + ":3000/api/kassa/printFiscal/",
          body
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
          "http://" + host + ":3000/api/kassa/payTerminal/",
          body
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async setPayed({ dispatch, commit }, body) {
      try {
        const result = await axios.post(
          "http://" + host + ":3000/api/kassa/setPayed/",
          body
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async setCanceled({ dispatch, commit }, body) {
      try {
        const result = await axios.post(
          "http://" + host + ":3000/api/kassa/setCanceled/",
          body
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async zReport({ dispatch, commit }, body) {
      try {
        const result = await axios.post(
          "http://" + host + ":3000/api/kassa/zReport/",
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
          "http://" + host + ":3000/api/kassa/returnChekPayment/",
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
          "http://" + host + ":3000/api/kassa/xReport/",
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
