import { toast } from "vue3-toastify";
import http from "../httpService";

export async function loginUser(userData) {
  try {
    const { data } = await http.post("/api/token/", userData);
    toast.success("ورود موفق");
    return data;
  } catch (error) {
    toast.error("ورود ناموفق");
  }
}
