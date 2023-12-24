import http from "../httpService";
export async function getCategoryTotal(trans_type) {
  try {
    const { data } = await http.get(
      `report/categories_wise/?trans_type=${trans_type}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
