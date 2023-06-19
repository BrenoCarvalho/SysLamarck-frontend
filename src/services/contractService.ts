import api from "./api";

const ContractService = {
  get: async (
    contractId: number,
    showTenant?: boolean | number,
    showAllInstallments?: boolean | number,
    showCurrentInstallment?: boolean | number
  ): Promise<any> => {
    return api
      .get(
        `/contract/${contractId}?showTenant=${Number(
          showTenant
        )}&showAllInstallments=${Number(
          showAllInstallments
        )}&showCurrentInstallment=${Number(showCurrentInstallment)}`
      )
      .then((response) => {
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  getInstallment: async (id: number): Promise<any> => {
    return api
      .get(`/contract/installment/${id}`)
      .then((response) => {
        return Promise.resolve(response?.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
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
  payInstallment: async (
    contractId: number,
    amount: number,
    formOfPayment: string,
    data: any
  ) => {
    return api
      .post(`/contract/payInstallment/${contractId}`, {
        amount,
        formOfPayment,
        data,
      })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  transferRent: async (
    installmentId: number,
    amount: number,
    formOfPayment: string,
    data: any
  ) => {
    return api
      .post(`/contract/transferRent/${installmentId}`, {
        amount,
        formOfPayment,
        data,
      })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};

export default ContractService;
