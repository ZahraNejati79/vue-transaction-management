import http from "../httpService";

export async function getUser() {
  try {
    const { data } = await http.get("/user/");
    return data.results;
  } catch (error) {
    console.log(error);
  }
}
