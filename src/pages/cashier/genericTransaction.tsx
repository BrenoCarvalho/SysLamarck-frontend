import {
  Flex,
  FormControl,
  Input as ChakraInput,
  Button,
  Divider,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import Page from "../../components/Page.component";
import GenericTransactionTable from "../../components/tables/GenericTransactionTable.component";
import { useState } from "react";
import InputMask from "react-input-mask";
import Alert from "../../components/modals/Alert.component";
import ConfirmDelete from "../../components/modals/ConfirmDelete.component";
import TransactionService from "../../services/transactionService";

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

const GenericTransaction = () => {
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

  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<any>("");
  const [amount, setAmount] = useState<number>(0);

  const deleteMovimentation = async () => {
    const response = await TransactionService.delete(selected.id);
    if (response === 1) {
      successDeletedDialogOnOpen();
    }
  };

  const createTransaction = async () => {
    if (!description.length || !type.length || !amount) {
      setDialogError(true);
      dialogOnOpen();
      return;
    }

    TransactionService.create({
      description,
      type,
      amount,
      category: "generic",
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

  return (
    <Page
      menuGroup="Caixa"
      title="Movimentações Gerais"
      direction="column"
      hScreenSize
      paddingBottom="-2"
      gap="4"
    >
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
        <Flex w="100%" h="auto" direction="column" gap="3" padding="5">
          <Input
            name="description"
            value={description}
            onChange={(value: any) => setDescription(value?.target?.value)}
            placeholder="Descrição da movimentação"
          />
          <Flex width="100%" alignItems="center">
            <Flex gap="3" width="100%">
              <Select
                w="160px"
                placeholder="Selecionar"
                value={type}
                onChange={(value: any) => setType(value?.target?.value)}
              >
                <option value="credit">Crédito</option>
                <option value="debit">Débito</option>
              </Select>
              <Input
                type="number"
                name="Valor"
                value={amount === 0 ? null : amount}
                onChange={(value: any) => setAmount(value?.target?.value)}
                placeholder="R$ 0,00"
                width="20%"
                disabled={!type}
              />
            </Flex>
            <Button width="220px" onClick={() => createTransaction()}>
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
        <GenericTransactionTable
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
        </Flex>
      </Flex>

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

export default GenericTransaction;
