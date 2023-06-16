import api from "./api";

const LocatorService = {
  create: async (data: any) => {
    return api
      .post("/locator", data)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  update: async (id: number, data: any) => {
    return api
      .put(`/locator/${id}`, data)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  getData: async (): Promise<[]> => {
    return api
      .get("/locator")
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  get: async (id: number): Promise<any> => {
    return api
      .get(`/locator/${id}`)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  delete: async (id: number) => {
    return api
      .delete(`/locator/${id}`)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};

export default LocatorService;
