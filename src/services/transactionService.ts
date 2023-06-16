import api from "../api";

const TransactionService = {
  create: async (data: any) => {
    return api
      .post("/transaction", data)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  getTransactions: async (type: "generic" | "rentInstallment"): Promise<[]> => {
    return api
      .get(`/transaction/${type}`)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  delete: async (id: number) => {
    return api
      .delete(`/transaction/${id}`)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};

export default TransactionService;
