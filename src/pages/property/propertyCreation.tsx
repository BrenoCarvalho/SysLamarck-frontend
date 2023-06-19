import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import PropertyInputs from "../../components/inputs/basics/PropertyInputs.component";
import MunicipalInputs from "../../components/inputs/basics/MunicipalInputs.component";
import RentOrSaleInputs from "../../components/inputs/basics/RentOrSaleInputs.component";
import ResidentialInputs from "../../components/inputs/basics/ResidentialInputs.component";
import Page from "../../components/Page.component";
import { Form, Formik } from "formik";
import PropertyService from "../../services/propertyService";
import Alert from "../../components/modals/Alert.component";
import { useNavigate } from "react-router-dom";

const componentNames = {
  propertyData: {
    locatorId: "locatorId",
    propertyType: "propertyType",
  },
  residentialData: {
    cep: "cep",
    city: "city",
    district: "district",
    address: "address",
    propertyDescription: "propertyDescription",
    IPTUPayer: "IPTUPayer",
    DIMOBDeclaration: "DIMOBDeclaration",
  },
  rentOrSale: {
    goalOfProperty: "goalOfProperty",
    leaseFee: "leaseFee",
    administrationTax: "administrationTax",
    integralValue: "integralValue",
    leaseAmount: "leaseAmount",
    sellValue: "sellValue",
    vacant: "vacant",
  },
  municipalData: {
    registrationNumber: "registrationNumber",
    cityCode: "cityCode",
    IPTUNumber: "IPTUNumber",
    IntegralIPTUValue: "IntegralIPTUValue",
    numberInstallments: "numberInstallments",
    installmentsIPTUValue: "installmentsIPTUValue",
    edpInstallation: "edpInstallation",
    rgi: "rgi",
    supply: "supply",
  },
};

const PropertyCreation = () => {
  const navigate = useNavigate();

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

  const initialValues = {
    locatorId: "",
    propertyType: "",
    cep: "",
    city: "",
    district: "",
    address: "",
    propertyDescription: "",
    IPTUPayer: "Proprietário",
    DIMOBDeclaration: false,
    goalOfProperty: "Aluguel",
    leaseFee: "",
    administrationTax: "",
    integralValue: "",
    leaseAmount: "",
    sellValue: "",
    vacant: false,
    registrationNumber: "",
    cityCode: "",
    IPTUNumber: "",
    IntegralIPTUValue: "",
    numberInstallments: "",
    installmentsIPTUValue: "",
    edpInstallation: "",
    rgi: "",
    supply: "",
  };

  return (
    <Page menuGroup="Cadastro" title="Imóvel" direction="column">
      {/* Container */}
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          PropertyService.create(values)
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
                <PropertyInputs
                  componentNames={componentNames.propertyData}
                  handleChange={handleChange}
                  values={values}
                />
                <ResidentialInputs
                  componentNames={componentNames.residentialData}
                  handleChange={handleChange}
                  values={values}
                />
                <Flex direction="column" gap="6">
                  <FormControl>
                    <FormLabel fontSize="sm">Pagador do IPTU</FormLabel>
                    <RadioGroup
                      onChange={(value) => handleChange("IPTUPayer")(value)}
                      value={values?.IPTUPayer}
                      name={componentNames?.residentialData?.IPTUPayer}
                    >
                      <Stack direction="row" gap="6">
                        <Radio value="Proprietário">Proprietário</Radio>
                        <Radio value="Imobiliária">Imobiliária</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Declaração DIMOB</FormLabel>
                    <Switch
                      onChange={handleChange}
                      value={+values?.DIMOBDeclaration}
                      name={componentNames?.residentialData?.DIMOBDeclaration}
                    />
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
                <RentOrSaleInputs
                  componentNames={componentNames.rentOrSale}
                  handleChange={handleChange}
                  values={values}
                />
                <MunicipalInputs
                  componentNames={componentNames.municipalData}
                  handleChange={handleChange}
                  values={values}
                />

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
          navigate("/consulta/imovel");
        }}
        isOpen={sucessDialogIsOpen}
        title="Sucesso!"
        message={"Imóvel adicionado com sucesso."}
      />

      <Alert
        onClose={errorDialogOnClose}
        isOpen={errorDialogIsOpen}
        title="Erro!"
        message="Falha ao adicionar imóvel, verifique os campos e tente novamente."
      />
    </Page>
  );
};

export default PropertyCreation;
