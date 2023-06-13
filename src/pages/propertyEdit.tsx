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
import { Form, Formik } from "formik";
import ResidentialData from "../components/Forms/Basics/ResidentialData.component";
import Page from "../components/Page.component";
import PropertyService from "../services/PropertyService";
import Alert from "../components/Modals/Alert.component";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RentOrSale from "../components/Forms/Basics/RentOrSaleData.component";
import MunicipalData from "../components/Forms/Basics/MunicipalData.component";
import Immobile from "../components/Forms/Basics/Immobile.component";

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

const PropertyEdit = () => {
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

  useEffect(() => {
    if (!initialValues) {
      PropertyService.get(Number(params.id), true).then((result) => {
        if (result) {
          const data = { locatorId: result?.locator?.id, ...result };
          delete data["locator"];

          setInitialValues(data);
        } else {
          navigate("/cadastro/imovel");
        }
      });
    }
  }, [initialValues, navigate, params.id]);

  return (
    <Page title="Editar Imóvel" direction="column">
      {/* Form */}
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => {
          PropertyService.update(values.id, values)
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
                <Immobile
                  componentNames={componentNames.propertyData}
                  handleChange={handleChange}
                  values={values}
                />
                <ResidentialData
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
                      isChecked={values?.DIMOBDeclaration}
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
                <RentOrSale
                  componentNames={componentNames.rentOrSale}
                  handleChange={handleChange}
                  values={values}
                />
                <MunicipalData
                  componentNames={componentNames.municipalData}
                  handleChange={handleChange}
                  values={values}
                />

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
          navigate("/consulta/imovel");
        }}
        isOpen={sucessDialogIsOpen}
        title="Sucesso!"
        message={"Imóvel editado com sucesso."}
      />

      <Alert
        onClose={errorDialogOnClose}
        isOpen={errorDialogIsOpen}
        title="Erro!"
        message="Falha ao editar imóvel, verifique os campos e tente novamente."
      />
    </Page>
  );
};

export default PropertyEdit;
