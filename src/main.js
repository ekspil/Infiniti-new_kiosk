import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSocketIO from "vue-socket.io";
Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "https://api.rb24.ru",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
    options: { path: "/io" }, //Optional options
  })
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
