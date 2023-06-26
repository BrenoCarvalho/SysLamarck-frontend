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

const ViewCashier = () => {
  const [date, setDate] = useState<string>("");

  const [tabIndex, setTabIndex] = useState<number>(0);

  const [rentTransactionData, setRentTransactionData] = useState<any>([]);
  const [genericTransactionData, seGenericTransactionData] = useState<any>([]);

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
                onChange={(value: any) => setDate(value?.target?.value)}
                value={date}
              />
            </InputGroup>
            <Select w="190px" placeholder="Horários"></Select>
          </Flex>
          <Button onClick={() => {}}>Carregar</Button>
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
              <RentTransactionTable readyData={rentTransactionData} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Page>
  );
};

export default ViewCashier;
