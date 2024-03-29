import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Radio,
  RadioGroup,
  Stack,
  Switch,
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

const RentOrSaleInputs = ({
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
  const [mode, setMode] = useState("0");

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
      onChange={(value: any) => {
        handleChange(componentNames.integralValue)(value?.target?.value);
        handleChange(componentNames.leaseAmount)(
          `${values ? Math.round(Number(value?.target?.value) * 0.9) : null}`
        );
      }}
      value={values?.integralValue}
    />, // 3
    <Input
      title="Valor locação"
      name={componentNames?.leaseAmount}
      onChange={handleChange}
      value={
        values ? Math.round(values[componentNames?.integralValue] * 0.9) : null
      }
    />, // 4
    <Input
      title="Valor de venda"
      name={componentNames?.sellValue}
      onChange={handleChange}
      value={values?.sellValue}
    />, // 5
    <FormControl>
      <FormLabel fontSize="sm">Vago</FormLabel>
      <Switch
        onChange={handleChange}
        value={+values?.vacant}
        name={componentNames?.vacant}
        isChecked={values?.vacant}
      />
    </FormControl>, // 6
  ];

  const modesNames = ["Aluguel", "Venda", "Aluguel e Venda"];
  const fieldListModes = [[1, 2, 3, 4, 6], [5], [1, 2, 3, 4, 5, 6]];

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
        onChange={(value: any) => {
          setMode(value);
          handleChange(componentNames?.goalOfProperty)(
            modesNames[Number(value)]
          );
        }}
        value={mode}
      >
        <Stack direction="row" gap="6">
          <Radio value="0">Aluguel</Radio>
          <Radio value="1">Venda</Radio>
          <Radio value="2">Aluguel e Venda</Radio>
        </Stack>
      </RadioGroup>

      <Flex gap={6} direction="column">
        {fieldListModes[Number(mode)].map((value: number, index: number) => {
          return index % 2 === 0 ? (
            <Flex gap="6">
              {fields[fieldListModes[Number(mode)][index] - 1]}
              {fields[fieldListModes[Number(mode)][index + 1] - 1]}
            </Flex>
          ) : null;
        })}
      </Flex>
    </FormControl>
  );
};

export default RentOrSaleInputs;
