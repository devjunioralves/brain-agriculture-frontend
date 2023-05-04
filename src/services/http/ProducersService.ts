import { IProducer } from "../../pages/Producers/interface/IProducer";
import apiService from "./AxiosService";

export class ProducersService {
  public static uri = "producer";

  public static getAllProducers(params: any): IProducer[] {
    return apiService.get(`${this.uri}/`, params) as unknown as IProducer[];
  }

  public static getProducer(id: any) {
    return apiService.get(`${this.uri}/${id}`);
  }

  public static store(data: any) {
    return apiService.post(`${this.uri}`, data);
  }

  public static update(id: number, data: any) {
    return apiService.patch(`${this.uri}/${id}`, data);
  }

  public static remove(id: number) {
    return apiService.del(`${this.uri}/${id}`);
  }
}
