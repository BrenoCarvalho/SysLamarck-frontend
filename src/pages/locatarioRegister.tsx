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
import { useEffect, useState } from "react";
import PersonalData from "../components/Forms/Basics/PersonalData.component";
import Guarantor from "../components/Forms/Guarantor.component";
import Page from "../components/Page.component";
import Contract from "../components/Forms/Basics/Contract.component";
import { Form, Formik } from "formik";
import PropertyService from "../services/PropertyService";

const LocatarioRegister = () => {
  const initialValues = {
    propertyId: "",
    propertyCode: "001/001",
    fullName: "Breno de Carvalho Belarmino",
    birthDate: "2005-02-22",
    rg: "579088984",
    cpf: "54708474890",
    nationality: "Lorena",
    maritalStatus: "Solteiro",
    profession: "Engenheiro de Software",
    email: "contato@brenocarvalho.com",
    contact1: "12981734151",
    contact2: null,
    T2fullName: null,
    T2birthDate: null,
    T2rg: null,
    T2cpf: null,
    T2nationality: null,
    T2maritalStatus: null,
    T2profession: null,
    T2email: null,
    T2contact1: null,
    T2contact2: null,
    residents: [
      {
        fullName: "Breno 123",
        rg: "57.908.898-4",
        cpf: "547.084.748-90",
        contact1: "12981734151",
      },
      {
        fullName: "Jhon 123",
        rg: "57.908.898-4",
        cpf: "547.084.748-90",
        contact1: "12981734151",
      },
    ],
    contract: {
      applyDiscount: false,
      withholdingTax: true,
      goal: "",
      IPTUPayment: "",
      index: "",
      reajust: "",
      integralValue: "",
      leaseAmount: "",
      duration: "",
      payday: "",
      start: "2005-02-22",
      end: "2005-02-22",
    },
    bail: {
      type: "Fianca",
      escrowValue: null,
      militaryInsurance: "",
      fullName: "Breno de Carvalho Belarmino",
      birthDate: "2005-02-22",
      rg: "579088984",
      cpf: "54708474890",
      nationality: "Lorena",
      maritalStatus: "Solteiro",
      profession: "Engenheiro de Software",
      email: "contato@brenocarvalho.com",
      contact1: "12981734151",
      contact2: null,
      cep: "",
      city: "",
      district: "",
      address: "",
      SpouseFullName: null,
      SpouseBirthDate: null,
      SpouseRg: null,
      SpouseCpf: null,
      SpouseNationality: null,
      SpouseProfession: null,
      SpouseContact1: null,
      BailPropertyCep: null,
      BailPropertyCity: null,
      BailPropertyDistrict: null,
      BailPropertyAddress: null,
      BailPropertyRegistrationNumber: null,
      G2fullName: null,
      G2birthDate: null,
      G2rg: null,
      G2cpf: null,
      G2nationality: null,
      G2maritalStatus: null,
      G2profession: null,
      G2email: null,
      G2contact1: null,
      G2contact2: null,
      G2cep: null,
      G2city: null,
      G2district: null,
      G2address: null,
      G2SpouseFullName: null,
      G2SpouseBirthDate: null,
      G2SpouseRg: null,
      G2SpouseCpf: null,
      G2SpouseNationality: null,
      G2SpouseProfession: null,
      G2SpouseContact1: null,
      G2BailPropertyCep: null,
      G2BailPropertyCity: null,
      G2BailPropertyDistrict: null,
      G2BailPropertyAddress: null,
      G2BailPropertyRegistrationNumber: null,
    },
  };

  const [additionalRenter, setAdditionalRenter] = useState(false);
  const [residentsLenght, setResidentsLenght] = useState<number[]>([]);

  const [bailType, setBailType] = useState("1");
  const [additionalGuarantor, setAdditionalGuarantor] = useState(false);

  const [propertyAddress, setPropertyAddress] = useState("Não identificado");

  const getPropertyAddress = async (propertyCode: string) => {
    const property = await PropertyService.getByPropertyCode(propertyCode);
    return property?.address;
  };

  const updateProperty = async (propertyCode: string) => {
    const propertyAddress = await getPropertyAddress(propertyCode);

    setPropertyAddress(propertyAddress ? propertyAddress : "Não identificado");
  };

  useEffect(() => {
    const updatePropertyAddress = async () => {
      const newPropertyAddress = await getPropertyAddress(
        initialValues?.propertyCode
      );
      if (newPropertyAddress && newPropertyAddress !== propertyAddress) {
        setPropertyAddress(newPropertyAddress);
      }
    };

    updatePropertyAddress();
  }, [initialValues?.propertyCode, propertyAddress]);

  return (
    <Page title="Cadastro de Locatário" direction="column">
      {/* Container */}
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleChange, values }) => (
          <Form>
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
                <FormControl w="100%">
                  <FormLabel fontSize="sm">
                    Imóvel:{" "}
                    {propertyAddress.length >= 39
                      ? `${propertyAddress.substring(0, 36)}...`
                      : propertyAddress}
                  </FormLabel>
                  <Input
                    value={values.propertyCode}
                    onChange={(v) => {
                      handleChange("propertyCode")(v);
                      updateProperty(values.propertyCode);
                    }}
                    name="propertyCode"
                  />
                </FormControl>
                <PersonalData />
                <Flex w="100%">
                  <FormControl alignItems="center" w="100%">
                    <FormLabel fontSize="sm">Locatário adicional</FormLabel>
                    <Switch
                      onChange={() => setAdditionalRenter(!additionalRenter)}
                      value={+additionalRenter}
                    />
                  </FormControl>
                </Flex>
                {additionalRenter ? <PersonalData /> : null}
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
                      <PersonalData
                        fieldList={[1, 3, 4, 9]}
                        showHeader={false}
                      />
                    </>
                  ))}
                </Flex>

                <Contract />
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
                        <FormLabel fontSize="sm">
                          Upload do seguro militar
                        </FormLabel>
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
                  <Button w={150} type="submit">
                    Adicionar
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default LocatarioRegister;
