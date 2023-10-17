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
} from "@chakra-ui/react";
import Page from "../../components/Page.component";
import GenericTransactionTable from "../../components/tables/GenericTransactionTable.component";
import RentTransactionTable from "../../components/tables/RentTransactionTable";
import { useState } from "react";
import CashierService from "../../services/cashierService";

const ViewCashier = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const [rentTransactionData, setRentTransactionData] = useState<any>([]);
  const [genericTransactionData, setGenericTransactionData] = useState<any>([]);

  const [cashierSelectedIdToLoad, setCashierSelectedIdToLoad] =
    useState<number>();
  const [cashiers, setCashiers] = useState<any[]>([]);

  const handleChangeDate = async ({ date }: { date: any }) => {
    setCashierSelectedIdToLoad(0);
    setCashiers(await CashierService.getCashiersClosedByDate(date));
  };

  const loadCashier = async () => {
    setRentTransactionData(
      await CashierService.Transaction.getAll({
        category: "rent",
        allRelations: true,
        cashierId: cashierSelectedIdToLoad,
      })
    );

    setGenericTransactionData(
      await CashierService.Transaction.getAll({
        category: "generic",
        allRelations: true,
        cashierId: cashierSelectedIdToLoad,
      })
    );
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
        h="80vh"
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
            <TabPanel w="100%" h="94%" p="0" pt="2px">
              <GenericTransactionTable readyData={genericTransactionData} />
            </TabPanel>
            <TabPanel w="100%" h="94%" p="0" pt="2px">
              <RentTransactionTable data={rentTransactionData} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Page>
  );
};

export default ViewCashier;
