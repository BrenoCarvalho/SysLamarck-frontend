import { Button, Flex } from "@chakra-ui/react";
import BankData from "../components/Forms/Basics/BankData.component";
import Locator from "../components/Forms/Basics/Locator.component";
import PersonalData from "../components/Forms/Basics/PersonalData.component";
import ResidentialData from "../components/Forms/Basics/ResidentialData.component";
import Page from "../components/Page.component";

const LocadorRegister = () => {
  return (
    <Page title="Cadastro de Locador" direction="column">
      {/* Container */}
      <Flex
        w="100%"
        h="100%"
        direction={["column", "column", "column", "row"]}
        justifyContent="center"
        bg="#fff"
        p="8"
        borderRadius="lg"
        shadow="lg"
        gap="7"
      >
        {/* Left Side */}
        <Flex
          w={["100%", "100%", "100%", "50%"]}
          h="100%"
          direction="column"
          gap="7"
        >
          <Locator />
          <PersonalData />
        </Flex>
        {/* Right Side */}
        <Flex
          w={["100%", "100%", "100%", "50%"]}
          h="100%"
          direction="column"
          gap="7"
        >
          <ResidentialData fieldList={[1, 2, 3, 4]} />
          <BankData />

          {/* Submit button */}
          <Flex w="100%" justifyContent="flex-end">
            <Button w={150}>Adicionar</Button>
          </Flex>
        </Flex>
      </Flex>
    </Page>
  );
};

export default LocadorRegister;
