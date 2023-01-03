import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/register"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login"),
    },
  ],
});
export default router;
