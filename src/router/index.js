import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/Login")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Auth/Register")
  },
  {
    path: "/",
    component: () => import("../views/Dashboard/"),
    children: [
      {
        name: "Home",
        path: "/",
        component: () => import("../views/Dashboard/Home")
      },
      {
        name: "My books",
        path: "/books",
        component: () => import("../views/Dashboard/Books")
      },
      {
        name: "Loans",
        path: "/loans",
        component: () => import("../views/Dashboard/Loans")
      },
      { path: "*", component: () => import("../views/Dashboard/Home") }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
