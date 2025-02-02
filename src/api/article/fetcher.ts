import { apiURL } from "@/constants/variables";
import axios from "axios";
import { TypeArticle } from "./types";

const getArticle = async () => {
  const res = await axios.get(`${apiURL}/article`);
  return res.data;
};
const createArticle = async (body: TypeArticle | undefined) => {
  const res = await axios.post(`${apiURL}/article`, body);
  return res.data;
};
const updateArticle = async ({ body, id }: any) => {
  const res = await axios.patch(`${apiURL}/article/${id}`, body);
  return res.data;
};
const deleteArticle = async (id: string) => {
  const res = await axios.delete(`${apiURL}/article/${id}`);
  return res.data;
};

export { getArticle, createArticle, updateArticle, deleteArticle };
