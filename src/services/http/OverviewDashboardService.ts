import { AxiosService } from "./AxiosService";

export default class OverviewDashboardHttpService {
  public static uri = "overview";

  public static getTotalFarms() {
    return AxiosService.get(`${this.uri}/total-farms`);
  }

  public static getTotalHectares() {
    return AxiosService.get(`${this.uri}/total-hectares`);
  }

  public static getTotalFarmsByState() {
    return AxiosService.get(`${this.uri}/farms-by-state`);
  }

  public static getTotalTypeArea() {
    return AxiosService.get(`${this.uri}/type-area`);
  }

  public static getTotalArableArea() {
    return AxiosService.get(`${this.uri}/total-arable-area`);
  }
}
