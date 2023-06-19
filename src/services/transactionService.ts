import api from "./api";

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
  getTransactions: async ({
    category,
    start,
    end,
    allRelations,
  }: {
    category: "rent" | "generic";
    start?: Date | null;
    end?: Date | null;
    allRelations?: boolean;
  }): Promise<[]> => {
    return api
      .get(
        `/transaction/${category}?start=${start}&end=${end}&allRelations=${allRelations}`
      )
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
