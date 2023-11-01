import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Page from "../../components/Page.component";
import GenericTransactionTable from "../../components/tables/GenericTransactionTable.component";
import RentTransactionTable from "../../components/tables/RentTransactionTable";
import { useState } from "react";
import CashierService from "../../services/cashierService";
import { currencyFormatter } from "../../services/formatters";
import PdfViewer from "../../components/modals/ReceiptViewer.component";

const BottomTab = ({
  showCashFlowReport,
  data,
}: {
  showCashFlowReport: () => void;
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
      <Button onClick={showCashFlowReport}>Gerar relatório</Button>
    </Flex>
  );
};

const ViewCashier = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const {
    isOpen: showCashFlowReportIsOpen,
    onOpen: showCashFlowReportOnOpen,
    onClose: showCashFlowReportOnClose,
  } = useDisclosure();

  const [blobPdfLink, setBlobPdfLink] = useState("");

  const [rentTransactionData, setRentTransactionData] = useState<any>([]);
  const [genericTransactionData, setGenericTransactionData] = useState<any>([]);

  const [totalGenericSum, setTotalGenericSum] = useState<{
    credit: number;
    debit: number;
  }>({ credit: 0, debit: 0 });

  const [totalRentSum, setTotalRentSum] = useState<{
    credit: number;
    debit: number;
  }>({ credit: 0, debit: 0 });

  const [cashierSelectedIdToLoad, setCashierSelectedIdToLoad] =
    useState<number>();
  const [cashiers, setCashiers] = useState<any[]>([]);

  const handleChangeDate = async ({ date }: { date: any }) => {
    setCashierSelectedIdToLoad(0);
    setCashiers(await CashierService.getCashiersClosedByDate(date));
  };

  const loadCashier = async () => {
    const rentTransactions = await CashierService.Transaction.getAll({
      category: "rent",
      allRelations: true,
      cashierId: cashierSelectedIdToLoad,
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

    const genericTransactions = await CashierService.Transaction.getAll({
      category: "generic",
      allRelations: true,
      cashierId: cashierSelectedIdToLoad,
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
  };

  const showCashFlowReport = () => {
    if (!cashierSelectedIdToLoad) return;

    showCashFlowReportOnOpen();

    CashierService.cashFlowReport({
      cashierId: cashierSelectedIdToLoad,
    }).then((value) => {
      const blob = new Blob([value.data], { type: "application/pdf" });
      setBlobPdfLink(window.URL.createObjectURL(blob));
    });
  };

  return (
    <Page
      menuGroup="Caixa"
      title="Visualizar"
      direction="column"
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
        shadow="sm"
        gap="1"
      >
        <Flex gap="2" padding={2} justifyContent="space-between">
          <Flex gap="2">
            <InputGroup width="220px" size="md">
              <InputLeftAddon>Data</InputLeftAddon>
              <Input
                type="date"
                onChange={(value: any) =>
                  handleChangeDate({ date: value?.target?.value })
                }
              />
            </InputGroup>
            <Select
              w="190px"
              placeholder="Horários"
              onChange={(e) => setCashierSelectedIdToLoad(+e?.target?.value)}
            >
              {cashiers.map((cashier) => (
                <option value={cashier.id}>{cashier.name}</option>
              ))}
            </Select>
          </Flex>
          <Button onClick={loadCashier} disabled={!cashierSelectedIdToLoad}>
            Carregar
          </Button>
        </Flex>
      </Flex>
      <Flex
        w="100%"
        h="auto"
        direction="column"
        bg="#fff"
        p="1"
        borderRadius="lg"
        shadow="md"
        gap="5"
      >
        <Tabs
          w="100%"
          h="100%"
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
              <Flex h="635px">
                <GenericTransactionTable readyData={genericTransactionData} />
              </Flex>
              <BottomTab
                data={totalGenericSum}
                showCashFlowReport={showCashFlowReport}
              />
            </TabPanel>
            <TabPanel w="100%" h="94%" p="0" pt="2px">
              <Flex h="635px">
                <RentTransactionTable data={rentTransactionData} />
              </Flex>
              <BottomTab
                data={totalRentSum}
                showCashFlowReport={showCashFlowReport}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>

      <PdfViewer
        isOpen={showCashFlowReportIsOpen}
        onClose={() => {
          setBlobPdfLink("");
          showCashFlowReportOnClose();
        }}
        isLoading={!(blobPdfLink?.length > 0)}
        content={blobPdfLink}
      />
    </Page>
  );
};

export default ViewCashier;
