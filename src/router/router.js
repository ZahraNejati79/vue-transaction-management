import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import AboutPage from "../pages/AboutPage.vue";
import ReportsPage from "../pages/ReportsPage.vue";
import CategoryPage from "../pages/CategoryPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import SignupPage from "../pages/SignupPage.vue";
import { useUserStore } from "../store/user";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/reports",
    name: "reports",
    component: ReportsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/category",
    name: "category",
    component: CategoryPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },

  { path: "/login", name: "login", component: LoginPage },
  { path: "/signup", name: "signup", component: SignupPage },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const user = useUserStore();
  await user.isAuthenticate();

  if (to.meta.requiresAuth) {
    if (!user.isAuthenticatedUser) {
      // User is not authenticated, redirect to login page
      next("/login");
    } else {
      // User is authenticated, proceed to the requested route
      next();
    }
  } else {
    // Route does not require authentication, proceed to the requested route
    next();
  }

  // Check if the route requires authentication
  // if (to.meta.requiresAuth) {
  //   try {
  //     const authenticated = await user.isAuthenticated();

  //     if (!authenticated) {
  //       // User is not authenticated, redirect to login page
  //       next("/login");
  //     } else {
  //       // User is authenticated, proceed to the requested route
  //       next();
  //     }
  //   } catch (error) {
  //     // Handle authentication check error
  //     console.error("Authentication check error:", error);
  //     // You might want to redirect to an error page or handle it differently
  //     // next("/error");
  //   }
  // } else {
  //   // Route does not require authentication, proceed to the requested route
  //   next();
  // }
});
export default router;
