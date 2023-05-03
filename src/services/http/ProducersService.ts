import { AxiosService } from "./AxiosService";

export class ProducersService {
  public static uri = "producers";

  public static getAllProducers(params: any) {
    return AxiosService.get(`${this.uri}/`, params);
  }

  public static getProducer(id: any) {
    return AxiosService.get(`${this.uri}/${id}`);
  }

  public static store(data: any) {
    return AxiosService.post(`${this.uri}`, data);
  }

  public static update(id: number, data: any) {
    return AxiosService.patch(`${this.uri}/${id}`, data);
  }

  public static remove(id: number) {
    return AxiosService.del(`${this.uri}/${id}`);
  }
}
