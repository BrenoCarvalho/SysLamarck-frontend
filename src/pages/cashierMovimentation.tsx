import {
  Flex,
  FormControl,
  Input as ChakraInput,
  Button,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import Page from "../components/Page.component";
import CashierMovimentationTable from "../components/Tables/CashierMovimentationTable.component";
import { useState } from "react";
import InputMask from "react-input-mask";
import { Form, Formik } from "formik";
import MovimentationService from "../services/cashier/Movimentation";
import Alert from "../components/Modals/Alert.component";

const Input = ({
  title,
  width = "100%",
  placeholder = title,
  ...props
}: any) => {
  return (
    <FormControl w={width}>
      <ChakraInput as={InputMask} placeholder={placeholder} {...props} />
    </FormControl>
  );
};

const InputDate = ({ title, width = "100%", ...props }: any) => {
  return (
    <FormControl w={width}>
      <ChakraInput
        placeholder="Selecione a data"
        size="md"
        type="date"
        {...props}
      />
    </FormControl>
  );
};

const CashierMovimentation = () => {
  const [selected, setSelected] = useState<any>();

  const [trigger, setTrigger] = useState(0);

  const {
    isOpen: dialogIsOpen,
    onOpen: dialogOnOpen,
    onClose: dialogOnClose,
  } = useDisclosure();

  const [dialogError, setDialogError] = useState<boolean>(false);

  const initialValues = {
    description: null,
    date: null,
    debit: null,
    credit: null,
  };

  return (
    <Page
      title="Movimentações"
      direction="column"
      hScreenSize
      paddingBottom="-2"
      gap="4"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) =>
          MovimentationService.create(values)
            .then(() => {
              setDialogError(false);
            })
            .catch(() => {
              setDialogError(true);
            })
            .finally(() => {
              setTrigger((trigger) => trigger + 1);
              dialogOnOpen();
            })
        }
      >
        {({ handleChange, values }) => (
          <Flex
            w="100%"
            h="100%"
            direction="column"
            bg="#fff"
            p="1"
            borderRadius="lg"
            shadow="lg"
            gap="1"
          >
            <Form>
              <Flex w="100%" h="auto" direction="column" gap="3" padding="5">
                <Input
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  placeholder="Movimentação"
                />
                <Flex width="100%" alignItems="center">
                  <Flex gap="3" width="100%">
                    <InputDate
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      width="20%"
                    />
                    <Input
                      type="number"
                      name="credit"
                      value={values.credit}
                      onChange={handleChange}
                      placeholder="Crédito"
                      width="20%"
                    />
                    <Input
                      type="number"
                      name="debit"
                      value={values.debit}
                      onChange={handleChange}
                      placeholder="Débito"
                      width="20%"
                    />
                  </Flex>
                  <Button width="220px" type="submit">
                    Salvar lançamento
                  </Button>
                </Flex>
              </Flex>
              <Flex
                w="100%"
                justifyContent="center"
                marginBottom="20px"
                marginTop="5px"
              >
                <Divider w="80%" />
              </Flex>
            </Form>
            <CashierMovimentationTable
              setSelected={setSelected}
              refreshTrigger={trigger}
            />
          </Flex>
        )}
      </Formik>

      <Alert
        onClose={dialogOnClose}
        isOpen={dialogIsOpen}
        title={dialogError ? "Erro!" : "Sucesso!"}
        message={
          dialogError
            ? "Falha ao criar movimentação, verifique os campos e tente novamente."
            : "Movimentação adicionada com sucesso."
        }
      />
    </Page>
  );
};

export default CashierMovimentation;
