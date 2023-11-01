import api from "./api";

const TenantService = {
  create: async (data: any) => {
    return api
      .post("/tenant", data)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  update: async (id: number, data: any) => {
    return api
      .put(`/tenant/${id}`, data)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  getData: async (): Promise<[]> => {
    return api
      .get("/tenant")
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  get: async (id: number): Promise<any> => {
    return api
      .get(`/tenant/${id}`)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  delete: async (id: number) => {
    return api
      .delete(`/tenant/${id}`)
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  Contract: {
    get: async (
      tenantId: number,
      showBail?: boolean | number,
      showAllInstallments?: boolean | number,
      showCurrentInstallment?: boolean | number
    ): Promise<any> => {
      return api
        .get(
          `/tenant/${tenantId}/contract?showBail=${Number(
            showBail
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
    Installment: {
      get: async ({
        tenantId,
        installmentId,
      }: {
        tenantId: number;
        installmentId: number;
      }): Promise<any> => {
        return api
          .get(`/tenant/${tenantId}/contract/installment/${installmentId}`)
          .then((response) => {
            return Promise.resolve(response?.data);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      },
      getAll: async ({ tenantId }: { tenantId: number }): Promise<any> => {
        return api
          .get(`/tenant/${tenantId}/contract/installment/`)
          .then((response) => {
            return Promise.resolve(response?.data);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      },
      pay: async (
        tenantId: number,
        amount: number,
        formOfPayment: string,
        data: string | object,
        metadata: string | object
      ) => {
        return api
          .post(`/tenant/${tenantId}/contract/installment/pay`, {
            amount,
            formOfPayment,
            data,
            metadata,
          })
          .then((response) => {
            return Promise.resolve(response);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      },
      transfer: async (
        tenantId: number,
        installmentId: number,
        amount: number,
        formOfPayment: string,
        data: string | object
      ) => {
        return api
          .post(
            `/tenant/${tenantId}/contract/installment/transfer/${installmentId}`,
            {
              amount,
              formOfPayment,
              data,
            }
          )
          .then((response) => {
            return Promise.resolve(response);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      },
      receipt: async ({
        tenantId,
        installmentId,
        mode,
      }: {
        tenantId: number;
        installmentId: number;
        mode: "tenant" | "locator";
      }): Promise<any> => {
        return api
          .get(
            `/tenant/${tenantId}/contract/installment/${installmentId}/receipt?mode=${mode}`,
            { responseType: "blob" }
          )
          .then((response) => {
            return Promise.resolve(response);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      },
    },
  },
};

export default TenantService;
