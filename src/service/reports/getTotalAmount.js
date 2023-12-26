import http from "../httpService";

export async function getTotalAmount(params) {
  try {
    if (params) {
      if (params.date.length == 1) {
        const { data } = await http.get(
          `/report/type_wise/?trans_type=${params.trans_type}&date=${params.date}&category=${params.category}`
        );
        return data;
      } else if (params.date.length == 2) {
        const { data } = await http.get(
          `/report/type_wise/?trans_type=${params.trans_type}&start_date=${params.date[0]}&end_date=${params.date[1]}&category=${params.category}`
        );
        return data;
      } else {
        const { data } = await http.get(
          `/report/type_wise/?trans_type=${params.trans_type}&category=${params.category}`
        );
        return data;
      }
    } else {
      const { data } = await http.get("/report/type_wise/");
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
