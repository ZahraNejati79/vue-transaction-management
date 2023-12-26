import { toast } from "vue3-toastify";
import http from "../httpService";

export async function editTransaction(transactionId, transactionData) {
  try {
    await http.put(`/transactions/${transactionId}/`, transactionData);
    toast.success("تراکنش با موفقیت ویرایش شد");
  } catch (error) {
    toast.error(" خطا در ویرایش تراکنش ");
  }
}
