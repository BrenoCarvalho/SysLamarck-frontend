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
import { Form, Formik } from "formik";
import Page from "../components/Page.component";
import TenantService from "../services/TenantService";
import Alert from "../components/Modals/Alert.component";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PersonalData from "../components/Forms/Basics/PersonalData.component";
import Contract from "../components/Forms/Basics/Contract.component";
import Guarantor from "../components/Forms/Guarantor.component";
import InputMask from "react-input-mask";
import PropertyService from "../services/PropertyService";
import Residents from "../components/residents.component";

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
  residents: [],
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
        cep: "cepG1",
        city: "cityG1",
        district: "districtG1",
        address: "addressG1",
      },
      spouse: {
        personalData: {
          fullName: "spouseFullNameG1",
          birthDate: "spouseBirthDateG1",
          rg: "spouseRgG1",
          cpf: "spouseCpfG1",
          nationality: "spouseNationalityG1",
          profession: "spouseProfessionG1",
          contact1: "spouseContact1G1",
        },
      },
      propertyBail: {
        residentialData: {
          cep: "bailPropertyCepG1",
          city: "bailPropertyCityG1",
          district: "bailPropertyDistrictG1",
          address: "bailPropertyAddressG1",
        },
        municipalData: {
          registrationNumber: "bailPropertyRegistrationNumberG1",
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
          fullName: "spouseFullNameG2",
          birthDate: "spouseBirthDateG2",
          rg: "spouseRgG2",
          cpf: "spouseCpfG2",
          nationality: "spouseNationalityG2",
          profession: "spouseProfessionG2",
          contact1: "spouseContact1G2",
        },
      },
      propertyBail: {
        residentialData: {
          cep: "bailPropertyCepG2",
          city: "bailPropertyCityG2",
          district: "bailPropertyDistrictG2",
          address: "bailPropertyAddressG2",
        },
        municipalData: {
          registrationNumber: "bailPropertyRegistrationNumberG2",
        },
      },
    },
  },
};

const formatData = (data: any) => {
  return {
    tenantCode: data?.tenantCode,
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
    residents: data?.residents,
    applyDiscount: data?.contract?.applyDiscount,
    withholdingTax: data?.contract?.withholdingTax,
    goal: data?.contract?.goal,
    IPTUPayment: data?.contract?.IPTUPayment,
    index: data?.contract?.index,
    reajust: data?.contract?.reajust,
    integralValue: data?.contract?.integralValue,
    leaseAmount: data?.contract?.leaseAmount,
    duration: data?.contract?.duration,
    payday: data?.contract?.payday,
    start: data?.contract?.start,
    end: data?.contract?.end,
    firstPayment: data?.contract?.firstPayment,
    type: data?.bail?.type,
    escrowValue: data?.bail?.escrowValue,
    militaryInsurance: data?.bail?.militaryInsurance,
    fullNameG1: data?.bail?.fullNameG1,
    birthDateG1: data?.bail?.birthDateG1,
    rgG1: data?.bail?.rgG1,
    cpfG1: data?.bail?.cpfG1,
    nationalityG1: data?.bail?.nationalityG1,
    maritalStatusG1: data?.bail?.maritalStatusG1,
    professionG1: data?.bail?.professionG1,
    emailG1: data?.bail?.emailG1,
    contact1G1: data?.bail?.contact1G1,
    contact2G1: data?.bail?.contact2G1,
    cepG1: data?.bail?.cepG1,
    cityG1: data?.bail?.cityG1,
    districtG1: data?.bail?.districtG1,
    addressG1: data?.bail?.addressG1,
    spouseFullNameG1: data?.bail?.spouseFullNameG1,
    spouseBirthDateG1: data?.bail?.spouseBirthDateG1,
    spouseRgG1: data?.bail?.spouseRgG1,
    spouseCpfG1: data?.bail?.spouseCpfG1,
    spouseNationalityG1: data?.bail?.spouseNationalityG1,
    spouseProfessionG1: data?.bail?.spouseProfessionG1,
    spouseContact1G1: data?.bail?.spouseContact1G1,
    bailPropertyCepG1: data?.bail?.bailPropertyCepG1,
    bailPropertyCityG1: data?.bail?.bailPropertyCityG1,
    bailPropertyDistrictG1: data?.bail?.bailPropertyDistrictG1,
    bailPropertyAddressG1: data?.bail?.bailPropertyAddressG1,
    bailPropertyRegistrationNumberG1:
      data?.bail?.bailPropertyRegistrationNumberG1,
    fullNameG2: data?.bail?.fullNameG2,
    birthDateG2: data?.bail?.birthDateG2,
    rgG2: data?.bail?.rgG2,
    cpfG2: data?.bail?.cpfG2,
    nationalityG2: data?.bail?.nationalityG2,
    maritalStatusG2: data?.bail?.maritalStatusG2,
    professionG2: data?.bail?.professionG2,
    emailG2: data?.bail?.emailG2,
    contact1G2: data?.bail?.contact1G2,
    contact2G2: data?.bail?.contact2G2,
    cepG2: data?.bail?.cepG2,
    cityG2: data?.bail?.cityG2,
    districtG2: data?.bail?.districtG2,
    addressG2: data?.bail?.addressG2,
    spouseFullNameG2: data?.bail?.spouseFullNameG2,
    spouseBirthDateG2: data?.bail?.spouseBirthDateG2,
    spouseRgG2: data?.bail?.spouseRgG2,
    spouseCpfG2: data?.bail?.spouseCpfG2,
    spouseNationalityG2: data?.bail?.spouseNationalityG2,
    spouseProfessionG2: data?.bail?.spouseProfessionG2,
    spouseContact1G2: data?.bail?.spouseContact1G2,
    bailPropertyCepG2: data?.bail?.bailPropertyCepG2,
    bailPropertyCityG2: data?.bail?.bailPropertyCityG2,
    bailPropertyDistrictG2: data?.bail?.bailPropertyDistrictG2,
    bailPropertyAddressG2: data?.bail?.bailPropertyAddressG2,
    bailPropertyRegistrationNumberG2:
      data?.bail?.bailPropertyRegistrationNumberG2,
  };
};

const TenantEdit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<any>();

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
  const [residents, setResidents] = useState<any[]>([]);

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
    if (!initialValues) {
      TenantService.get(Number(params.id)).then((result) => {
        if (result) {
          setInitialValues(formatData(result));

          if (result?.residents) {
            setResidents(result?.residents);
          }

          if (result?.fullNameT2) {
            setAdditionalRenter(true);
          }
          setBailType(
            (bailTypesName.indexOf(result?.bail?.type) + 1).toString()
          );
          if (result?.bail?.fullNameG2) {
            setAdditionalGuarantor(true);
          }

          const loadPropertyCode = async () => {
            const address = await getPropertyAddress(result?.propertyCode);
            setPropertyAddress(address ? address : "Não identificado");
          };

          loadPropertyCode();
        } else {
          navigate("/cadastro/locatario");
        }
      });
    }
  }, [additionalRenter, bailTypesName, initialValues, navigate, params.id]);

  return (
    <Page title="Editar locatário" direction="column">
      {/* Form */}
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => {
          if (values?.birthDate === "") values.birthDate = null;
          if (values?.birthDateT2 === "") values.birthDateT2 = null;
          if (values?.birthDateG1 === "") values.birthDateG1 = null;
          if (values?.spouseBirthDateG1 === "") values.spouseBirthDateG1 = null;
          if (values?.birthDateG2 === "") values.birthDateG2 = null;
          if (values?.spouseBirthDateG2 === "") values.spouseBirthDateG2 = null;
          if (values?.start === "") values.start = null;
          if (values?.end === "") values.end = null;
          if (values?.firstPayment === "") values.firstPayment = null;

          TenantService.update(values.tenantCode, { ...values, residents })
            .then(() => {
              sucessDialogOnOpen();
            })
            .catch(() => {
              errorDialogOnOpen();
            });
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
                      isChecked={additionalRenter}
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

                <Residents residents={residents} setResidents={setResidents} />

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
                          isChecked={additionalGuarantor}
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
                    Salvar
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>

      <Alert
        onClose={() => {
          sucessDialogOnClose();
          navigate("/consulta/locatario");
        }}
        isOpen={sucessDialogIsOpen}
        title="Sucesso!"
        message={"Locatário editado com sucesso."}
      />

      <Alert
        onClose={errorDialogOnClose}
        isOpen={errorDialogIsOpen}
        title="Erro!"
        message="Falha ao editar locatário, verifique os campos e tente novamente."
      />
    </Page>
  );
};

export default TenantEdit;
