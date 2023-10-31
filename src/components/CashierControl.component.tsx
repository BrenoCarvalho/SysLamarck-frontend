import { Button, useDisclosure } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CashierContext } from "../context/CashierContext";
import ConfirmDialog from "./modals/ConfirmDialog.component";
import PdfViewer from "./modals/ReceiptViewer.component";
import CashierService from "../services/cashierService";

const CashierControl = () => {
  const { openedCashier, openCashier, closeCashier } =
    useContext(CashierContext);

  const {
    isOpen: confirmDialogIsOpen,
    onOpen: confirmDialogOnOpen,
    onClose: confirmDialogOnClose,
  } = useDisclosure();

  const {
    isOpen: showCashFlowReportIsOpen,
    onOpen: showCashFlowReportOnOpen,
    onClose: showCashFlowReportOnClose,
  } = useDisclosure();

  const [blobPdfLink, setBlobPdfLink] = useState("");

  const handleCloseCashier = async () => {
    const cashierId = openedCashier?.id;
    await closeCashier();
    showCashFlowReportOnOpen();

    CashierService.cashFlowReport({
      cashierId,
    }).then((value) => {
      const blob = new Blob([value.data], { type: "application/pdf" });
      setBlobPdfLink(window.URL.createObjectURL(blob));
    });
  };

  const handleOpenCashier = () => {
    openCashier();
    window.location.reload();
  };

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
        onConfirm={async () => {
          openedCashier ? await handleCloseCashier() : handleOpenCashier();
        }}
        title={openedCashier ? "Fechar caixa" : "Abrir caixa"}
        message={
          openedCashier
            ? "Você tem certeza que deseja fechar o caixa atual?"
            : "Você tem certeza que deseja abrir um novo caixa?"
        }
      />

      <PdfViewer
        isOpen={showCashFlowReportIsOpen}
        onClose={() => {
          setBlobPdfLink("");
          showCashFlowReportOnClose();
          window.location.reload();
        }}
        isLoading={!(blobPdfLink?.length > 0)}
        content={blobPdfLink}
      />
    </>
  );
};

export default CashierControl;
