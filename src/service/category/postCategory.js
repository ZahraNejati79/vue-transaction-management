import { toast } from "vue3-toastify";
import http from "../httpService";

export async function postCategory(categoryData) {
  try {
    await http.post("/categories/", categoryData);
    toast.success("نام دسته با موفقیت ثبت شد");
  } catch (error) {
    toast.error(" خطا در ارتباط با سرور");
  }
}
