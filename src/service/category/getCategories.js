import { toast } from "vue3-toastify";
import http from "../httpService";

export async function getCategories(cat_type) {
  // cat_type ? in--> income , out-->expense
  try {
    if (cat_type) {
      const { data } = await http.get(`/categories/?cat_type=${cat_type}`);
      return data.results;
    } else {
      const { data } = await http.get("/categories/");
      return data.results;
    }
  } catch (error) {
    console.log(error.message);
  }
}
