import Page from "../components/Page.component";
import { Button, Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import ReportViewer from "../components/Modals/ReportViewer.component";
import PropertiesForSale from "../components/documents/PropertiesForSale.compoent";

const PropertySection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      w="50%"
      h="100%"
      direction={["column", "column", "column", "row"]}
      justifyContent="center"
      bg="#fff"
      p="8"
      borderRadius="lg"
      shadow="lg"
    >
      <ReportViewer
        isOpen={isOpen}
        onClose={onClose}
        report={<PropertiesForSale />}
      />

      <Flex direction="column" w="100%" gap="2">
        <Flex align="center">
          <AiOutlineHome className="text-2xl text-black" />
          <Text fontWeight="bold" ml="2" mt="1">
            Imóvel
          </Text>
        </Flex>
        <Divider mb="3" />

        <Button onClick={onOpen}>Imóveis para venda</Button>
        <Button disabled={true}>Imóveis por locador</Button>
      </Flex>
    </Flex>
  );
};

const ContractSection = () => {
  return (
    <Flex
      w="50%"
      h="100%"
      direction={["column", "column", "column", "row"]}
      justifyContent="center"
      bg="#fff"
      p="8"
      borderRadius="lg"
      shadow="lg"
    >
      <Flex direction="column" w="100%" gap="2">
        <Flex align="center">
          <CgFileDocument className="text-2xl text-black" />
          <Text fontWeight="bold" ml="2" mt="1">
            Contrato
          </Text>
        </Flex>
        <Divider mb="3" />

        <Button disabled={true}>Contratos finalizados por período</Button>
      </Flex>
    </Flex>
  );
};

const Reports = () => {
  return (
    <Page title="Relatórios" gap="4">
      <PropertySection />
      <ContractSection />
    </Page>
  );
};

export default Reports;
