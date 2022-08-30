import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface defaultResponseType {
  code: string;
  data: object;
  message: string;
  status: number;
}

export class DefaultAxiosService {
  static readonly instance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    timeout: 60000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static addHeaderToken(token: string): void {
    this.instance.defaults.headers.common["X-Auth-Token"] = token;
  }

  static removeHeaderToken(): void {
    this.instance.defaults.headers.common["X-Auth-Token"] = "";
  }
}

DefaultAxiosService.instance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    if (
      !config.headers.common["X-Auth-Token"] &&
      localStorage.getItem("token")
    ) {
      const token = localStorage.getItem("token");
      config.headers.common["X-Auth-Token"] = token;
      DefaultAxiosService.addHeaderToken(token);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
