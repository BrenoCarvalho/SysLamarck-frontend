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

const Input = ({
  title,
  width = "100%",
  placeholder = title,
  ...props
}: any) => {
  return (
    <FormControl w={width}>
      <FormLabel
        fontSize="sm"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {title}
      </FormLabel>
      <ChakraInput placeholder={placeholder} {...props} />
    </FormControl>
  );
};

const RentOrSale = ({
  showHeader = true,
  headerTitle = "Dados para aluguel/venda",
  componentNames = {},
  handleChange,
  values,
}: {
  showHeader?: boolean;
  headerTitle?: string;
  componentNames?: any;
  handleChange?: any;
  values?: any;
}) => {
  const [mode, setMode] = useState(0);

  const fields = [
    <Input
      title="Taxa de locação"
      name={componentNames?.leaseFee}
      onChange={handleChange}
      value={values?.leaseFee}
    />, // 1
    <Input
      title="Taxa de administração"
      name={componentNames?.administrationTax}
      onChange={handleChange}
      value={values?.administrationTax}
    />, // 2
    <Input
      title="Valor Integral"
      name={componentNames?.integralValue}
      onChange={handleChange}
      value={values?.integralValue}
    />, // 3
    <Input
      title="Valor locação"
      name={componentNames?.leaseAmount}
      onChange={handleChange}
      value={values?.leaseAmount}
    />, // 4
    <Input
      title="Valor de venda"
      name={componentNames?.sellValue}
      onChange={handleChange}
      value={values?.sellValue}
    />, // 5
  ];

  const modesNames = ["Aluguel", "Venda", "Aluguel e Venda"];
  const fieldListModes = [[1, 2, 3, 4], [5], [1, 2, 3, 4, 5]];

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
        onChange={(value: string | number) => {
          value = Number(value);

          setMode(value);
          handleChange(componentNames?.goalOfProperty)(modesNames[value]);
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
