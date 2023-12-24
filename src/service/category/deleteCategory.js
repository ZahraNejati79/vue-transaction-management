import { toast } from "vue3-toastify";
import http from "../httpService";

export async function deleteCategory(categoryId) {
  try {
    await http.delete(`/categories/${categoryId}/`);
    toast.success("دسته با موفقیت حذف شد");
  } catch (error) {
    toast.error(" خطا در ارتباط با سرور");
  }
}
