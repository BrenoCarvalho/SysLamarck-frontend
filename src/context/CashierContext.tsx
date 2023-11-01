import { createContext, useEffect, useState } from "react";
import CashierService from "../services/cashierService";

const CashierContext = createContext<any>(null);

const CashierProvider = ({ children }: any) => {
  const [openedCashier, setOpenedCashier] = useState<any>();

  const loadOpenedCashier = async () =>
    setOpenedCashier(await CashierService.openedCashier());

  useEffect(() => {
    loadOpenedCashier();
  }, []);

  const openCashier = async () => {
    if (!openedCashier) setOpenedCashier(await CashierService.open());
  };

  const closeCashier = async () => {
    if (openedCashier) {
      await CashierService.close();
      setOpenedCashier(null);
    }
  };

  return (
    <CashierContext.Provider
      value={{ openedCashier, openCashier, closeCashier }}
    >
      {children}
    </CashierContext.Provider>
  );
};

export { CashierContext, CashierProvider };
