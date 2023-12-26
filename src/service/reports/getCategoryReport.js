import http from "../httpService";

export async function getCategoryReport(category) {
  try {
    if (category) {
      const { data } = await http.get(
        `/report/total_for_categories/?${category}`
      );
      return data;
    } else {
      const { data } = await http.get(
        "/report/total_for_categories/?trans_type=in"
      );
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
}
