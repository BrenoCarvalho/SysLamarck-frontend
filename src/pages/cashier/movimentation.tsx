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
import { useCallback, useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Alert from "../../components/modals/Alert.component";
import CashierService from "../../services/cashierService";
import RentTransactionTable from "../../components/tables/RentTransactionTable";
import CashierControl from "../../components/CashierControl.component";
import { CashierContext } from "../../context/CashierContext";
import ConfirmDialog from "../../components/modals/ConfirmDialog.component";
import TenantService from "../../services/tenantService";
import { currencyFormatter } from "../../services/formatters";

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

  const {
    isOpen: alertToSelectItemDialogIsOpen,
    onOpen: alertToSelectItemDialogOnOpen,
    onClose: alertToSelectItemDialogOnClose,
  } = useDisclosure();

  const [tabIndex, setTabIndex] = useState<number>(0);

  const [dialogError, setDialogError] = useState<boolean>(false);
  const [selectedGenericTransaction, setSelectedGenericTransaction] =
    useState<any>();
  const [selectedRentTransaction, setSelectedRentTransaction] = useState<any>();

  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<any>("");
  const [amount, setAmount] = useState<number>(0);

  const [rentTransactionData, setRentTransactionData] = useState<any>(null);
  const [genericTransactionData, setGenericTransactionData] =
    useState<any>(null);

  const [totalGenericSum, setTotalGenericSum] = useState<{
    credit: number;
    debit: number;
  }>({ credit: 0, debit: 0 });

  const [totalRentSum, setTotalRentSum] = useState<{
    credit: number;
    debit: number;
  }>({ credit: 0, debit: 0 });

  const handleDeleteTransaction = async () => {
    if (tabIndex === 0) {
      const response = await CashierService.Transaction.delete(
        selectedGenericTransaction.id
      );
      if (response === 1) {
        successDeletedDialogOnOpen();
      }
    } else {
      if (!selectedRentTransaction) return;

      if (selectedRentTransaction.type === "credit") {
        TenantService.Contract.Installment.rollbackPayment(
          selectedRentTransaction.installment.contract.tenant.id,
          selectedRentTransaction.installment.id
        ).then(() => successDeletedDialogOnOpen());
      } else {
        TenantService.Contract.Installment.rollbackPaymentTransfer(
          selectedRentTransaction.installment.contract.tenant.id,
          selectedRentTransaction.installment.id
        ).then(() => successDeletedDialogOnOpen());
      }
    }
  };

  const loadRentData = useCallback(async () => {
    const rentTransactions = await CashierService.Transaction.getAll({
      category: "rent",
      cashierId: openedCashier.id,
      allRelations: true,
    });

    setRentTransactionData(rentTransactions);
    setTotalRentSum(
      rentTransactions?.reduce(
        (total, transaction) => {
          return transaction["type"] === "credit"
            ? {
                ...total,
                credit: transaction["amount"] + total.credit,
              }
            : {
                ...total,
                debit: transaction["amount"] + total.debit,
              };
        },
        { credit: 0, debit: 0 }
      )
    );
  }, [openedCashier?.id]);

  const loadGenericData = useCallback(async () => {
    const genericTransactions = await CashierService.Transaction.getAll({
      category: "generic",
      cashierId: openedCashier?.id,
    });

    setGenericTransactionData(genericTransactions);
    setTotalGenericSum(
      genericTransactions?.reduce(
        (total, transaction) => {
          return transaction["type"] === "credit"
            ? {
                ...total,
                credit: transaction["amount"] + total.credit,
              }
            : {
                ...total,
                debit: transaction["amount"] + total.debit,
              };
        },
        { credit: 0, debit: 0 }
      )
    );
  }, [openedCashier?.id]);

  useEffect(() => {
    const loadData = async () => {
      loadRentData();
      loadGenericData();
    };

    if (
      genericTransactionData === null &&
      rentTransactionData === null &&
      openedCashier?.id
    )
      loadData();
  }, [
    genericTransactionData,
    loadGenericData,
    loadRentData,
    openedCashier?.id,
    rentTransactionData,
  ]);

  const createTransaction = async () => {
    if (!description.length || !type.length || !amount) {
      setDialogError(true);
      dialogOnOpen();
      return;
    }

    CashierService.Transaction.create({
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
      .finally(async () => {
        await loadGenericData();
        dialogOnOpen();
      });
  };

  const BottomTab = ({
    selected,
    data,
  }: {
    selected: any;
    data: { credit: number; debit: number };
  }) => {
    return (
      <Flex justifyContent="space-between" padding="10px" align="center">
        <Flex marginTop="10px" marginLeft="10px" gap="25px">
          <Text>
            Entradas:{" "}
            <b>
              {currencyFormatter({
                value: data?.credit ?? 0,
              })}
            </b>
          </Text>
          <Text>
            Saídas:{" "}
            <b>
              {currencyFormatter({
                value: data?.debit ?? 0,
              })}
            </b>
          </Text>
        </Flex>
        <Button
          w={205}
          _hover={{ color: "red.700" }}
          variant="unstyled"
          shadow="md"
          onClick={
            selected
              ? onOpenConfirmDelete
              : () => alertToSelectItemDialogOnOpen()
          }
        >
          Remover transação
        </Button>
      </Flex>
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
                    setSelected={setSelectedGenericTransaction}
                    deleteCallback={
                      tabIndex === 0 && successDeletedDialogIsOpen
                    }
                    readyData={genericTransactionData ?? []}
                  />
                </Flex>
                <BottomTab
                  selected={selectedGenericTransaction}
                  data={totalGenericSum}
                />
              </TabPanel>
              <TabPanel w="100%" h="auto" p="0" pt="2px">
                <Flex w="100%" h="75vh">
                  <RentTransactionTable
                    setSelected={setSelectedRentTransaction}
                    deleteCallback={
                      tabIndex === 1 && successDeletedDialogIsOpen
                    }
                    data={rentTransactionData ?? []}
                  />
                </Flex>
                <BottomTab
                  selected={selectedRentTransaction}
                  data={totalRentSum}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>

          <ConfirmDialog
            isOpen={isOpenConfirmDelete}
            onClose={onCloseConfirmDelete}
            onConfirm={handleDeleteTransaction}
            title="Confirmar exclusão"
            message="Essa será uma ação irreversível. Tem certeza que deseja deletar a movimentação?"
          />

          <Alert
            onClose={async () => {
              successDeletedDialogOnClose();

              if (tabIndex === 0) await loadGenericData();
              else await loadRentData();
            }}
            isOpen={successDeletedDialogIsOpen}
            title="Sucesso!"
            message="Movimentação deletada com sucesso."
          />

          <Alert
            onClose={alertToSelectItemDialogOnClose}
            isOpen={alertToSelectItemDialogIsOpen}
            title="Aviso!"
            message="Nenhuma movimentação selecionada. "
            size="sm"
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
