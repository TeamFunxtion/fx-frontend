import axios, { AxiosInstance } from "axios";

const api = axios.create({
  baseURL: "http://localhost:8090/api/v1",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export default api;

export const fileApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:8090/api/v1",
  headers: {
    "Content-Type": "multipart/form-data;",
  },
  withCredentials: true,
});
