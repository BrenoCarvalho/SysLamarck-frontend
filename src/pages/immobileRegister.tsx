import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
} from "@chakra-ui/react";
import Immobile from "../components/Forms/Basics/Immobile.component";
import MunicipalData from "../components/Forms/Basics/MunicipalData.component";
import RentOrSale from "../components/Forms/Basics/RentOrSaleData.component";
import ResidentialData from "../components/Forms/Basics/ResidentialData.component";
import Page from "../components/Page.component";

const ImmobileRegister = () => {
  return (
    <Page title="Cadastro de Imóvel" direction="column">
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
      >
        {/* Left Side */}
        <Flex
          w={["100%", "100%", "100%", "50%"]}
          h="100%"
          mr="5"
          direction="column"
          gap="7"
        >
          <Immobile />
          <ResidentialData />
          <Flex direction="column" gap="6">
            <FormControl>
              <FormLabel fontSize="sm">Pagador do IPTU</FormLabel>
              <RadioGroup>
                <Stack direction="row" gap="6">
                  <Radio value="1">Proprietário</Radio>
                  <Radio value="2">Imobiliária</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Declaração DIMOB</FormLabel>
              <Switch />
            </FormControl>
          </Flex>
        </Flex>
        {/* Right Side */}
        <Flex
          w={["100%", "100%", "100%", "50%"]}
          h="100%"
          mt={["8", "8", "8", "0"]}
          ml={["0", "0", "0", "5"]}
          direction="column"
          gap="7"
        >
          <RentOrSale />
          <FormControl>
            <FormLabel fontSize="sm">Vago</FormLabel>
            <Switch />
          </FormControl>
          <MunicipalData />

          {/* Submit button */}
          <Flex w="100%" h="100%" justifyContent="flex-end">
            <Button w={150}>Adicionar</Button>
          </Flex>
        </Flex>
      </Flex>
    </Page>
  );
};

export default ImmobileRegister;
