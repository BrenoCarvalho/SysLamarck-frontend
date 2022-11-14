import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from "@chakra-ui/react";
import Page from "../components/Page.component";

const LocadorRegister = () => {
  return (
    <Page p="8" direction="column">
      <Text fontWeight="semibold" fontSize="lg" mb="5">
        Cadastro de Locador
      </Text>
      <Divider />
      <Flex>
        <Flex w="45%" h="100%" mr="5" mt="8" direction="column">
          <Text>Dados pessoais</Text>
          <Divider mb="6" mt="4" />
          <Flex w="100%">
            <FormControl w="30%" marginRight="8">
              <FormLabel fontSize="sm">Código do locador</FormLabel>
              <NumberInput max={500} min={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl w="70%">
              <FormLabel fontSize="sm">Prestação de Serviço</FormLabel>
              <Select placeholder="Selecionar">
                <option>Exemplo1</option>
                <option>Exemplo2</option>
              </Select>
            </FormControl>
          </Flex>
          <Flex mt="6">
            <FormControl w="65%" mr="8" isRequired>
              <FormLabel fontSize="sm">Nome completo</FormLabel>
              <Input placeholder="Digite seu nome" />
            </FormControl>
            <FormControl w="35%">
              <FormLabel fontSize="sm">Data de Nascimento</FormLabel>
              <Input placeholder="Select Date and Time" size="md" type="date" />
            </FormControl>
          </Flex>
        </Flex>
        <Flex w="45%" h="100%" mt="8" ml="5" direction="column">
          <Text>Dados Residenciais</Text>
          <Divider mb="6" mt="4" />
        </Flex>
      </Flex>
    </Page>
  );
};

export default LocadorRegister;
