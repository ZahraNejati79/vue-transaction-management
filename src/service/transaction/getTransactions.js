import { toast } from "vue3-toastify";
import http from "../httpService";

export async function getTransactions(group) {
  // group ? in--> income , out-->expense
  try {
    if (group) {
      const { data } = await http.get(`/transactions?trans-type=${group}`);
      return data;
    } else {
      const { data } = await http.get("/transactions/");
      return data;
    }
  } catch (error) {
    toast.error("خطا در ارتباط با سرور");
  }
}
