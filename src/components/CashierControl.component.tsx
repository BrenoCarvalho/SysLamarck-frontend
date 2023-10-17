import { Button, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { CashierContext } from "../context/CashierContext";
import ConfirmDialog from "./modals/ConfirmDialog.component";

const CashierControl = () => {
  const { openedCashier, openCashier, closeCashier } =
    useContext(CashierContext);

  const {
    isOpen: confirmDialogIsOpen,
    onOpen: confirmDialogOnOpen,
    onClose: confirmDialogOnClose,
  } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        bgColor="#fff"
        color="black"
        borderColor="#d1d1d1"
        shadow="sm"
        fontWeight="semibold"
        _hover={{ bgColor: "#f0f0f0" }}
        onClick={confirmDialogOnOpen}
      >
        {openedCashier ? "Fechar caixa" : "Abrir caixa"}
      </Button>

      <ConfirmDialog
        isOpen={confirmDialogIsOpen}
        onClose={confirmDialogOnClose}
        onConfirm={() => {
          openedCashier ? closeCashier() : openCashier();
          window.location.reload();
        }}
        title={openedCashier ? "Fechar caixa" : "Abrir caixa"}
        message={
          openedCashier
            ? "Você tem certeza que deseja fechar o caixa atual?"
            : "Você tem certeza que deseja abrir um novo caixa?"
        }
      />
    </>
  );
};

export default CashierControl;
