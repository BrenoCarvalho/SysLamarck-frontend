import Page from "../components/Page.component";
import { Button, Flex, Switch, Text, useDisclosure } from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState } from "react";
import { dateFormatter } from "../services/formatters";
import RentInstallmentsTable from "../components/tables/RentInstallmentsTable.component";
import TenantService from "../services/tenantService";
import ContractService from "../services/contractService";
import TenantSelect from "../components/TenantSelect.component";
import InstallmentVisualizationModal from "../components/modals/visualization/InstallmentVisualizationModal.component";

const RentInstallments = () => {
  const {
    isOpen: visualizationModalDialogIsOpen,
    onOpen: visualizationModalDialogOnOpen,
    onClose: visualizationModalDialogOnClose,
  } = useDisclosure();

  const [tenant, setTenant] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [installments, setInstallments] = useState<[]>([]);
  const [selected, setSelected] = useState<any>();

  const updateData = async (tenantId: string | number) => {
    setTenant(null);
    setContract(null);
    setInstallments([]);

    const tenant = await TenantService?.get(Number(tenantId));
    const contract = await ContractService?.get(
      Number(tenant?.contract?.id),
      false,
      false,
      true
    );
    const installments = await ContractService.getInstallments(contract?.id);

    setTenant(tenant ?? null);
    setContract(contract ?? null);
    setInstallments(installments ?? null);
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
          <TenantSelect
            tenantName={tenant?.fullName || "Não identificado"}
            updateTenant={updateData}
          />
          <Flex w="100%" direction="column" gap="4px">
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
              <Text fontSize="sm" display="flex" flexDirection="row" gap="5px">
                Parcela:{" "}
                <Text fontWeight="bold">
                  {contract?.currentInstallment?.currentInstallment}
                  {"  "}
                </Text>
              </Text>
            </Flex>
            <Flex
              paddingLeft="1"
              paddingRight="1"
              width="100%"
              justifyContent="space-between"
            >
              <Text fontSize="sm" display="flex" flexDirection="row" gap="5px">
                Mês referência:{" "}
                <Text fontWeight="bold">
                  {contract?.currentInstallment?.referenceMonth}
                </Text>
              </Text>
              <Text fontSize="sm" display="flex" flexDirection="row" gap="5px">
                Data de vencimento:{" "}
                <Text fontWeight="bold">
                  {dateFormatter({
                    value: contract?.currentInstallment?.dueDate,
                  })}
                </Text>
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
            <Text>Mostrar parcleas antigas</Text>
          </Flex>
          <Flex mt={2} gap="2">
            <Button
              w={150}
              bg="gray.800"
              color="#fff"
              disabled={!(selected?.status === "Pg")}
            >
              2º via Recibo
            </Button>
            <Button
              w={150}
              bg="gray.800"
              color="#fff"
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

      <InstallmentVisualizationModal
        onClose={visualizationModalDialogOnClose}
        isOpen={visualizationModalDialogIsOpen}
        installmentSelected={selected}
      />
    </Page>
  );
};

export default RentInstallments;
