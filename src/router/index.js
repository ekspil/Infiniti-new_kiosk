import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import store from "@/store";

const routes = [
  {
    path: "/kiosk",
    name: "Kiosk",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Kiosk.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: `history`,
});

router.beforeEach((to, from, next) => {
  let isSecured = true;
  if (to.path.includes("/login")) {
    isSecured = false;
  }
  if (to.path.includes("/kiosk")) {
    isSecured = true;
  }
  const token = store.state.auth.token;


  if (isSecured && !token) {
    return next("/login");
  } else if (!isSecured && token) {
    return next("/kiosk");
  }

  return next();
});

export default router;
