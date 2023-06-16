import api from "./api";

const ContractService = {
  getInstallments: async (contractId: number): Promise<any> => {
    return api
      .get(`/contract/installments/${contractId}`)
      .then((response) => {
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};

export default ContractService;
