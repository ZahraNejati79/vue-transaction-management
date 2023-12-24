import { toast } from "vue3-toastify";
import http from "../httpService";

export async function signupUser(userData) {
  try {
    const { data } = await http.post("/user/register/", userData);
    toast.success("ورود موفق");
    return data;
  } catch (error) {
    toast.error("ورود ناموفق");
  }
}
