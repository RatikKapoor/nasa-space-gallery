import { ApiData } from "./interfaces";

/**
 * NasaApi
 *
 * Abstracts functions needed to interact with NASA API
 */
class NasaApi {
  private nasaApodUrl: string = "https://api.nasa.gov/planetary/apod";

  /**
   * getImagesForDates
   *
   * @returns An array of ApiData which contains image data for selected date range
   */
  public async getDataForDates(
    startDate: string,
    endDate: string
  ): Promise<ApiData[]> {
    let url = new URL(this.nasaApodUrl);
    if (process.env.REACT_APP_NASA_API_KEY === undefined) {
      throw process.env;
    }
    const api_key: string = process.env.REACT_APP_NASA_API_KEY;
    let params = {
      start_date: startDate,
      end_date: endDate,
      api_key: api_key,
    };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.error) {
      throw data.error;
    }

    return data as ApiData[];
  }

  /**
   * getDataForDate
   *
   * @param date Date to retrieve info for
   * @returns ApiData object for specified date
   */
  public async getDataForDate(date: string): Promise<ApiData> {
    let url = new URL(this.nasaApodUrl);
    if (process.env.REACT_APP_NASA_API_KEY === undefined) {
      throw process.env;
    }
    const api_key: string = process.env.REACT_APP_NASA_API_KEY ?? "DEMO_KEY";
    let params = {
      date: date,
      api_key: api_key,
    };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.error) {
      throw data.error;
    }

    return data as ApiData;
  }

  /**
   * getDefaultData
   *
   * @returns ApiData for current (default) date
   */
  public async getDefaultData(): Promise<ApiData> {
    let url = new URL(this.nasaApodUrl);
    if (process.env.REACT_APP_NASA_API_KEY === undefined) {
      throw process.env;
    }
    const api_key: string = process.env.REACT_APP_NASA_API_KEY ?? "DEMO_KEY";
    let params = {
      api_key: api_key,
    };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.error) {
      throw data.error;
    }

    return data as ApiData;
  }
}

export default NasaApi;
