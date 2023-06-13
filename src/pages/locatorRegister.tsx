import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import BankData from "../components/Forms/Basics/BankData.component";
import Locator from "../components/Forms/Basics/Locator.component";
import PersonalData from "../components/Forms/Basics/PersonalData.component";
import ResidentialData from "../components/Forms/Basics/ResidentialData.component";
import Page from "../components/Page.component";
import LocatorService from "../services/LocatorService";
import Alert from "../components/Modals/Alert.component";

const componentNames = {
  locator: {
    provisionService: "provisionService",
  },
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
  residentialData: {
    cep: "cep",
    address: "address",
    city: "city",
    district: "district",
  },
  bankData: {
    bank: "bank",
    accountType: "accountType",
    agency: "agency",
    accountNumber: "accountNumber",
    paymentRemittance: "paymentRemittance",
  },
};

const LocatorRegister = () => {
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
    provisionService: null,
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
    cep: null,
    city: null,
    district: null,
    propertyNumber: null,
    bank: null,
    accountType: null,
    agency: null,
    accountNumber: null,
    paymentRemittance: null,
  };

  return (
    <Page title="Cadastro de Locador" direction="column">
      {/* Form */}
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          LocatorService.create(values)
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
              gap="7"
            >
              {/* Left Side */}
              <Flex
                w={["100%", "100%", "100%", "50%"]}
                h="100%"
                direction="column"
                gap="7"
              >
                <Locator
                  componentNames={componentNames.locator}
                  handleChange={handleChange}
                  values={values}
                />
                <PersonalData
                  componentNames={componentNames.personalData}
                  handleChange={handleChange}
                  values={values}
                />
              </Flex>
              {/* Right Side */}
              <Flex
                w={["100%", "100%", "100%", "50%"]}
                h="100%"
                direction="column"
                gap="7"
              >
                <ResidentialData
                  fieldList={[1, 2, 3, 4]}
                  componentNames={componentNames.residentialData}
                  handleChange={handleChange}
                  values={values}
                />
                <BankData
                  componentNames={componentNames.bankData}
                  handleChange={handleChange}
                  values={values}
                />

                {/* Submit button */}
                <Flex w="100%" justifyContent="flex-end">
                  <Button type="submit" w={150}>
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
        message={"Locador adicionado com sucesso."}
      />

      <Alert
        onClose={errorDialogOnClose}
        isOpen={errorDialogIsOpen}
        title="Erro!"
        message="Falha ao adicionar locador, verifique os campos e tente novamente."
      />
    </Page>
  );
};

export default LocatorRegister;
