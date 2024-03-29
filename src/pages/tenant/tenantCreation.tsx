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
import { useState } from "react";
import PersonalInputs from "../../components/inputs/basics/PersonalInputs.component";
import GuarantorInputs from "../../components/inputs/GuarantorInputs.component";
import Page from "../../components/Page.component";
import ContractInputs from "../../components/inputs/basics/ContractInputs.component";
import { Form, Formik } from "formik";
import PropertyService from "../../services/propertyService";
import TenantService from "../../services/tenantService";
import Alert from "../../components/modals/Alert.component";
import Residents from "../../components/Residents.component";
import { useNavigate } from "react-router-dom";
import PdfViewer from "../../components/modals/ReceiptViewer.component";
import PropertySelect from "../../components/PropertySelect.component";

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
    start: "start",
    duration: "duration",
    payday: "payday",
    gracePeriod: "gracePeriod",
    installmentsPaid: "installmentsPaid",
    additionalInstallment: "additionalInstallment",
  },
  bail: {
    type: "type",
    escrowValue: "escrowValue",
    warrantyTerm: "warrantyTerm",
    capitalizationTitle: "capitalizationTitle",
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

const TenantCreation = () => {
  const navigate = useNavigate();

  const [initialValues] = useState({
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
    applyDiscount: true,
    withholdingTax: false,
    goal: "Residencial",
    IPTUPayment: "Integral",
    index: null,
    reajust: null,
    integralValue: null,
    leaseAmount: null,
    start: null,
    duration: null,
    payday: null,
    gracePeriod: null,
    installmentsPaid: null,
    additionalInstallment: null,
    type: "Fiador",
    escrowValue: null,
    warrantyTerm: null,
    capitalizationTitle: null,
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
    cepG1: null,
    cityG1: null,
    districtG1: null,
    addressG1: null,
    spouseFullNameG1: null,
    spouseBirthDateG1: null,
    spouseRgG1: null,
    spouseCpfG1: null,
    spouseNationalityG1: null,
    spouseProfessionG1: null,
    spouseContact1G1: null,
    bailPropertyCepG1: null,
    bailPropertyCityG1: null,
    ailPropertyDistrictG1: null,
    BailPropertyAddressG1: null,
    BailPropertyRegistrationNumberG1: null,
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
    spouseFullNameG2: null,
    spouseBirthDateG2: null,
    spouseRgG2: null,
    spouseCpfG2: null,
    spouseNationalityG2: null,
    spouseProfessionG2: null,
    spouseContact1G2: null,
    bailPropertyCepG2: null,
    bailPropertyCityG2: null,
    bailPropertyDistrictG2: null,
    bailPropertyAddressG2: null,
    bailPropertyRegistrationNumberG2: null,
  });

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

  const [tenantId, setTenantId] = useState<number>(1);

  const [additionalRenter, setAdditionalRenter] = useState(false);
  const [residents, setResidents] = useState<any[]>([]);

  const bailTypesName = [
    "Sem fiança",
    "Fiador",
    "Calção",
    "Termo de garantia",
    "Título de capitalização",
  ];
  const [bailType, setBailType] = useState("1");
  const [additionalGuarantor, setAdditionalGuarantor] = useState(false);

  const [propertyStatus, setPropertyStatus] = useState<
    "Imóvel disponível" | "Imóvel indisponível" | "Não identificado"
  >("Não identificado");

  const {
    isOpen: showRegistrationFormIsOpen,
    onOpen: showRegistrationFormOnOpen,
    onClose: showRegistrationFormOnClose,
  } = useDisclosure();

  const [blobPdfLink, setBlobPdfLink] = useState("");

  const getProperty = async (propertyCode: string | null) => {
    const property = await PropertyService.getByPropertyCode(propertyCode);
    return property;
  };

  const updateIntegralValueAndLeaseAmount = (
    property: any,
    handleChange: any
  ) => {
    handleChange("integralValue")(property?.integralValue);
    handleChange("leaseAmount")(
      `${Math.round(Number(property?.integralValue) * 0.9)}`
    );
  };

  const updateProperty = async (propertyCode: string, handleChange: any) => {
    const property = await getProperty(propertyCode);

    if (property) {
      setPropertyStatus(
        property.vacant ? "Imóvel disponível" : "Imóvel indisponível"
      );

      updateIntegralValueAndLeaseAmount(property, handleChange);
    } else {
      setPropertyStatus("Não identificado");
    }
  };

  const showRegistrationForm = () => {
    showRegistrationFormOnOpen();

    TenantService.registrationForm({
      tenantId,
    }).then((value) => {
      const blob = new Blob([value.data], { type: "application/pdf" });
      setBlobPdfLink(window.URL.createObjectURL(blob));
    });
  };

  return (
    <Page menuGroup="Cadastro" title="Locatário" direction="column">
      {/* Container */}
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={async (values) => {
          if (
            propertyStatus !== "Não identificado" &&
            propertyStatus !== "Imóvel indisponível"
          ) {
            TenantService.create({ ...values, residents })
              .then((result) => {
                sucessDialogOnOpen();
                setTenantId(result?.data?.id);
                setPropertyStatus("Imóvel indisponível");
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
                  <FormLabel fontSize="sm">Status: {propertyStatus}</FormLabel>
                  <PropertySelect
                    variant="outline"
                    onUpdatePropertyCode={(propertyCode: string) => {
                      handleChange("propertyCode")(propertyCode);
                      updateProperty(propertyCode, handleChange);
                    }}
                  />
                </FormControl>
                <PersonalInputs
                  componentNames={componentNames.tenant.personalData}
                  requiredFields={[1]}
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
                  <PersonalInputs
                    componentNames={componentNames.tenant.personalDataT2}
                    handleChange={handleChange}
                    values={values}
                  />
                ) : null}

                <ContractInputs
                  requiredFields={[7, 9, 10, 11]}
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
                <Residents residents={residents} setResidents={setResidents} />

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
                      <Radio value="1">Sem fiança</Radio>
                      <Radio value="2">Fiador</Radio>
                      <Radio value="3">Calção</Radio>
                      <Radio value="4">Termo de garantia</Radio>
                      <Radio value="5">Título de capitalização</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                {bailType === "2" ? (
                  <>
                    <GuarantorInputs
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
                      <GuarantorInputs
                        componentNames={componentNames.bail.guarantor2}
                        handleChange={handleChange}
                        values={values}
                      />
                    ) : null}
                  </>
                ) : null}

                {bailType === "3" ? (
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

                {bailType === "4" ? (
                  <>
                    <Flex w="100%">
                      <FormControl w="100%">
                        <FormLabel fontSize="sm">
                          Upload do termo de garantia
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

                {bailType === "5" ? (
                  <>
                    <Flex w="100%">
                      <FormControl w="100%">
                        <FormLabel fontSize="sm">
                          Título de capitalização
                        </FormLabel>
                        <Input
                          placeholder="Título de capitalização"
                          name={componentNames?.bail?.capitalizationTitle}
                          onChange={handleChange}
                          value={
                            values
                              ? values[
                                  componentNames?.bail
                                    ?.capitalizationTitle as keyof object
                                ]
                              : ""
                          }
                        />
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
        onClose={() => {
          sucessDialogOnClose();
          showRegistrationForm();
        }}
        isOpen={sucessDialogIsOpen}
        title="Sucesso!"
        message={
          "Locatário adicionado com sucesso! Clique em fechar para imprimir a ficha de cadastro."
        }
      />

      <Alert
        onClose={errorDialogOnClose}
        isOpen={errorDialogIsOpen}
        title="Erro!"
        message="Falha ao adicionar locatário, verifique os campos e tente novamente."
      />

      <PdfViewer
        isOpen={showRegistrationFormIsOpen}
        onClose={() => {
          setBlobPdfLink("");
          showRegistrationFormOnClose();
          navigate("/consulta/locatario");
        }}
        isLoading={!(blobPdfLink?.length > 0)}
        content={blobPdfLink}
      />
    </Page>
  );
};

export default TenantCreation;
