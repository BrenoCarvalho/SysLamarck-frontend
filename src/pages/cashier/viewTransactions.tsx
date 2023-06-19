import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
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
import TransactionService from "../../services/transactionService";

const TimePicker = ({ title, width = "100%", ...props }: any) => {
  return (
    <InputGroup size="md" w={width}>
      <InputLeftAddon w="73px" justifyContent="center">
        {title}
      </InputLeftAddon>
      <Input type="time" {...props} />
    </InputGroup>
  );
};

const formatDate = (date: string, time: string) => {
  const fullDate = new Date(date);
  if (fullDate.toString() === "Invalid Date") return;

  const splitedTime = time?.split(":");
  fullDate.setDate(fullDate.getDate() + 1);
  fullDate.setHours(Number(splitedTime[0]));
  fullDate.setMinutes(Number(splitedTime[1]));

  return fullDate;
};

const ViewTransactions = () => {
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const [rentTransactionData, setRentTransactionData] = useState<any>([]);
  const [genericTransactionData, setGenericTransactionData] = useState<any>([]);

  const search = async () => {
    const start = formatDate(date, startTime);
    const end = formatDate(date, endTime);

    setRentTransactionData(
      await TransactionService.getTransactions({
        category: "rent",
        start,
        end,
      })
    );

    setGenericTransactionData(
      await TransactionService.getTransactions({
        category: "generic",
        start,
        end,
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
                onChange={(value: any) => setDate(value?.target?.value)}
                value={date}
              />
            </InputGroup>
            <Flex ml="40px" direction="row" gap="1">
              <TimePicker
                title="Inicial"
                width="210px"
                onChange={(value: any) => setStartTime(value?.target?.value)}
                value={startTime}
              />
              <TimePicker
                title="Final "
                width="210px"
                onChange={(value: any) => setEndTime(value?.target?.value)}
                value={endTime}
              />
            </Flex>
          </Flex>
          <Button onClick={search}>Buscar</Button>
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
        <Tabs w="100%" h="100%">
          <TabList>
            <Tab>Movimentações</Tab>
            <Tab>Aluguéis</Tab>
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

export default ViewTransactions;
