import api from "./api";

const PropertyService = {
  create: async (data: any) => {
    return api
      .post("/property", data)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  update: async (id: number, data: any) => {
    return api
      .put(`/property/${id}`, data)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  getData: async (): Promise<[]> => {
    return api
      .get("/property")
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  get: async (
    id: number,
    showLocator?: boolean | number,
    showTenant?: boolean | number
  ): Promise<any> => {
    return api
      .get(
        `/property/${id}?showLocator=${Number(showLocator)}&showTenant=${Number(
          showTenant
        )}`
      )
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  getByPropertyCode: async (propertyCode: string | null): Promise<any> => {
    return await api
      .get(`/property/findByPropertyCode/${propertyCode}`)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  delete: async (id: number) => {
    return api
      .delete(`/property/${id}`)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};

export default PropertyService;
