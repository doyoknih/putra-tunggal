import { apiURL } from "@/constants/variables";
import axios from "axios";

const getServices = async () => {
  const res = await axios.get(`${apiURL}/services`);
  return res.data;
};

export { getServices };
