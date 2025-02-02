// src/_global/AxiosInstance.ts
import { baseURL } from "@/constants/variables";
import axios, {
  AxiosInstance as AxiosInstanceType,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie } from "cookies-next";

// Membuat instance Axios
const AxiosInstance: AxiosInstanceType = axios.create({
  baseURL,
  withCredentials: true, // Mengirim cookie bersama permintaan
});

// Menambahkan interceptor untuk menangani token secara otomatis
AxiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getCookie("token");

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`; // Menambahkan header Authorization
    }

    return config;
  },
  (error) => {
    // Menangani error saat konfigurasi request
    return Promise.reject(error);
  }
);

export { AxiosInstance };
