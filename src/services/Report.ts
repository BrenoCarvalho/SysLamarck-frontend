import api from "../api";

const Report = {
  propertyForSale: async (): Promise<any> => {
    return api
      .get(`/report/propertyForSale`)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};

export default Report;
