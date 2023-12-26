import { toast } from "vue3-toastify";
import http from "../httpService";
import router from "../../router/router";
export async function loginUser(userData) {
  try {
    const { data } = await http.post("/token/", userData);
    router.push("/");
    toast.success("ورود موفق");
    return data;
  } catch (error) {
    toast.error("ورود ناموفق");
  }
}
