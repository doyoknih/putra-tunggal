import { apiURL } from "@/constants/variables";
import axios from "axios";

const fetchAuth = async ({ body, params }: any) => {
  const res = await axios.post(`${apiURL}/auth/${params}`, body);
  return res.data;
};

const fetchLogout = async () => {
  const res = await axios.delete(`${apiURL}/auth/logout`);
  return res.data;
};

export { fetchAuth, fetchLogout };
