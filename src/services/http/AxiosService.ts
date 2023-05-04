import axios, { AxiosInstance, AxiosResponse } from "axios";

interface RequestConfig {
  headers?: any;
  params?: any;
}

interface ApiResponse<T> {
  data: T;
}

class AxiosService {
  private readonly instance: AxiosInstance;

  constructor() {
    const instance = axios.create({
      baseURL: "http://localhost:8080/api",
      timeout: 10000,
    });

    this.instance = instance;
  }

  async get<T>(endpoint: string, config?: RequestConfig) {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.instance.get(
        endpoint,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async post<T>(
    endpoint: string,
    data: any,
    config?: RequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.instance.post(
        endpoint,
        data,
        config
      );
      return response.data.data;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async patch<T>(
    endpoint: string,
    data: any,
    config?: RequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.instance.patch(
        endpoint,
        data,
        config
      );
      return response.data.data;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async del<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> =
        await this.instance.delete(endpoint, config);
      return response.data.data;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

const apiService = new AxiosService();
export default apiService;
