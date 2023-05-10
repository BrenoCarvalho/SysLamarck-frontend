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
import ConfirmDelete from "../components/Modals/ConfirmDelete.component";

interface Movimentation {
  description: string | null;
  date: Date | null;
  debit: number | string | null;
  credit: number | string | null;
}

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
  const {
    isOpen: dialogIsOpen,
    onOpen: dialogOnOpen,
    onClose: dialogOnClose,
  } = useDisclosure();

  const {
    isOpen: isOpenConfirmDelete,
    onOpen: onOpenConfirmDelete,
    onClose: onCloseConfirmDelete,
  } = useDisclosure();

  const {
    isOpen: successDeletedDialogIsOpen,
    onOpen: successDeletedDialogOnOpen,
    onClose: successDeletedDialogOnClose,
  } = useDisclosure();

  const [dialogError, setDialogError] = useState<boolean>(false);
  const [trigger, setTrigger] = useState(0);
  const [selected, setSelected] = useState<any>();

  const deleteMovimentation = async () => {
    const response = await MovimentationService.delete(selected.id);
    if (response === 1) {
      successDeletedDialogOnOpen();
    }
  };

  const createMovimentation = async (values: Movimentation) => {
    MovimentationService.create({
      ...values,
      debit: Number(values.debit),
      credit: Number(values.credit),
    })
      .then(() => {
        setDialogError(false);
      })
      .catch(() => {
        setDialogError(true);
      })
      .finally(() => {
        setTrigger((trigger) => trigger + 1);
        dialogOnOpen();
      });
  };

  const initialValues: Movimentation = {
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
        onSubmit={(values: Movimentation) => createMovimentation(values)}
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
              deleteCallback={successDeletedDialogIsOpen}
              refreshTrigger={trigger}
            />
            <Flex w="100%" padding="3" justifyContent="flex-end" gap="2">
              <Button
                w={150}
                _hover={{ color: "red.700" }}
                variant="unstyled"
                shadow="md"
                onClick={
                  selected
                    ? onOpenConfirmDelete
                    : () => {
                        console.log("Selecione algum locatário");
                      }
                }
              >
                Remover
              </Button>
              <Button width="160px" type="submit">
                Fechar caixa
              </Button>
            </Flex>
          </Flex>
        )}
      </Formik>

      <ConfirmDelete
        isOpen={isOpenConfirmDelete}
        onClose={onCloseConfirmDelete}
        onConfirm={deleteMovimentation}
        message="Tem certeza que deseja deletar a movimentação?"
      />

      <Alert
        onClose={successDeletedDialogOnClose}
        isOpen={successDeletedDialogIsOpen}
        title="Sucesso!"
        message="Movimentação deletada com sucesso."
      />

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
