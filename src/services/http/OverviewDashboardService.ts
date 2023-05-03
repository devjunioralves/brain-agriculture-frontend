import Request from "./AxiosService";

export default class OverviewDashboardHttpService {
  public static uri = "overview";

  public static getTotalFarms() {
    return Request.get(`${this.uri}/total-farms`);
  }

  public static getTotalHectares() {
    return Request.get(`${this.uri}/total-hectares`);
  }

  public static getTotalFarmsByState() {
    return Request.get(`${this.uri}/farms-by-state`);
  }

  public static getTotalTypeArea() {
    return Request.get(`${this.uri}/type-area`);
  }

  public static getTotalArableArea() {
    return Request.get(`${this.uri}/total-arable-area`);
  }
}
