import {
  Button,
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
    <Page title="Cadastro de Locador" direction="column">
      {/* Container */}
      <Flex
        mt="5"
        w="100%"
        h="100%"
        direction={["column", "column", "column", "row"]}
        justifyContent="center"
        mb="10"
        bg="#fff"
        p="8"
        borderRadius="lg"
        shadow="lg"
      >
        {/* Section 1 */}
        <Flex
          w={["100%", "100%", "100%", "50%"]}
          h="100%"
          mr="5"
          direction="column"
        >
          <Text>Dados pessoais</Text>
          <Divider mb="6" mt="4" />
          {/* Row 1 */}
          <Flex w="100%">
            <FormControl w="30%" marginRight="6">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                Código do locador
              </FormLabel>
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
          {/* Row 2 */}
          <Flex mt="6">
            <FormControl w="65%" mr="6" isRequired>
              <FormLabel fontSize="sm">Nome completo</FormLabel>
              <Input placeholder="Digite seu nome" />
            </FormControl>
            <FormControl w="35%">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                Data de Nascimento
              </FormLabel>
              <Input placeholder="Select Date and Time" size="md" type="date" />
            </FormControl>
          </Flex>
          {/* Row 3 */}
          <Flex mt="6">
            <FormControl w="50%" mr="6">
              <FormLabel fontSize="sm">Telefone</FormLabel>
              <Input placeholder="Telefone" />
            </FormControl>
            <FormControl w="50%">
              <FormLabel fontSize="sm">Celular 1</FormLabel>
              <Input placeholder="Celular 1" />
            </FormControl>
          </Flex>
          {/* Row 4 */}
          <Flex mt="6">
            <FormControl w="50%" mr="6">
              <FormLabel fontSize="sm">Celular 2</FormLabel>
              <Input placeholder="Celular 2" />
            </FormControl>
            <FormControl w="50%">
              <FormLabel fontSize="sm">RG / IE</FormLabel>
              <Input placeholder="RG" />
            </FormControl>
          </Flex>
          {/* Row 5 */}
          <Flex mt="6">
            <FormControl w="50%" mr="6">
              <FormLabel fontSize="sm">CPF</FormLabel>
              <Input placeholder="CPF" />
            </FormControl>
            <FormControl w="50%">
              <FormLabel fontSize="sm">E-mail</FormLabel>
              <Input placeholder="Email" />
            </FormControl>
          </Flex>
          {/* Row 6 */}
          <Flex mt="6">
            <FormControl w="50%" mr="6">
              <FormLabel fontSize="sm">Profissão</FormLabel>
              <Input placeholder="Profissão" />
            </FormControl>
            <FormControl w="50%">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                Estado Civil
              </FormLabel>
              <Input placeholder="Estado Civil" />
            </FormControl>
          </Flex>
          {/* Row 7 */}
          <Flex mt="7">
            <FormControl w="100%">
              <FormLabel fontSize="sm">A/Cuidados</FormLabel>
              <Input placeholder="A/Cuidados" />
            </FormControl>
          </Flex>
        </Flex>
        {/* Section 2 */}
        <Flex
          w={["100%", "100%", "100%", "50%"]}
          h="100%"
          mt={["8", "8", "8", "0"]}
          ml={["0", "0", "0", "5"]}
          direction="column"
        >
          <Text>Dados residenciais</Text>
          <Divider mb="6" mt="4" />
          {/* Row 1 */}
          <Flex>
            <FormControl w="25%" mr="6">
              <FormLabel fontSize="sm">CEP</FormLabel>
              <Input placeholder="CEP" />
            </FormControl>
            <FormControl w="75%">
              <FormLabel>Logradouro</FormLabel>
              <Input placeholder="Logradouro" />
            </FormControl>
          </Flex>
          {/* Row 2 */}
          <Flex mt="6">
            <FormControl w="32%" mr="6">
              <FormLabel fontSize="sm">Bairro</FormLabel>
              <Input placeholder="Bairro" />
            </FormControl>
            <FormControl w="32%" mr="6">
              <FormLabel fontSize="sm">Cidade</FormLabel>
              <Input placeholder="Cidade" />
            </FormControl>
            <FormControl w="32%">
              <FormLabel fontSize="sm">UF</FormLabel>
              <Input placeholder="UF" />
            </FormControl>
          </Flex>
          {/* Section 3 */}
          <Text mt="8">Dados bancários</Text>
          <Divider mb="6" mt="4" />
          {/* Row 1 */}
          <Flex>
            <FormControl w="32%" mr="6">
              <FormLabel fontSize="sm">Banco</FormLabel>
              <Input placeholder="Banco" />
            </FormControl>
            <FormControl w="32%" mr="6">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                Tipo de Conta
              </FormLabel>
              <Input placeholder="Tipo de Conta" />
            </FormControl>
            <FormControl w="32%">
              <FormLabel fontSize="sm">Agência</FormLabel>
              <Input placeholder="Agência" />
            </FormControl>
          </Flex>
          {/* Row 2 */}
          <Flex mt="6">
            <FormControl w="50%" mr="6">
              <FormLabel fontSize="sm">N° da Conta</FormLabel>
              <Input placeholder="N° da Conta" />
            </FormControl>
            <FormControl w="50%">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                Remessa de Pagamento
              </FormLabel>
              <Input placeholder="Remessa de Pagamento" />
            </FormControl>
          </Flex>
          {/* Submit button */}
          <Flex w="100%" h="100%" justifyContent="flex-end">
            <Button
              mt="10"
              w={150}
              bg="gray.800"
              color="#fff"
              _hover={{ backgroundColor: "gray.900" }}
            >
              Adicionar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Page>
  );
};

export default LocadorRegister;
