import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { CashierContext } from "../context/CashierContext";

const CashierControl = () => {
  const { openedCashier, openCashier, closeCashier } =
    useContext(CashierContext);

  return (
    <Button
      size="sm"
      bgColor="#fff"
      color="black"
      borderColor="#d1d1d1"
      shadow="sm"
      fontWeight="semibold"
      _hover={{ bgColor: "#f0f0f0" }}
      onClick={() => {
        openedCashier ? closeCashier() : openCashier();
        window.location.reload();
      }}
    >
      {openedCashier ? "Fechar caixa" : "Abrir caixa"}
    </Button>
  );
};

export default CashierControl;
