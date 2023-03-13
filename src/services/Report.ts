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

  contractsByPeriod: async (
    startDate: any,
    endDate: any,
    mode: number
  ): Promise<any> => {
    const url =
      mode === 1
        ? "/report/contractsCompletedByPeriod"
        : "/report/contractsStartedByPeriod";

    return api
      .post(url, { startDate, endDate })
      .then((response) => {
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};

export default Report;
