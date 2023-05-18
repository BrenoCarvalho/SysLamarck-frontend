import { Flex } from "@chakra-ui/react";
import RentInputs from "../components/Forms/RentInputs.component";
import Page from "../components/Page.component";

const CashierRent = () => {
  return (
    <Page
      title="Recebimento de Aluguel"
      direction="column"
      hScreenSize
      paddingBottom="-2"
      gap="4"
    >
      <Flex
        w="100%"
        h="100%"
        direction="column"
        bg="#fff"
        p="1"
        borderRadius="lg"
        shadow="lg"
        gap="1"
      >
        <RentInputs />
      </Flex>
    </Page>
  );
};

export default CashierRent;
