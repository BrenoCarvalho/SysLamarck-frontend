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
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import Page from "../components/Page.component";

const ImovelRegister = () => {
  const [iptuPayer, setIptuPayer] = useState("1");
  const [imovelType, setImovelType] = useState("1");

  return (
    <Page title="Cadastro de Imóvel" direction="column">
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
            <FormControl w="100%">
              <FormLabel fontSize="sm">Locador</FormLabel>
              <Select placeholder="Selecionar">
                <option>Exemplo1</option>
                <option>Exemplo2</option>
              </Select>
            </FormControl>
          </Flex>
          {/* Row 2 */}
          <Flex mt="6">
            <FormControl w="40%" marginRight="6">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                Código do imóvel
              </FormLabel>
              <NumberInput max={500} min={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl w="40%">
              <FormLabel fontSize="sm">Tipo do imóvel</FormLabel>
              <Select placeholder="Selecionar">
                <option>Exemplo1</option>
                <option>Exemplo2</option>
              </Select>
            </FormControl>
            <FormControl alignItems="center" w="20%" ml="6">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                DIMOB declarado
              </FormLabel>
              <Switch id="dimobDeclared" size="lg" />
            </FormControl>
          </Flex>
          {/* Row 3 */}
          <Flex mt="6">
            <FormControl alignItems="center" w="100%">
              <FormLabel fontSize="sm" mb="2">
                Pagador do IPTU
              </FormLabel>
              <RadioGroup onChange={setIptuPayer} value={iptuPayer}>
                <Stack direction="row" gap="10">
                  <Radio value="1" size="md">
                    Proprietário
                  </Radio>
                  <Radio value="2" size="md">
                    Imobiliária
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Flex>
          {/* Section 2 */}
          <Text mt="8">Dados residenciais</Text>
          <Divider mb="6" mt="4" />
          {/* Row 1 */}
          <Flex>
            <FormControl w="25%" mr="6">
              <FormLabel fontSize="sm">CEP</FormLabel>
              <Input placeholder="CEP" />
            </FormControl>
            <FormControl w="75%">
              <FormLabel fontSize="sm">Logradouro</FormLabel>
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
          {/* Row 3 */}
          <Flex mt="6">
            <FormControl alignItems="center" w="100%">
              <FormLabel fontSize="sm" mb="2">
                Finalidade do Imóvel
              </FormLabel>
              <RadioGroup onChange={setImovelType} value={imovelType}>
                <Stack direction="row" gap="10">
                  <Radio value="1" size="md">
                    Aluguel
                  </Radio>
                  <Radio value="2" size="md">
                    Venda
                  </Radio>
                  <Radio value="3" size="md">
                    Aluguel / Venda
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Flex>
        </Flex>
        {/* Section 3 */}
        <Flex
          w={["100%", "100%", "100%", "50%"]}
          h="100%"
          mt={["8", "8", "8", "0"]}
          ml={["0", "0", "0", "5"]}
          direction="column"
        >
          <Text>Dados de aluguel</Text>
          <Divider mb="6" mt="4" />
          {/* Row 1 */}
          <Flex>
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">Taxa de locação</FormLabel>
              <Input placeholder="%" />
            </FormControl>
            <FormControl w="100%" mr="6">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                Taxa de administração
              </FormLabel>
              <Input placeholder="%" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel fontSize="sm">Índice</FormLabel>
              <Select placeholder="Selecionar">
                <option>Exemplo1</option>
                <option>Exemplo2</option>
              </Select>
            </FormControl>
          </Flex>
          {/* Row 2 */}
          <Flex mt="6">
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">Reajuste</FormLabel>
              <Select placeholder="Selecionar">
                <option>Exemplo1</option>
                <option>Exemplo2</option>
              </Select>
            </FormControl>
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">Valor integral</FormLabel>
              <Input placeholder="R$" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel fontSize="sm">Valor da locação</FormLabel>
              <Input placeholder="R$" />
            </FormControl>
          </Flex>
          {/* Row 3 */}
          <Flex mt="6">
            <FormControl alignItems="center" w="100%">
              <FormLabel fontSize="sm" htmlFor="vago">
                Vago
              </FormLabel>
              <Switch id="vago" size="lg" />
            </FormControl>
          </Flex>
          {/* Section 4 */}
          <Text mt="7">Dados municipais</Text>
          <Divider mb="6" mt="4" />
          {/* Row 1 */}
          <Flex>
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">Nº de matricula</FormLabel>
              <Input placeholder="Nº de matricula" />
            </FormControl>
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">Código municipal</FormLabel>
              <Input placeholder="Código municipal" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel fontSize="sm">Nº do IPTU</FormLabel>
              <Input placeholder="Nº do IPTU" />
            </FormControl>
          </Flex>
          {/* Row 2 */}
          <Flex mt="6">
            <FormControl w="100%" mr="6">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                Valor do IPTU integral
              </FormLabel>
              <Input placeholder="R$" />
            </FormControl>
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">Nº de parcelas</FormLabel>
              <Input placeholder="Nº de parcelas" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                Valor IPTU parcelado
              </FormLabel>
              <Input placeholder="R$" />
            </FormControl>
          </Flex>
          {/* Row 3 */}
          <Flex mt="6">
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">Instalação EDP</FormLabel>
              <Input placeholder="Instalação EDP" />
            </FormControl>
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">RGI</FormLabel>
              <Input placeholder="RGI" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel fontSize="sm">Fornecimento</FormLabel>
              <Input placeholder="Fornecimento" />
            </FormControl>
          </Flex>
          {/* Row 4 */}
          <Flex mt="6">
            <FormControl w="100%">
              <FormLabel fontSize="sm">Descrição</FormLabel>
              <Input placeholder="" />
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

export default ImovelRegister;
