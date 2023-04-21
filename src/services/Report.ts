import api from "../api";

const Report = {
  propertyForSale: async (): Promise<any> => {
    return api
      .get(`/report/propertyForSale`)
      .then((response) => {
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  propertyVacant: async (): Promise<any> => {
    return api
      .get(`/report/propertyVacant`)
      .then((response) => {
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  propertyByLocator: async (locatorCode: any): Promise<any> => {
    return api
      .get(`/report/propertyByLocator/${locatorCode}`)
      .then((response) => {
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  contractsByMonth: async (
    month: string | number,
    type: "start" | "end"
  ): Promise<any> => {
    return api
      .get("/report/contractsByMonth", { params: { month, type: type } })
      .then((response) => {
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  contractsByPeriod: async (
    startDate: any,
    endDate: any,
    mode: number
  ): Promise<any> => {
    return api
      .post("/report/contractsByPeriod", { startDate, endDate, mode })
      .then((response) => {
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  rgiEdp: async (): Promise<any> => {
    return api
      .get(`/report/rgiEdp`)
      .then((response) => {
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  propertyTax: async (): Promise<any> => {
    return api
      .get(`/report/propertyTax`)
      .then((response) => {
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};

export default Report;
