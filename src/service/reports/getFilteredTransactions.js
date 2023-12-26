import http from "../httpService";

export async function getFilteredTransactions(params) {
  try {
    if (params.date.length == 1) {
      const { data } = await http.get(
        `/report/?trans_type=${params.trans_type}&date=${params.date}&category=${params.category}`
      );
      return data.results;
    } else if (params.date.length == 2) {
      const { data } = await http.get(
        `/report/?trans_type=${params.trans_type}&start_date=${params.date[0]}&end_date=${params.date[1]}&category=${params.category}`
      );
      return data.results;
    } else {
      const { data } = await http.get(
        `/report/?trans_type=${params.trans_type}&category=${params.category}`
      );
      return data.results;
    }
  } catch (error) {
    console.log(error);
  }
}
