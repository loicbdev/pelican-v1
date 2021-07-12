import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/terms-and-conditions",
      name: "terms-and-conditions",
      component: () => import("../views/TermsAndConditions.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/connection/Signup.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/connection/Login.vue"),
    },
    {
      path: "/infos",
      name: "infos",
      component: () => import("../views/Infos.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/posts",
      name: "thread",
      component: () => import("../views/Thread.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/actualities",
      name: "actualities",
      component: () => import("../views/News.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/posts/:id",
      name: "post",
      component: () => import("../views/posts/UpdatePost.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/actualities/:id",
      name: "actuality",
      component: () => import("../views/actualities/UpdateActuality.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/add/posts",
      name: "newPost",
      component: () => import("../views/posts/NewPost.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/add/actualities",
      name: "newActuality",
      component: () => import("../views/actualities/NewActuality.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/accounts",
      name: "accounts",
      component: () => import("../views/accounts/Accounts.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/accounts/:id",
      name: "account",
      component: () => import("../views/accounts/Account.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "*",
      name: "errorPage",
      component: () => import("../views/ErrorPage.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
