import http from "../httpService";

export async function editUser(userData) {
  try {
    const { data } = await http.patch(`/user/${userData.id}/`, userData);
    return data;
  } catch (error) {
    console.log(error);
  }
}
