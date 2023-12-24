import { toast } from "vue3-toastify";
import http from "../httpService";
export async function postTransaction(transactionValue) {
  try {
    await http.post("/transactions/", transactionValue);
    toast.success("تراکنش با موفقیت ثبت شد");
  } catch (error) {
    toast.error("خطا در ارتباط با سرور");
  }
}
