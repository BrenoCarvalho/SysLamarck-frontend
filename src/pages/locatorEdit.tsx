import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import BankData from "../components/Forms/Basics/BankData.component";
import Locator from "../components/Forms/Basics/Locator.component";
import PersonalData from "../components/Forms/Basics/PersonalData.component";
import ResidentialData from "../components/Forms/Basics/ResidentialData.component";
import Page from "../components/Page.component";
import LocatorService from "../services/LocatorService";
import Alert from "../components/Modals/Alert.component";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const LocatorEdit = ({ service }: { service: LocatorService }) => {
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
      service.get(Number(params.id)).then((result) => {
        if (result) {
          setInitialValues(result);
        } else {
          navigate("/cadastro/locador");
        }
      });
    }
  }, [initialValues, navigate, params.id, service]);

  return (
    <Page title="Editar Locador" direction="column">
      {/* Form */}
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => {
          service
            .update(values.locatorCode, values)
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
          navigate("/consulta/locador");
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

export default LocatorEdit;
