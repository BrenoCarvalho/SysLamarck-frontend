import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import BankData from "../components/Forms/Basics/BankData.component";
import Locator from "../components/Forms/Basics/Locator.component";
import PersonalData from "../components/Forms/Basics/PersonalData.component";
import ResidentialData from "../components/Forms/Basics/ResidentialData.component";
import Page from "../components/Page.component";

const componentNames = {
  locator: {
    locatorCode: "locatorCode",
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
    city: "city",
    district: "district",
    propertyNumber: "propertyNumber",
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
  const initialValues = {
    locatorCode: null,
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleChange }) => (
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
                />
                <PersonalData
                  componentNames={componentNames.personalData}
                  handleChange={handleChange}
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
                />
                <BankData
                  componentNames={componentNames.bankData}
                  handleChange={handleChange}
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
    </Page>
  );
};

export default LocatorRegister;
