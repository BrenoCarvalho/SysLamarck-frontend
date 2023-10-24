import {
  Flex,
  FormControl,
  Input as ChakraInput,
  Button,
  Divider,
  useDisclosure,
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import Page from "../../components/Page.component";
import GenericTransactionTable from "../../components/tables/GenericTransactionTable.component";
import { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Alert from "../../components/modals/Alert.component";
import CashierService from "../../services/cashierService";
import RentTransactionTable from "../../components/tables/RentTransactionTable";
import CashierControl from "../../components/CashierControl.component";
import { CashierContext } from "../../context/CashierContext";
import ConfirmDialog from "../../components/modals/ConfirmDialog.component";

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

const Movimentation = () => {
  const { openedCashier } = useContext(CashierContext);

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

  const [tabIndex, setTabIndex] = useState<number>(0);

  const [dialogError, setDialogError] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();

  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<any>("");
  const [amount, setAmount] = useState<number>(0);

  const [genericTransactionData, setGenericTransactionData] =
    useState<any>(null);

  const deleteMovimentation = async () => {
    const response = await CashierService.Transaction.delete(selected.id);
    if (response === 1) {
      successDeletedDialogOnOpen();
    }
  };

  useEffect(() => {
    const loadGenericTransactionData = async () => {
      setGenericTransactionData(
        await CashierService.Transaction.getAll({
          category: "generic",
          cashierId: openedCashier?.id,
        })
      );
    };

    if (genericTransactionData === null && openedCashier?.id) {
      loadGenericTransactionData();
    }
  }, [genericTransactionData, openedCashier?.id]);

  const createTransaction = async () => {
    if (!description.length || !type.length || !amount) {
      setDialogError(true);
      dialogOnOpen();
      return;
    }

    await CashierService.Transaction.create({
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
        dialogOnOpen();
      });

    setGenericTransactionData(
      await CashierService.Transaction.getAll({
        category: "generic",
        cashierId: openedCashier?.id,
      })
    );
  };

  return (
    <Page
      menuGroup="Caixa"
      title="Movimentações"
      direction="column"
      paddingBottom="-2"
      gap="4"
      rightButton={CashierControl()}
    >
      {!openedCashier ? (
        <Flex
          w="100%"
          h="82vh"
          direction="column"
          bg="#fff"
          p="4"
          borderRadius="lg"
          shadow="lg"
          justifyContent="center"
        >
          <Text
            w="100%"
            fontSize="46px"
            textAlign="center"
            fontWeight="bold"
            color="gray"
          >
            Caixa fechado
          </Text>
        </Flex>
      ) : (
        <Flex
          w="100%"
          h="auto"
          direction="column"
          bg="#fff"
          p="1"
          borderRadius="lg"
          shadow="lg"
          gap="1"
        >
          <Tabs
            w="100%"
            h="auto"
            variant="enclosed"
            colorScheme="none"
            onChange={(index) => setTabIndex(Number(index))}
          >
            <TabList>
              <Tab color={tabIndex === 0 ? "#6f374e" : "black"}>Gerais</Tab>
              <Tab color={tabIndex === 1 ? "#6f374e" : "black"}>Aluguéis</Tab>
            </TabList>

            <TabPanels w="100%" h="100%">
              <TabPanel w="100%" h="auto" p="0" pt="2px">
                <Flex w="100%" h="auto" direction="column" gap="3" padding="5">
                  <Input
                    name="description"
                    value={description}
                    onChange={(value: any) =>
                      setDescription(value?.target?.value)
                    }
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
                        onChange={(value: any) =>
                          setAmount(value?.target?.value)
                        }
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
                <Flex w="100%" h="58vh">
                  <GenericTransactionTable
                    setSelected={setSelected}
                    deleteCallback={successDeletedDialogIsOpen}
                    readyData={genericTransactionData}
                  />
                </Flex>
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
              </TabPanel>
              <TabPanel w="100%" h="auto" p="0" pt="2px">
                <Flex w="100%" h="75vh">
                  <RentTransactionTable cashierId={openedCashier.id} />
                </Flex>
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
              </TabPanel>
            </TabPanels>
          </Tabs>

          <ConfirmDialog
            isOpen={isOpenConfirmDelete}
            onClose={onCloseConfirmDelete}
            onConfirm={deleteMovimentation}
            title="Confirmar exclusão"
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
        </Flex>
      )}
    </Page>
  );
};

export default Movimentation;
