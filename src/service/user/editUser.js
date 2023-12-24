import http from "../httpService";

export async function editUser(userData) {
  try {
    const { data } = await http.put("/user/list/me/", userData);
    return data;
  } catch (error) {
    console.log(error);
  }
}
