import http from "../httpService";

export async function getUser() {
  try {
    const { data } = await http.get("/user/list/me/");
    return data;
  } catch (error) {
    console.log(error);
  }
}
