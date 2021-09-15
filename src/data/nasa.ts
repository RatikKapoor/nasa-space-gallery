import { ApiData } from "./interfaces";

class NasaApi {
  private nasaApodUrl: string = "https://api.nasa.gov/planetary/apod";

  /**
   * getImagesForDates
   */
  public async getImagesForDates(
    startDate: string,
    endDate: string
  ): Promise<ApiData[]> {
    let url = new URL(this.nasaApodUrl);
    let params = {
      start_date: startDate,
      end_date: endDate,
      api_key: "DEMO_KEY",
    };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url.toString());
    const data = await response.json();

    return data as ApiData[];
  }
}

export default NasaApi;
