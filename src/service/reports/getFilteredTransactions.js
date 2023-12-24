import http from "../httpService";

export function getFilteredTransactions({ trans_type, category, date }) {
  try {
    const { data } = http.get(
      `/report/?trans_type=${trans_type}&date=${date}&category=${category}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
