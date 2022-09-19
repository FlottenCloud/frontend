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
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  static addHeaderToken(token: string): void {
    this.instance.defaults.headers.common["X-Auth-Token"] = token;
  }

  static removeHeaderToken(): void {
    this.instance.defaults.headers.common["X-Auth-Token"] = "";
    this.instance.defaults.headers.common["apiKey"] = "";
    this.instance.defaults.headers.common["secretKey"] = "";
  }

  static addHeader(key: string, value: string): void {
    this.instance.defaults.headers.common[key] = value;
  }
}

DefaultAxiosService.instance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    setToken(config, "X-Auth-Token", "token");
    setToken(config, "apiKey", "apiKey");
    setToken(config, "secretKey", "secretKey");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const setToken = (
  config: AxiosRequestConfig,
  headerKey: string,
  storageKey: string
) => {
  const value = localStorage.getItem(storageKey);
  if (!config.headers.common[headerKey] && value) {
    config.headers.common[headerKey] = value;
    DefaultAxiosService.addHeader(headerKey, value);
  }
};
