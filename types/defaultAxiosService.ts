import axios, { AxiosInstance } from "axios";

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
    timeout: 20000,
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
