// Import necessary dependencies
import { defineStore } from "pinia";
import { loginUser } from "../service/user/loginUser";
import { signupUser } from "../service/user/signupUser";
import { getUser } from "../service/user/getUser";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
// Define the user store
export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticatedUser: true, // Set initial state to true
    user: "",
  }),

  actions: {
    async login({ username, password }) {
      try {
        const tokenData = await loginUser({
          username,
          password,
        });

        localStorage.setItem("accessToken", tokenData.access);
        localStorage.setItem("refreshToken", tokenData.refresh);

        // Update isAuthenticated state to true
        this.isAuthenticatedUser = true;

        this.user = username;
        return this.user;
      } catch (error) {
        throw error;
      }
    },

    async signup({ username, password }) {
      try {
        const userdata = await signupUser({
          username,
          password,
        });

        this.user = userdata.username;
      } catch (error) {
        throw error;
      }
    },
    async logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.isAuthenticatedUser = false;
      this.user = null;
    },
    async isAuthenticate() {
      if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
        this.isAuthenticatedUser = false;
      } else {
        getUser()
          .then(() => (this.isAuthenticatedUser = true))
          .catch(() => {
            if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
              http
                .get("/token/refresh/")
                .then((response) => {
                  localStorage.setItem(ACCESS_TOKEN_KEY, response.data);
                  this.isAuthenticatedUser = true;
                })
                .catch(() => this.logout());
            } else {
              this.logout();
            }
          });
      }

      // try {
      //   if (!localStorage.getItem(ACCESS_TOKEN_KEY)) {
      //     // Update isAuthenticated state to false
      //     this.isAuthenticatedUser = false;
      //     return false;
      //   }

      //   await getUser();

      //   // Update isAuthenticated state to true
      //   this.isAuthenticatedUser = true;

      //   // Check user authentication asynchronously
      //   return true;
      // } catch (error) {
      //   console.error("Authentication error: ", error);

      //   if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
      //     // Attempt to refresh the access token
      //     try {
      //       const response = await http.get("/api/token/refresh/");
      //       localStorage.setItem(ACCESS_TOKEN_KEY, response.data);

      //       // Update isAuthenticated state to true
      //       this.isAuthenticatedUser = true;

      //       return true;
      //     } catch (refreshError) {
      //       // Update isAuthenticated state to false
      //       this.isAuthenticatedUser = false;

      //       console.error("Token refresh error: ", refreshError);
      //       return false;
      //     }
      //   }

      //   // Update isAuthenticated state to false
      //   this.isAuthenticatedUser = false;
      //   return false;
      // }
    },
  },
});
