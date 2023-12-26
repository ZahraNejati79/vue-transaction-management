import { toast } from "vue3-toastify";
import http from "../httpService";

export async function deleteTransaction(transactionId) {
  try {
    await http.delete(`/transactions/${transactionId}/`);
    toast.success("تراکنش با موفقیت حذف شد");
  } catch (error) {
    toast.error("خطا در حذف تراکنش");
  }
}
