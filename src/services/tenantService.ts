import api from "../api";

const TenantService = {
  create: async (data: any) => {
    return api
      .post("/tenant", data)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  update: async (id: number, data: any) => {
    return api
      .put(`/tenant/${id}`, data)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  getData: async (): Promise<[]> => {
    return api
      .get("/tenant")
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  get: async (id: number): Promise<any> => {
    return api
      .get(`/tenant/${id}`)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  delete: async (id: number) => {
    return api
      .delete(`/tenant/${id}`)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};

export default TenantService;
