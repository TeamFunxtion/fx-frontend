import axios, { AxiosInstance } from "axios";
import { API_URL } from "@/app/constants";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export default api;

export const fileApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data;",
  },
  withCredentials: true,
});
