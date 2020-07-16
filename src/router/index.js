import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard/"),
    children: [
      {
        name: "My books",
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
