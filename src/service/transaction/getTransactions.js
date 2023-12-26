import { toast } from "vue3-toastify";
import http from "../httpService";

export async function getTransactions(group) {
  // group ? in--> income , out-->expense
  try {
    if (group) {
      const { data } = await http.get(`/transactions?trans-type=${group}`);
      return data.results;
    } else {
      const { data } = await http.get("/transactions/");
      return data.results;
    }
  } catch (error) {}
}
