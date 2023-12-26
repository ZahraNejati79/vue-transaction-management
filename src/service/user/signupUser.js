import { toast } from "vue3-toastify";
import http from "../httpService";

import router from "../../router/router";
export async function signupUser(userData) {
  try {
    const { data } = await http.post("/user/", userData);
    router.push("/login");
    toast.success("ثبت نام موفق");
    return data;
  } catch (error) {
    toast.error("ثبت نام ناموفق");
  }
}
