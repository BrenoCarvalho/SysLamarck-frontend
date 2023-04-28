import {
  Flex,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Button,
  Text,
  Divider,
} from "@chakra-ui/react";
import Page from "../components/Page.component";
import CashierMovimentationTable from "../components/Tables/CashierMovimentationTable.component";
import { useState } from "react";
import InputMask from "react-input-mask";

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

  return (
    <Page
      title="Movimentações"
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
          <Input placeholder="Movimentação" />
          <Flex width="100%" alignItems="center">
            <Flex gap="3" width="100%">
              <InputDate width="20%" />
              <Input placeholder="Crédito" width="20%" />
              <Input placeholder="Débito" width="20%" />
            </Flex>
            <Button width="220px">Salvar lançamento</Button>
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
        <CashierMovimentationTable setSelected={setSelected} />
      </Flex>
    </Page>
  );
};

export default CashierMovimentation;
