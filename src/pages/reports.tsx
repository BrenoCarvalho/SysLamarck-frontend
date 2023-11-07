import Page from "../components/Page.component";
import { Button, Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { CgFileDocument, CgMoreO } from "react-icons/cg";
import ReportViewer from "../components/modals/reports/ReportViewer.component";
import PropertiesForSale from "../components/documents/properties/PropertiesForSale.compoent";
import PropertiesByLocatorModal from "../components/modals/reports/PropertiesByLocator.component";
import VacantProperties from "../components/documents/properties/VacantProperties.compoent";
import ContractsByPeriodModal from "../components/modals/reports/ContractsByPeriod.component";
import RgiEdp from "../components/documents/RgiEdp.component";
import PropertyTax from "../components/documents/PropertyTax.component";
import ContractsByMonthModal from "../components/modals/reports/ContractsByMonth.component";

const PropertySection = () => {
  const {
    isOpen: isOpenPropertiesForSale,
    onOpen: onOpenPropertiesForSale,
    onClose: onClosePropertiesForSale,
  } = useDisclosure();

  const {
    isOpen: isOpenVacantProperties,
    onOpen: onOpenVacantProperties,
    onClose: onCloseVacantProperties,
  } = useDisclosure();

  const {
    isOpen: isOpenPropertiesByLocator,
    onOpen: onOpenPropertiesByLocator,
    onClose: onClosePropertiesByLocator,
  } = useDisclosure();

  return (
    <Flex
      w={["100%", "100%", "100%", "50%"]}
      h="100%"
      direction={["column", "column", "column", "row"]}
      justifyContent="center"
      bg="#fff"
      p="8"
      borderRadius="lg"
      shadow="lg"
    >
      <ReportViewer
        isOpen={isOpenPropertiesForSale}
        onClose={onClosePropertiesForSale}
        report={<PropertiesForSale />}
      />

      <ReportViewer
        isOpen={isOpenVacantProperties}
        onClose={onCloseVacantProperties}
        report={<VacantProperties />}
      />

      <PropertiesByLocatorModal
        isOpen={isOpenPropertiesByLocator}
        onClose={onClosePropertiesByLocator}
      />

      <Flex direction="column" w="100%" gap="2">
        <Flex align="center">
          <AiOutlineHome className="text-2xl text-black" />
          <Text fontWeight="bold" ml="2" mt="1">
            Imóvel
          </Text>
        </Flex>
        <Divider mb="3" />

        <Button onClick={onOpenPropertiesForSale}>Para venda</Button>
        <Button onClick={onOpenVacantProperties}>Vagos</Button>
        <Button onClick={onOpenPropertiesByLocator}>Por locador</Button>
      </Flex>
    </Flex>
  );
};

const ContractSection = () => {
  const {
    isOpen: isOpenReadjustmentContracts,
    onOpen: onOpenReadjustmentContracts,
    onClose: onCloseReadjustmentContracts,
  } = useDisclosure();

  const {
    isOpen: isOpenRenovationContracts,
    onOpen: onOpenRenovationContracts,
    onClose: onCloseRenovationContracts,
  } = useDisclosure();

  const {
    isOpen: isOpenCompletedByPeriod,
    onOpen: onOpenCompletedByPeriod,
    onClose: onCloseCompletedByPeriod,
  } = useDisclosure();

  const {
    isOpen: isOpenStartedByPeriod,
    onOpen: onOpenStartedByPeriod,
    onClose: onCloseStartedByPeriod,
  } = useDisclosure();

  return (
    <Flex
      w={["100%", "100%", "100%", "50%"]}
      h="100%"
      direction={["column", "column", "column", "row"]}
      justifyContent="center"
      bg="#fff"
      p="8"
      borderRadius="lg"
      shadow="lg"
    >
      <ContractsByPeriodModal
        isOpen={isOpenStartedByPeriod}
        onClose={onCloseStartedByPeriod}
        mode={1}
      />

      <ContractsByPeriodModal
        isOpen={isOpenCompletedByPeriod}
        onClose={onCloseCompletedByPeriod}
        mode={2}
      />

      <ContractsByMonthModal
        isOpen={isOpenReadjustmentContracts}
        onClose={onCloseReadjustmentContracts}
        type="readjustment"
      />

      <ContractsByMonthModal
        isOpen={isOpenRenovationContracts}
        onClose={onCloseRenovationContracts}
        type="renovation"
      />

      <Flex direction="column" w="100%" gap="2">
        <Flex align="center">
          <CgFileDocument className="text-2xl text-black" />
          <Text fontWeight="bold" ml="2" mt="1">
            Contrato
          </Text>
        </Flex>
        <Divider mb="3" />

        <Button onClick={onOpenReadjustmentContracts}>
          Contratos para reajuste
        </Button>
        <Button onClick={onOpenRenovationContracts}>
          Contratos para renovação
        </Button>
        <Button onClick={onOpenStartedByPeriod}>Iniciados por período</Button>
        <Button onClick={onOpenCompletedByPeriod}>
          Finalizados por período
        </Button>
      </Flex>
    </Flex>
  );
};

const OthersSection = () => {
  const {
    isOpen: isOpenRgiEdp,
    onOpen: onOpenRgiEdp,
    onClose: onCloseRgiEdp,
  } = useDisclosure();

  const {
    isOpen: isOpenPropertyTax,
    onOpen: onOpenPropertyTax,
    onClose: onClosePropertyTax,
  } = useDisclosure();

  return (
    <Flex
      w={["100%", "100%", "100%", "50%"]}
      h="100%"
      direction={["column", "column", "column", "row"]}
      justifyContent="center"
      bg="#fff"
      p="8"
      borderRadius="lg"
      shadow="lg"
    >
      <ReportViewer
        isOpen={isOpenRgiEdp}
        onClose={onCloseRgiEdp}
        report={<RgiEdp />}
      />

      <ReportViewer
        isOpen={isOpenPropertyTax}
        onClose={onClosePropertyTax}
        report={<PropertyTax />}
      />

      <Flex direction="column" w="100%" gap="2">
        <Flex align="center">
          <CgMoreO className="text-2xl text-black" />
          <Text fontWeight="bold" ml="2" mt="1">
            Outros
          </Text>
        </Flex>
        <Divider mb="3" />

        <Button onClick={onOpenPropertyTax}>Imposto predial</Button>
        <Button onClick={onOpenRgiEdp}>RGI EDP</Button>
        <Button disabled>Imposto de renda</Button>
      </Flex>
    </Flex>
  );
};

const Reports = () => {
  return (
    <Page
      title="Relatórios"
      gap="4"
      direction={["column", "column", "column", "row"]}
    >
      <PropertySection />
      <ContractSection />
      <OthersSection />
    </Page>
  );
};

export default Reports;
