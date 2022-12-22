import axios from "axios";

class LocatorService {
  baseUrl = "http://15.229.12.196:8000";

  async create(data: any) {
    console.log(this.baseUrl);
    return axios({
      url: `${this.baseUrl}/locator`,
      method: "POST",
      timeout: 5000,
      data: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async update(id: number, data: any) {
    return axios({
      url: `${this.baseUrl}/locator/${id}`,
      method: "PUT",
      timeout: 5000,
      data: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async getData(): Promise<[]> {
    return axios({
      url: `${this.baseUrl}/locator`,
      method: "GET",
      timeout: 5000,
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async get(id: number): Promise<any> {
    return axios({
      url: `${this.baseUrl}/locator/${id}`,
      method: "GET",
      timeout: 5000,
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async delete(id: number) {
    return axios({
      url: `${this.baseUrl}/locator/${id}`,
      method: "DELETE",
      timeout: 5000,
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export default LocatorService;
