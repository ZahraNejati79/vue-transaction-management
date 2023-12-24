import { useUserStore } from "../../store/user";
import { getUser } from "./getUser";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export async function isAuthenticated() {
  try {
    if (!localStorage.getItem(ACCESS_TOKEN_KEY)) return false;

    await getUser();
    return true;

    // Check user authentication asynchronously
  } catch (error) {
    console.error("Authentication error: ", error);

    if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
      // Attempt to refresh the access token
      try {
        const response = await http.get("/api/token/refresh/");
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data);
        return true;
      } catch (refreshError) {
        return false;
        console.error("Token refresh error: ", refreshError);
      }
    }

    return false;
  }
}
