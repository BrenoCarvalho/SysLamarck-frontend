import api from "./api";

const CashierService = {
  openedCashier: async () => {
    const response = await api.get("/cashier/");
    try {
      return await Promise.resolve(response?.data);
    } catch (error) {
      return await Promise.resolve(error);
    }
  },
  open: async () => {
    return api
      .post("/cashier/open")
      .then((response) =>
        Promise.resolve(response?.data).catch((error) => Promise.resolve(error))
      );
  },
  close: async () => {
    return api
      .post("/cashier/close")
      .then((response) =>
        Promise.resolve(response?.data).catch((error) => Promise.resolve(error))
      );
  },
  Transaction: {
    create: async (data: any) => {
      return api
        .post("/cashier/transaction", data)
        .then((response) => {
          return Promise.resolve(response);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    getAll: async ({
      category,
      cashierId,
      allRelations,
    }: {
      category: "rent" | "generic";
      cashierId?: number;
      allRelations?: boolean;
    }): Promise<[]> => {
      return api
        .get(
          `cashier/transaction/${category}?cashierId=${cashierId}&allRelations=${allRelations}`
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
        .delete(`cashier/transaction/${id}`)
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },
};

export default CashierService;
