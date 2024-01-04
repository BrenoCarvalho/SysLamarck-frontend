import Page from "../components/Page.component";
import { Button, Flex, Switch, Text, useDisclosure } from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState } from "react";
import RentInstallmentsTable from "../components/tables/RentInstallmentsTable.component";
import TenantService from "../services/tenantService";
import TenantSelect from "../components/TenantSelect.component";
import InstallmentVisualizationModal from "../components/modals/visualization/InstallmentVisualizationModal.component";
import PdfViewer from "../components/modals/ReceiptViewer.component";
import SelectInstallmentMode from "../components/modals/SelectInstallmentMode.component";
import EditRentPaymentDetails from "../components/modals/EditRentPaymentDetails.component";

const RentInstallments = () => {
  const {
    isOpen: visualizationModalDialogIsOpen,
    onOpen: visualizationModalDialogOnOpen,
    onClose: visualizationModalDialogOnClose,
  } = useDisclosure();

  const {
    isOpen: selectRentReceiptModeModalIsOpen,
    onOpen: selectRentReceiptModeModalOnOpen,
    onClose: selectRentReceiptModeModalOnClose,
  } = useDisclosure();

  const {
    isOpen: editPaymentDetailsModalIsOpen,
    onOpen: editPaymentDetailsModalOnOpen,
    onClose: editPaymentDetailsModalOnClose,
  } = useDisclosure();

  const [tenant, setTenant] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [installments, setInstallments] = useState<[]>([]);
  const [selected, setSelected] = useState<any>();
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [blobPdfLink, setBlobPdfLink] = useState("");
  const [editTrigger, setEditTrigger] = useState(false);
  const [editPaymentDetailsMode, setEditPaymentDetailsMode] = useState<
    "credit" | "debit"
  >("credit");
  const [
    installmentSelectedWithTransactions,
    setInstallmentSelectedWithTransactions,
  ] = useState<any>();

  const showReceipt = (mode: "tenant" | "locator") => {
    setShowPdfViewer(true);

    TenantService.Contract.Installment.receipt({
      tenantId: +tenant?.id,
      installmentId: +selected.id,
      mode,
    }).then((value) => {
      const blob = new Blob([value.data], { type: "application/pdf" });
      setBlobPdfLink(window.URL.createObjectURL(blob));
    });
  };

  const editPaymentDetails = (mode: "credit" | "debit") => {
    setEditPaymentDetailsMode(mode);

    TenantService.Contract.Installment.get({
      tenantId: +tenant?.id,
      installmentId: +selected.id,
    }).then((value) => {
      setInstallmentSelectedWithTransactions(value);
      editPaymentDetailsModalOnOpen();
    });
  };

  const updateData = async (tenantId: string | number) => {
    setTenant(null);
    setContract(null);
    setInstallments([]);

    const tenant = await TenantService?.get(Number(tenantId));
    let installments = await TenantService.Contract.Installment.getAll({
      tenantId: tenant?.id,
    });

    if (typeof installments === "string") {
      installments = [];
    }

    setTenant(tenant ?? null);
    setContract(contract ?? null);
    setInstallments(installments);
  };

  return (
    <Page
      title="Parcelas de aluguel"
      direction="column"
      hScreenSize
      paddingBottom="-2"
    >
      <Flex
        w="100%"
        h="100%"
        direction="column"
        justifyContent="center"
        bg="#fff"
        p="1"
        borderRadius="lg"
        shadow="lg"
        gap="1"
      >
        <Flex w="100%" flexDirection="column" gap="10px" padding={4} mb="-5px">
          <TenantSelect variant="outline" onUpdateTenantId={updateData} />
          <Flex w="100%" direction="column" gap="4px" marginTop="5px">
            <Flex
              paddingLeft="1"
              paddingRight="1"
              width="100%"
              justifyContent="space-between"
            >
              <Text fontSize="sm" display="flex" flexDirection="row" gap="5px">
                Nº Contrato:{" "}
                <Text fontWeight="bold">{tenant?.contract?.id}</Text>
              </Text>
            </Flex>
            <Flex
              paddingLeft="1"
              paddingRight="1"
              width="100%"
              justifyContent="space-between"
            >
              <Text fontSize="sm" display="flex" flexDirection="row" gap="5px">
                Endereço do imóvel:{" "}
                <Text fontWeight="bold">{tenant?.property?.address}</Text>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <RentInstallmentsTable setSelected={setSelected} data={installments} />
        <Flex justifyContent="space-between" padding="2">
          <Flex ml="10px" h="100%" align="center" gap="2">
            <Switch />
            <Text>Mostrar parcelas antigas</Text>
          </Flex>
          <Flex mt={2} gap="2">
            <Button
              w={150}
              bg="gray.800"
              color="#fff"
              disabled={!(selected?.status === "Pg")}
              onClick={() => {
                setEditTrigger(false);
                selectRentReceiptModeModalOnOpen();
              }}
            >
              2º via Recibo
            </Button>
            <Button
              w={150}
              bg="gray.800"
              color="#fff"
              disabled={!(selected?.status === "Pg")}
              onClick={() => {
                setEditTrigger(true);
                selectRentReceiptModeModalOnOpen();
              }}
            >
              Editar
            </Button>
            <Button
              w={150}
              bg="gray.800"
              color="#fff"
              disabled={!selected}
              onClick={
                selected
                  ? () => visualizationModalDialogOnOpen()
                  : () => {
                      console.log("Selecione algum imóvel");
                    }
              }
            >
              Visualizar
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <PdfViewer
        isOpen={showPdfViewer}
        onClose={() => {
          setBlobPdfLink("");
          setShowPdfViewer(false);
        }}
        isLoading={!(blobPdfLink?.length > 0)}
        content={blobPdfLink}
      />

      <SelectInstallmentMode
        onClose={selectRentReceiptModeModalOnClose}
        isOpen={selectRentReceiptModeModalIsOpen}
        onConfirm={(mode) => {
          if (editTrigger) editPaymentDetails(mode as "credit" | "debit");
          else showReceipt(mode as "tenant" | "locator");

          selectRentReceiptModeModalOnClose();
        }}
        showAllOptions={selected?.transaction.length > 1}
        isEdit={editTrigger}
      />

      <EditRentPaymentDetails
        isOpen={editPaymentDetailsModalIsOpen}
        onClose={editPaymentDetailsModalOnClose}
        mode={editPaymentDetailsMode}
        installment={installmentSelectedWithTransactions}
      />

      <InstallmentVisualizationModal
        onClose={visualizationModalDialogOnClose}
        isOpen={visualizationModalDialogIsOpen}
        installmentSelected={selected}
      />
    </Page>
  );
};

export default RentInstallments;
