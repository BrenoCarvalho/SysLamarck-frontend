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
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PersonalData from "../components/Forms/Basics/PersonalData.component";
import Guarantor from "../components/Forms/Guarantor.component";
import Page from "../components/Page.component";
import Contract from "../components/Forms/Basics/Contract.component";
import { Form, Formik } from "formik";
import PropertyService from "../services/PropertyService";
import InputMask from "react-input-mask";
import TenantService from "../services/TenantService";
import Alert from "../components/Modals/Alert.component";

const componentNames = {
  property: {
    propertyCode: "",
  },
  tenant: {
    personalData: {
      fullName: "fullName",
      birthDate: "birthDate",
      rg: "rg",
      cpf: "cpf",
      nationality: "nationality",
      maritalStatus: "maritalStatus",
      profession: "profession",
      email: "email",
      contact1: "contact1",
      contact2: "contact2",
    },
    personalDataT2: {
      fullName: "fullNameT2",
      birthDate: "birthDateT2",
      rg: "rgT2",
      cpf: "cpfT2",
      nationality: "nationalityT2",
      maritalStatus: "maritalStatusT2",
      profession: "professionT2",
      email: "emailT2",
      contact1: "contact1T2",
      contact2: "contact2T2",
    },
  },
  residents: {},
  contract: {
    applyDiscount: "applyDiscount",
    withholdingTax: "withholdingTax",
    goal: "goal",
    IPTUPayment: "IPTUPayment",
    index: "index",
    reajust: "reajust",
    integralValue: "integralValue",
    leaseAmount: "leaseAmount",
    duration: "duration",
    payday: "payday",
    start: "start",
    end: "end",
    firstPayment: "firstPayment",
  },
  bail: {
    type: "type",
    escrowValue: "escrowValue",
    militaryInsurance: "militaryInsurance",
    guarantor: {
      personalData: {
        fullName: "fullNameG1",
        birthDate: "birthDateG1",
        rg: "rgG1",
        cpf: "cpfG1",
        nationality: "nationalityG1",
        maritalStatus: "maritalStatusG1",
        profession: "professionG1",
        email: "emailG1",
        contact1: "contact1G1",
        contact2: "contact2G1",
      },
      residentialData: {
        cep: "cep",
        city: "city",
        district: "district",
        address: "address",
      },
      spouse: {
        personalData: {
          fullName: "SpouseFullName",
          birthDate: "SpouseBirthDate",
          rg: "SpouseRg",
          cpf: "SpouseCpf",
          nationality: "SpouseNationality",
          profession: "SpouseProfession",
          contact1: "SpouseContact1",
        },
      },
      propertyBail: {
        residentialData: {
          cep: "BailPropertyCep",
          city: "BailPropertyCity",
          district: "BailPropertyDistrict",
          address: "BailPropertyAddress",
        },
        municipalData: {
          registrationNumber: "BailPropertyRegistrationNumber",
        },
      },
    },
    guarantor2: {
      personalData: {
        fullName: "fullNameG2",
        birthDate: "birthDateG2",
        rg: "rgG2",
        cpf: "cpfG2",
        nationality: "nationalityG2",
        maritalStatus: "maritalStatusG2",
        profession: "professionG2",
        email: "emailG2",
        contact1: "contact1G2",
        contact2: "contact2G2",
      },
      residentialData: {
        cep: "cepG2",
        city: "cityG2",
        district: "districtG2",
        address: "addressG2",
      },
      spouse: {
        personalData: {
          fullName: "SpouseFullNameG2",
          birthDate: "SpouseBirthDateG2",
          rg: "SpouseRgG2",
          cpf: "SpouseCpfG2",
          nationality: "SpouseNationalityG2",
          profession: "SpouseProfessionG2",
          contact1: "SpouseContact1G2",
        },
      },
      propertyBail: {
        residentialData: {
          cep: "BailPropertyCepG2",
          city: "BailPropertyCityG2",
          district: "BailPropertyDistrictG2",
          address: "BailPropertyAddressG2",
        },
        municipalData: {
          registrationNumber: "BailPropertyRegistrationNumberG2",
        },
      },
    },
  },
};

const formatData = (data: any): object => {
  return {
    propertyId: data?.propertyId,
    propertyCode: data?.propertyCode,
    fullName: data?.fullName,
    birthDate: data?.birthDate,
    rg: data?.rg,
    cpf: data?.cpf,
    nationality: data?.nationality,
    maritalStatus: data?.maritalStatus,
    profession: data?.profession,
    email: data?.email,
    contact1: data?.contact1,
    contact2: data?.contact2,
    fullNameT2: data?.fullNameT2,
    birthDateT2: data?.birthDateT2,
    rgT2: data?.rgT2,
    cpfT2: data?.cpfT2,
    nationalityT2: data?.nationalityT2,
    maritalStatusT2: data?.maritalStatusT2,
    professionT2: data?.professionT2,
    emailT2: data?.emailT2,
    contact1T2: data?.contact1T2,
    contact2T2: data?.contact2T2,
    residents: null,
    contract: {
      applyDiscount: data?.applyDiscount,
      withholdingTax: data?.withholdingTax,
      goal: data?.goal,
      IPTUPayment: data?.IPTUPayment,
      index: data?.index,
      reajust: data?.reajust,
      integralValue: data?.integralValue,
      leaseAmount: data?.leaseAmount,
      duration: data?.duration,
      payday: data?.payday,
      start: data?.start,
      end: data?.end,
      firstPayment: data?.firstPayment,
    },
    bail: {
      type: data?.type,
      escrowValue: data?.escrowValue,
      militaryInsurance: data?.militaryInsurance,
      fullNameG1: data?.fullNameG1,
      birthDateG1: data?.birthDateG1,
      rgG1: data?.rgG1,
      cpfG1: data?.cpfG1,
      nationalityG1: data?.nationalityG1,
      maritalStatusG1: data?.maritalStatusG1,
      professionG1: data?.professionG1,
      emailG1: data?.emailG1,
      contact1G1: data?.contact1G1,
      contact2G1: data?.contact2G1,
      cep: data?.cep,
      city: data?.city,
      district: data?.district,
      address: data?.address,
      SpouseFullName: data?.SpouseFullName,
      SpouseBirthDate: data?.SpouseBirthDate,
      SpouseRg: data?.SpouseRg,
      SpouseCpf: data?.SpouseCpf,
      SpouseNationality: data?.SpouseNationality,
      SpouseProfession: data?.SpouseProfession,
      SpouseContact1: data?.SpouseContact1,
      BailPropertyCep: data?.BailPropertyCep,
      BailPropertyCity: data?.BailPropertyCity,
      BailPropertyDistrict: data?.BailPropertyDistrict,
      BailPropertyAddress: data?.BailPropertyAddress,
      BailPropertyRegistrationNumber: data?.BailPropertyRegistrationNumber,
      fullNameG2: data?.fullNameG2,
      birthDateG2: data?.birthDateG2,
      rgG2: data?.rgG2,
      cpfG2: data?.cpfG2,
      nationalityG2: data?.nationalityG2,
      maritalStatusG2: data?.maritalStatusG2,
      professionG2: data?.professionG2,
      emailG2: data?.emailG2,
      contact1G2: data?.contact1G2,
      contact2G2: data?.contact2G2,
      cepG2: data?.cepG2,
      cityG2: data?.cityG2,
      districtG2: data?.districtG2,
      addressG2: data?.addressG2,
      SpouseFullNameG2: data?.SpouseFullNameG2,
      SpouseBirthDateG2: data?.SpouseBirthDateG2,
      SpouseRgG2: data?.SpouseRgG2,
      SpouseCpfG2: data?.SpouseCpfG2,
      SpouseNationalityG2: data?.SpouseNationalityG2,
      SpouseProfessionG2: data?.SpouseProfessionG2,
      SpouseContact1G2: data?.SpouseContact1G2,
      BailPropertyCepG2: data?.BailPropertyCepG2,
      BailPropertyCityG2: data?.BailPropertyCityG2,
      BailPropertyDistrictG2: data?.BailPropertyDistrictG2,
      BailPropertyAddressG2: data?.BailPropertyAddressG2,
      BailPropertyRegistrationNumberG2: data?.BailPropertyRegistrationNumberG2,
    },
  };
};

const LocatarioRegister = () => {
  const initialValues = {
    propertyId: null,
    propertyCode: null,
    fullName: null,
    birthDate: null,
    rg: null,
    cpf: null,
    nationality: null,
    maritalStatus: null,
    profession: null,
    email: null,
    contact1: null,
    contact2: null,
    fullNameT2: null,
    birthDateT2: null,
    rgT2: null,
    cpfT2: null,
    nationalityT2: null,
    maritalStatusT2: null,
    professionT2: null,
    emailT2: null,
    contact1T2: null,
    contact2T2: null,
    residents: null,
    applyDiscount: false,
    withholdingTax: true,
    goal: "Residencial",
    IPTUPayment: "Integral",
    index: null,
    reajust: null,
    integralValue: null,
    leaseAmount: null,
    duration: null,
    payday: null,
    start: null,
    end: null,
    firstPayment: null,
    type: "Fianca",
    escrowValue: null,
    militaryInsurance: null,
    fullNameG1: null,
    birthDateG1: null,
    rgG1: null,
    cpfG1: null,
    nationalityG1: null,
    maritalStatusG1: null,
    professionG1: null,
    emailG1: null,
    contact1G1: null,
    contact2G1: null,
    cep: null,
    city: null,
    district: null,
    address: null,
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
    fullNameG2: null,
    birthDateG2: null,
    rgG2: null,
    cpfG2: null,
    nationalityG2: null,
    maritalStatusG2: null,
    professionG2: null,
    emailG2: null,
    contact1G2: null,
    contact2G2: null,
    cepG2: null,
    cityG2: null,
    districtG2: null,
    addressG2: null,
    SpouseFullNameG2: null,
    SpouseBirthDateG2: null,
    SpouseRgG2: null,
    SpouseCpfG2: null,
    SpouseNationalityG2: null,
    SpouseProfessionG2: null,
    SpouseContact1G2: null,
    BailPropertyCepG2: null,
    BailPropertyCityG2: null,
    BailPropertyDistrictG2: null,
    BailPropertyAddressG2: null,
    BailPropertyRegistrationNumberG2: null,
  };

  const {
    isOpen: sucessDialogIsOpen,
    onOpen: sucessDialogOnOpen,
    onClose: sucessDialogOnClose,
  } = useDisclosure();

  const {
    isOpen: errorDialogIsOpen,
    onOpen: errorDialogOnOpen,
    onClose: errorDialogOnClose,
  } = useDisclosure();

  const [additionalRenter, setAdditionalRenter] = useState(false);
  const [residentsLenght, setResidentsLenght] = useState<number[]>([]);

  const bailTypesName = ["Fiador", "Calção", "Seguro Militar"];
  const [bailType, setBailType] = useState("1");
  const [additionalGuarantor, setAdditionalGuarantor] = useState(false);

  const [propertyAddress, setPropertyAddress] = useState("Não identificado");

  const getPropertyAddress = async (propertyCode: string | null) => {
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
        onSubmit={async (values) => {
          if (propertyAddress !== "Não identificado") {
            TenantService.create(formatData(values))
              .then(() => {
                sucessDialogOnOpen();
              })
              .catch(() => {
                errorDialogOnOpen();
              });
          } else {
            errorDialogOnOpen();
          }
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
                    as={InputMask}
                    value={values?.propertyCode ? values.propertyCode : ""}
                    onChange={(value) => {
                      const propertyCode = value?.target?.value.replace(
                        "/",
                        ""
                      );
                      handleChange("propertyCode")(propertyCode);
                      updateProperty(propertyCode);
                    }}
                    name="propertyCode"
                    mask="***/***"
                    maskChar={null}
                  />
                </FormControl>
                <PersonalData
                  componentNames={componentNames.tenant.personalData}
                  handleChange={handleChange}
                  values={values}
                />
                <Flex w="100%">
                  <FormControl alignItems="center" w="100%">
                    <FormLabel fontSize="sm">Locatário adicional</FormLabel>
                    <Switch
                      onChange={() => setAdditionalRenter(!additionalRenter)}
                      value={+additionalRenter}
                    />
                  </FormControl>
                </Flex>
                {additionalRenter ? (
                  <PersonalData
                    componentNames={componentNames.tenant.personalDataT2}
                    handleChange={handleChange}
                    values={values}
                  />
                ) : null}
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

                <Contract
                  componentNames={componentNames.contract}
                  handleChange={handleChange}
                  values={values}
                />
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

                  <RadioGroup
                    onChange={(value) => {
                      setBailType(value);
                      handleChange(componentNames?.bail.type)(
                        bailTypesName[Number(value) - 1]
                      );
                    }}
                    value={bailType}
                  >
                    <Stack direction="row" gap="6">
                      <Radio value="1">Fiador</Radio>
                      <Radio value="2">Calção</Radio>
                      <Radio value="3">Seguro Militar</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                {bailType === "1" ? (
                  <>
                    <Guarantor
                      componentNames={componentNames.bail.guarantor}
                      handleChange={handleChange}
                      values={values}
                    />
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
                    {additionalGuarantor ? (
                      <Guarantor
                        componentNames={componentNames.bail.guarantor2}
                        handleChange={handleChange}
                        values={values}
                      />
                    ) : null}
                  </>
                ) : null}

                {bailType === "2" ? (
                  <>
                    <Flex w="100%">
                      <FormControl w="100%">
                        <FormLabel fontSize="sm">Valor do calção</FormLabel>
                        <Input
                          placeholder="R$"
                          name={componentNames?.bail.escrowValue}
                          onChange={handleChange}
                          value={
                            values
                              ? values[
                                  componentNames?.bail
                                    ?.escrowValue as keyof object
                                ]
                              : ""
                          }
                        />
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

      <Alert
        onClose={sucessDialogOnClose}
        isOpen={sucessDialogIsOpen}
        title="Sucesso!"
        message={"Locatário adicionado com sucesso."}
      />

      <Alert
        onClose={errorDialogOnClose}
        isOpen={errorDialogIsOpen}
        title="Erro!"
        message="Falha ao adicionar locatário, verifique os campos e tente novamente."
      />
    </Page>
  );
};

export default LocatarioRegister;
