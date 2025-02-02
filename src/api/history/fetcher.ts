import { apiURL } from "@/constants/variables";
import axios from "axios";

const getHistory = async () => {
  const res = await axios.get(`${apiURL}/histories`);
  return res.data;
};

export { getHistory };
