import axios from "axios";

const uploadImage = async (body: any) => {
  const res = await axios.post(`https://democms.byito.dev/files`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export { uploadImage };
