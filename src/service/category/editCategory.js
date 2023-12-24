import { toast } from "vue3-toastify";
import http from "../httpService";

export async function editCategory(categoryId, categoryData) {
  try {
    await http.put(`/categories/${categoryId}/`, categoryData);
    toast.success("دسته با موفقیت ویرایش شد");
  } catch (error) {
    toast.error(" خطا در ارتباط با سرور");
  }
}
