import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

const Input = ({ title, placeholder = title, ...props }: any) => {
  return (
    <FormControl w="100%" {...props}>
      <FormLabel
        fontSize="sm"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {title}
      </FormLabel>
      <ChakraInput placeholder={placeholder} />
    </FormControl>
  );
};

const InputDate = ({ title, ...props }: any) => {
  return (
    <FormControl w="100%" {...props}>
      <FormLabel
        fontSize="sm"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {title}
      </FormLabel>
      <ChakraInput placeholder="Selecione a data" size="md" type="date" />
    </FormControl>
  );
};

const RentOrSale = ({
  showHeader = true,
  headerTitle = "Dados para aluguel/venda",
}: {
  showHeader?: boolean;
  headerTitle?: string;
}) => {
  const [mode, setMode] = useState(0);

  const fields = [
    <Input title="Taxa de locação" />, // 1
    <Input title="Taxa de administração" />, // 2
    <Input title="Índice" />, // 3
    <Input title="Reajuste" />, // 4
    <Input title="Valor Integral" />, // 5
    <Input title="Valor locação" />, // 6
    <Input title="Valor de venda" />, // 7
    <Input title="Duração do contrato" />, // 8
    <InputDate title="Data de vencimento do contrato" />, // 9
    <InputDate title="Data de início do contrato" />, // 10
    <InputDate title="Data de término do contrato" />, // 11
    <InputDate title="Data de vencimento do pagamento" />, // 12
  ];

  const fieldListModes = [[1, 2, 3, 4, 5, 6], [7], [1, 2, 3, 4, 5, 6, 7]];

  return (
    <FormControl>
      {showHeader ? (
        <>
          <FormLabel>{headerTitle}</FormLabel>
          <Divider mb="6" mt="4" />
        </>
      ) : null}

      <RadioGroup
        mb="6"
        onChange={(value) => {
          setMode(Number(value));
        }}
        value={mode}
      >
        <Stack direction="row" gap="6">
          <Radio value={0}>Aluguel</Radio>
          <Radio value={1}>Venda</Radio>
          <Radio value={2}>Aluguel e Venda</Radio>
        </Stack>
      </RadioGroup>

      <Flex gap={6} direction="column">
        {fieldListModes[mode].map((value: number, index: number) => {
          return index % 2 === 0 ? (
            <Flex gap="6">
              {fields[fieldListModes[mode][index] - 1]}
              {fields[fieldListModes[mode][index + 1] - 1]}
            </Flex>
          ) : null;
        })}
      </Flex>
    </FormControl>
  );
};

export default RentOrSale;
