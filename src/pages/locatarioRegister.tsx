import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import PersonalData from "../components/Forms/Basics/PersonalData.component";
import Guarantor from "../components/Forms/Guarantor.component";
import Page from "../components/Page.component";

const LocatarioRegister = () => {
  let [residentsLenght, setResidentsLenght] = useState<number[]>([]);

  const [bailType, setBailType] = useState("1");
  const [additionalGuarantor, setAdditionalGuarantor] = useState(false);

  return (
    <Page title="Cadastro de Locatário" direction="column">
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
          <PersonalData />
          <Divider />
          <Flex direction="column">
            <Flex w="100%">
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
                    variant="unstyled"
                    fontSize="lg"
                    w="20px"
                    h="20px"
                  >
                    X
                  </Button>
                </Flex>

                <Divider mb="6" mt="3" />
                <PersonalData fieldList={[1, 3, 4, 9]} showHeader={false} />
              </>
            ))}
          </Flex>

          <FormControl>
            <FormLabel>Contrato</FormLabel>
            <Divider mb="6" mt="4" />

            <Flex direction="column" gap="6">
              <Flex>
                <FormControl>
                  <FormLabel fontSize="sm">Aplicar desconto</FormLabel>
                  <Switch />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">
                    Imposto recolhido na fonte
                  </FormLabel>
                  <Switch />
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel fontSize="sm">Finalidade</FormLabel>
                <RadioGroup>
                  <Stack direction="row" gap="6">
                    <Radio value="1">Residencial</Radio>
                    <Radio value="2">Comercial</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Pagamento IPTU</FormLabel>
                <RadioGroup>
                  <Stack direction="row" gap="6">
                    <Radio value="1">Integral</Radio>
                    <Radio value="2">Parcelado</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Flex>
          </FormControl>
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
          <FormControl>
            <Text>Fiança</Text>
            <Divider mb="6" mt="4" />

            <RadioGroup onChange={setBailType} value={bailType}>
              <Stack direction="row" gap="6">
                <Radio value="1">Fiador</Radio>
                <Radio value="2">Calção</Radio>
                <Radio value="3">Seguro Militar</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          {bailType === "1" ? (
            <>
              <Guarantor />
              <Flex w="100%">
                <FormControl alignItems="center" w="100%">
                  <FormLabel fontSize="sm">Fiador adicional</FormLabel>
                  <Switch
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
              <Flex w="100%">
                <FormControl w="100%">
                  <FormLabel fontSize="sm">Valor do calção</FormLabel>
                  <Input placeholder="R$" />
                </FormControl>
              </Flex>
            </>
          ) : null}

          {bailType === "3" ? (
            <>
              <Flex w="100%">
                <FormControl w="100%">
                  <FormLabel fontSize="sm">Upload do seguro militar</FormLabel>
                  <Button
                    w={150}
                    bg="gray.800"
                    color="#fff"
                    _hover={{ backgroundColor: "gray.900" }}
                    size="sm"
                  >
                    Upload
                  </Button>
                </FormControl>
              </Flex>
            </>
          ) : null}

          {/* Submit button */}
          <Flex w="100%" h="100%" justifyContent="flex-end">
            <Button w={150}>Adicionar</Button>
          </Flex>
        </Flex>
      </Flex>
    </Page>
  );
};

export default LocatarioRegister;
