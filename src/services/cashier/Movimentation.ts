import api from "../../api";

const MovimentationService = {
  create: async (data: any) => {
    return api
      .post("/movimentation", data)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  // update: async (id: number, data: any) => {
  //   return api
  //     .put(`/property/${id}`, data)
  //     .then((response) => {
  //       return Promise.resolve(response);
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error);
  //     });
  // },
  getData: async (): Promise<[]> => {
    return api
      .get("/movimentation")
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  // get: async (id: number): Promise<any> => {
  //   return api
  //     .get(`/property/findById/${id}`)
  //     .then((response) => {
  //       return Promise.resolve(response.data);
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error);
  //     });
  // },
  // getByPropertyCode: async (propertyCode: string | null): Promise<any> => {
  //   return await api
  //     .get(`/property/findByPropertyCode/${propertyCode}`)
  //     .then((response) => {
  //       return Promise.resolve(response.data);
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error);
  //     });
  // },
  // delete: async (id: number) => {
  //   return api
  //     .delete(`/property/${id}`)
  //     .then((response) => {
  //       return Promise.resolve(response.data);
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error);
  //     });
  // },
};

export default MovimentationService;
