import { apiURL } from "@/constants/variables";
import axios from "axios";

const createOrderOffline = async (body: any) => {
  const res = await axios.post(`${apiURL}/orderOffline`, body);
  return res.data;
};

const updateOrderOffline = async ({ body, id }: any) => {
  const res = await axios.patch(`${apiURL}/orderOffline/${id}`, body);
  return res.data;
};

const deleteOrderOffline = async (id: any) => {
  const res = await axios.delete(`${apiURL}/orderOffline/${id}`);
  return res.data;
};

export { createOrderOffline, updateOrderOffline, deleteOrderOffline };
