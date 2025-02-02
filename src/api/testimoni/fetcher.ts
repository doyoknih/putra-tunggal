import { apiURL } from "@/constants/variables";
import axios from "axios";

const getTestimoni = async () => {
  const res = await axios.get(`${apiURL}/testimoni`);
  return res.data;
};
const createTestimoni = async (body: any) => {
  const res = await axios.post(`${apiURL}/testimoni`, body);
  return res.data;
};
const updateTestimoni = async ({ body, id }: any) => {
  const res = await axios.patch(`${apiURL}/testimoni/${id}`, body);
  return res.data;
};
const deletetestimoni = async (id: string) => {
  const res = await axios.get(`${apiURL}/testimoni/${id}`);
  return res.data;
};

export { getTestimoni, createTestimoni, updateTestimoni, deletetestimoni };
