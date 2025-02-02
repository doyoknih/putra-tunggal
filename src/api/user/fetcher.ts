import { apiURL } from "@/constants/variables";
import axios from "axios";

const getRole = async () => {
  const res = await axios.get(`${apiURL}/role`);
  return res.data;
};
const getProfile = async () => {
  const res = await axios.get(`${apiURL}/user`);
  return res.data;
};
const getUsers = async () => {
  const res = await axios.get(`${apiURL}/users`);
  return res.data;
};
const getUserById = async (id: string) => {
  const res = await axios.get(`${apiURL}/users/${id}`);
  return res.data;
};
const updateUser = async ({ body, id }: any) => {
  const res = await axios.patch(`${apiURL}/users/${id}`, body);
  return res.data;
};
const deleteUser = async (id: string) => {
  const res = await axios.delete(`${apiURL}/users/${id}`);
  return res.data;
};

export { getUsers, getUserById, updateUser, deleteUser, getRole, getProfile };
