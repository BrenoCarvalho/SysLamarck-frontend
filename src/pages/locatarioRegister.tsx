import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import Guarantor from "../components/Guarantor.component";
import Page from "../components/Page.component";

const LocatarioRegister = () => {
  const [additionalLocatario, setAdditionalLocatario] = useState(false);
  const [contractType, setContractType] = useState("1");
  const [iptuPayment, setIptuPayment] = useState("1");
  const [goal, setGoal] = useState("1");
  const [collectedTax, setCollectedTax] = useState("1");
  let [residentsLenght, setResidentsLenght] = useState<number[]>([]);

  const [bailType, setBailType] = useState("1");
  const [additionalGuarantor, setAdditionalGuarantor] = useState(false);

  return (
    <Page title="Cadastro de Locatário" direction="column">
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
          <Text>Dados do locatário</Text>
          <Divider mb="6" mt="4" />
          {/* Row 1 */}
          <Flex w="100%">
            <FormControl w="100%">
              <FormLabel fontSize="sm">Nome completo</FormLabel>
              <Input placeholder="Digite seu nome" />
            </FormControl>
          </Flex>
          {/* Row 2 */}
          <Flex mt="6">
            <FormControl w="50%" mr="6">
              <FormLabel fontSize="sm">Nacionalidade</FormLabel>
              <Input placeholder="Digite seu nome" />
            </FormControl>
            <FormControl w="50%">
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
              <FormLabel fontSize="sm">Celular</FormLabel>
              <Input placeholder="Celular 1" />
            </FormControl>
          </Flex>
          {/* Row 4 */}
          <Flex mt="6">
            <FormControl w="50%" mr="6">
              <FormLabel fontSize="sm">E-mail</FormLabel>
              <Input placeholder="Email" />
            </FormControl>
            <FormControl w="50%">
              <FormLabel fontSize="sm">RG / IE</FormLabel>
              <Input placeholder="RG" />
            </FormControl>
          </Flex>
          {/* Row 5 */}
          <Flex mt="6">
            <FormControl w="50%" mr="6">
              <FormLabel fontSize="sm">CPF / CNPJ</FormLabel>
              <Input placeholder="CPF / CNPJ" />
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
          {/* Row 6 */}
          <Flex mt="6">
            <FormControl w="50%" mr="6">
              <FormLabel fontSize="sm">Profissão</FormLabel>
              <Input placeholder="Profissão" />
            </FormControl>
            <FormControl w="50%">
              <FormLabel fontSize="sm">Empresa</FormLabel>
              <Input placeholder="Empresa" />
            </FormControl>
          </Flex>
          {/* Row 7 */}
          <Flex mt="6">
            <FormControl w="50%" mr="6">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                Telefone da empresa
              </FormLabel>
              <Input placeholder="Telefone da empresa" />
            </FormControl>
            <FormControl w="50%">
              <FormLabel
                fontSize="sm"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                Endereço de trabalho
              </FormLabel>
              <Input placeholder="Endereço de trabalho" />
            </FormControl>
          </Flex>
          {/* Row 8 */}
          <Flex mt="6" w="100%">
            <FormControl alignItems="center" w="100%">
              <FormLabel fontSize="sm">Locatário adicional</FormLabel>
              <Switch
                size="lg"
                onChange={() => setAdditionalLocatario(!additionalLocatario)}
                value={+additionalLocatario}
              />
            </FormControl>
          </Flex>
          {/* Section 2 */}
          {additionalLocatario ? (
            <>
              <Text mt="6">Locatário adicional</Text>
              <Divider mb="6" mt="4" />
              {/* Row 1 */}
              <Flex w="100%">
                <FormControl w="100%">
                  <FormLabel fontSize="sm">Nome completo</FormLabel>
                  <Input placeholder="Digite seu nome" />
                </FormControl>
              </Flex>
              {/* Row 2 */}
              <Flex mt="6">
                <FormControl w="50%" mr="6">
                  <FormLabel fontSize="sm">Nacionalidade</FormLabel>
                  <Input placeholder="Digite seu nome" />
                </FormControl>
                <FormControl w="50%">
                  <FormLabel
                    fontSize="sm"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >
                    Data de Nascimento
                  </FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                  />
                </FormControl>
              </Flex>
              {/* Row 3 */}
              <Flex mt="6">
                <FormControl w="50%" mr="6">
                  <FormLabel fontSize="sm">Telefone</FormLabel>
                  <Input placeholder="Telefone" />
                </FormControl>
                <FormControl w="50%">
                  <FormLabel fontSize="sm">Celular</FormLabel>
                  <Input placeholder="Celular 1" />
                </FormControl>
              </Flex>
              {/* Row 4 */}
              <Flex mt="6">
                <FormControl w="50%" mr="6">
                  <FormLabel fontSize="sm">E-mail</FormLabel>
                  <Input placeholder="Email" />
                </FormControl>
                <FormControl w="50%">
                  <FormLabel fontSize="sm">RG / IE</FormLabel>
                  <Input placeholder="RG" />
                </FormControl>
              </Flex>
              {/* Row 5 */}
              <Flex mt="6">
                <FormControl w="50%" mr="6">
                  <FormLabel fontSize="sm">CPF / CNPJ</FormLabel>
                  <Input placeholder="CPF / CNPJ" />
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
              {/* Row 6 */}
              <Flex mt="6">
                <FormControl w="50%" mr="6">
                  <FormLabel fontSize="sm">Profissão</FormLabel>
                  <Input placeholder="Profissão" />
                </FormControl>
                <FormControl w="50%">
                  <FormLabel fontSize="sm">Empresa</FormLabel>
                  <Input placeholder="Empresa" />
                </FormControl>
              </Flex>
              {/* Row 7 */}
              <Flex mt="6">
                <FormControl w="50%" mr="6">
                  <FormLabel
                    fontSize="sm"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >
                    Telefone da empresa
                  </FormLabel>
                  <Input placeholder="Telefone da empresa" />
                </FormControl>
                <FormControl w="50%">
                  <FormLabel
                    fontSize="sm"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >
                    Endereço de trabalho
                  </FormLabel>
                  <Input placeholder="Endereço de trabalho" />
                </FormControl>
              </Flex>
            </>
          ) : null}
          <Flex mt="8" mb="4" w="100%">
            <Button
              w="100%"
              bg="gray.800"
              color="#fff"
              _hover={{ backgroundColor: "gray.900" }}
              onClick={() =>
                setResidentsLenght([
                  ...residentsLenght,
                  residentsLenght.length
                    ? residentsLenght[residentsLenght.length - 1] + 1
                    : 1,
                ])
              }
            >
              Adicionar morador
            </Button>
          </Flex>
          {residentsLenght.map((e) => (
            <>
              <Flex mt="6" align="flex-end" w="100%">
                <Text w="100%">Morador {e}</Text>
                <Button
                  size="sm"
                  _hover={{ color: "red.800" }}
                  onClick={() =>
                    setResidentsLenght(
                      residentsLenght.filter((item) => item !== e)
                    )
                  }
                  variant="ghost"
                  fontSize="lg"
                  w="20px"
                  h="20px"
                >
                  X
                </Button>
              </Flex>

              <Divider mb="6" mt="3" />
              {/* Row 1 */}
              <Flex w="100%">
                <FormControl w="100%">
                  <FormLabel fontSize="sm">Nome completo</FormLabel>
                  <Input placeholder="Digite seu nome" />
                </FormControl>
              </Flex>
              {/* Row 2 */}
              <Flex mt="6" w="100%">
                <FormControl w="100%" mr="6">
                  <FormLabel fontSize="sm">RG</FormLabel>
                  <Input placeholder="RG" />
                </FormControl>
                <FormControl w="100%" mr="6">
                  <FormLabel fontSize="sm">CPF</FormLabel>
                  <Input placeholder="CPF" />
                </FormControl>
                <FormControl w="100%">
                  <FormLabel fontSize="sm">Telefone</FormLabel>
                  <Input placeholder="Telefone" />
                </FormControl>
              </Flex>
            </>
          ))}
        </Flex>

        {/* Section 3 */}
        <Flex
          w={["100%", "100%", "100%", "50%"]}
          h="100%"
          mt={["8", "8", "8", "0"]}
          ml={["0", "0", "0", "5"]}
          direction="column"
        >
          <Text>Contrato</Text>
          <Divider mb="6" mt="4" />
          {/* Row 1 */}
          <Flex>
            <FormControl w="100%">
              <FormLabel fontSize="sm">Imóvel</FormLabel>
              <Select placeholder="Selecionar">
                <option>Exemplo1</option>
                <option>Exemplo2</option>
              </Select>
            </FormControl>
          </Flex>
          {/* Row 2 */}
          <Flex mt="6">
            <FormControl alignItems="center" w="100%">
              <FormLabel fontSize="sm" mb="2">
                Tipo de contrato
              </FormLabel>
              <RadioGroup onChange={setContractType} value={contractType}>
                <Stack direction="row" gap="10">
                  <Radio value="1" size="md">
                    Com desconto
                  </Radio>
                  <Radio value="2" size="md">
                    Sem desconto
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Flex>
          {/* Row 3 */}
          <Flex mt="6">
            <FormControl alignItems="center" w="100%">
              <FormLabel fontSize="sm" mb="2">
                Pagamento do IPTU
              </FormLabel>
              <RadioGroup onChange={setIptuPayment} value={iptuPayment}>
                <Stack direction="row" gap="10">
                  <Radio value="1" size="md">
                    Integral
                  </Radio>
                  <Radio value="2" size="md">
                    Parcelado
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Flex>
          {/* Row 4 */}
          <Flex mt="6">
            <FormControl alignItems="center" w="100%">
              <FormLabel fontSize="sm" mb="2">
                Finalidade
              </FormLabel>
              <RadioGroup onChange={setGoal} value={goal}>
                <Stack direction="row" gap="10">
                  <Radio value="1" size="md">
                    Residencial
                  </Radio>
                  <Radio value="2" size="md">
                    Comercial
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Flex>
          {/* Row 5 */}
          <Flex mt="6">
            <FormControl alignItems="center" w="100%">
              <FormLabel fontSize="sm" mb="2">
                Imposto recolhido na fonte
              </FormLabel>
              <RadioGroup onChange={setCollectedTax} value={collectedTax}>
                <Stack direction="row" gap="10">
                  <Radio value="1" size="md">
                    Sim
                  </Radio>
                  <Radio value="2" size="md">
                    Não
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Flex>
          {/* Section 4 */}
          <Text mt="10">Fiança</Text>
          <Divider mb="6" mt="4" />
          {/* Row 1 */}
          <Flex w="100%">
            <FormControl alignItems="center" w="100%">
              <FormLabel fontSize="sm" mb="2">
                Tipo
              </FormLabel>
              <RadioGroup onChange={setBailType} value={bailType}>
                <Stack direction="row" gap="10">
                  <Radio value="1" size="md">
                    Fiador
                  </Radio>
                  <Radio value="2" size="md">
                    Calção
                  </Radio>
                  <Radio value="3" size="md">
                    Seguro Militar
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Flex>
          {bailType === "1" ? (
            <>
              <Guarantor />
              <Flex mt="6" w="100%">
                <FormControl alignItems="center" w="100%">
                  <FormLabel fontSize="sm">Fiador adicional</FormLabel>
                  <Switch
                    size="lg"
                    onChange={() =>
                      setAdditionalGuarantor(!additionalGuarantor)
                    }
                    value={+additionalGuarantor}
                  />
                </FormControl>
              </Flex>
              {additionalGuarantor ? <Guarantor /> : null}
            </>
          ) : null}

          {bailType === "2" ? (
            <>
              <Flex mt="6" w="100%">
                <FormControl w="100%">
                  <FormLabel fontSize="sm">Valor do calção</FormLabel>
                  <Input placeholder="R$" />
                </FormControl>
              </Flex>
            </>
          ) : null}

          {bailType === "3" ? (
            <>
              <Flex mt="6" w="100%">
                <FormControl w="100%">
                  <FormLabel fontSize="sm">Upload do seguro militar</FormLabel>
                  <Button
                    w={150}
                    bg="gray.800"
                    color="#fff"
                    _hover={{ backgroundColor: "gray.900" }}
                  >
                    Upload
                  </Button>
                </FormControl>
              </Flex>
            </>
          ) : null}

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

export default LocatarioRegister;
