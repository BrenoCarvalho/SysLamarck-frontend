import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import BankInputs from "../../components/inputs/basics/BankInputs.component";
import LocatorInputs from "../../components/inputs/basics/LocatorInputs.component";
import PersonalInputs from "../../components/inputs/basics/PersonalInputs.component";
import ResidentialInputs from "../../components/inputs/basics/ResidentialInputs.component";
import Page from "../../components/Page.component";
import LocatorService from "../../services/locatorService";
import Alert from "../../components/modals/Alert.component";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    city: "city",
    district: "district",
    address: "address",
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

const LocatorEdit = () => {
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
      LocatorService.get(Number(params.id)).then((result) => {
        if (result) {
          setInitialValues(result);
        } else {
          navigate("/cadastro/locador");
        }
      });
    }
  }, [initialValues, navigate, params.id]);

  return (
    <Page title="Editar Locador" direction="column">
      {/* Form */}
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values) => {
          if (values?.birthDate === "") values.birthDate = null;

          LocatorService.update(values.id, values)
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
                <LocatorInputs
                  componentNames={componentNames.locator}
                  handleChange={handleChange}
                  values={values}
                />
                <PersonalInputs
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
                <ResidentialInputs
                  fieldList={[1, 2, 3, 4]}
                  componentNames={componentNames.residentialData}
                  handleChange={handleChange}
                  values={values}
                />
                <BankInputs
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
