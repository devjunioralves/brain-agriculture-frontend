import apiService from "./AxiosService";

export default class OverviewDashboardHttpService {
  public static uri = "reports";

  public static getTotalFarms() {
    return apiService.get(`${this.uri}/total-farms`);
  }

  public static async getTotalHectares() {
    const data = (await apiService.get(
      `${this.uri}/total-area`
    )) as unknown as [any];
    return data.length ? data[0].sum : 0;
  }

  public static async getTotalFarmsByState() {
    const data = (await apiService.get(
      `${this.uri}/total-farms-by-state`
    )) as unknown as [any];
    return data.map((item) => ({
      name: item.state,
      value: +item.count,
    }));
  }

  public static async getTotalTypeArea() {
    const data = (await apiService.get(
      `${this.uri}/total-by-area`
    )) as unknown as [any];
    return data.map((item) => ({
      name: item.name,
      value: +item.value,
    }));
  }

  public static async getTotalByCrops() {
    const data = (await apiService.get(
      `${this.uri}/total-by-crops`
    )) as unknown as [any];
    return data.map((item) => ({
      name: item.name,
      value: +item.value,
    }));
  }
}
