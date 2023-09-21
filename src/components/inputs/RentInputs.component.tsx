import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Flex,
  Text,
  Divider,
  Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";
import InputMask from "react-input-mask";
import { currencyFormatter } from "../../services/formatters";
import CurrencyInput from "react-currency-input-field";

const Input = ({
  currencyInput = false,
  handleChange,
  title,
  name,
  placeholder = title,
  values,
  ...props
}: any) => {
  return (
    <FormControl
      display="flex"
      w="100%"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <FormLabel
        fontSize="sm"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {title}
      </FormLabel>
      <ChakraInput
        as={currencyInput ? CurrencyInput : InputMask}
        size="sm"
        minW="100px"
        w="40%"
        placeholder={currencyInput ? "R$ 0,00" : placeholder}
        onChange={currencyInput ? null : handleChange}
        name={name}
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
        decimalSeparator=","
        groupSeparator="."
        value={values[name]?.toString()?.replaceAll(".", ",") ?? ""}
        onValueChange={
          currencyInput
            ? (value: string | undefined) =>
                handleChange(name)(
                  value?.replaceAll(".", "").replaceAll(",", ".") ?? ""
                )
            : null
        }
        {...props}
      />
    </FormControl>
  );
};

const RentInputs = ({
  componentNames = {},
  fieldList,
  handleChange,
  values,
  inverted,
  title,
  disableComponents = false,
}: {
  componentNames?: any;
  handleChange?: any;
  values?: any;
  inverted?: boolean;
  title: string;
  fieldList: number[];
  disableComponents?: boolean;
}) => {
  useEffect(() => {
    const valuesToSum = [
      values?.water,
      values?.eletricity,
      values?.iptu,
      values?.incomeTax,
      values?.condominium,
      values?.rent,
      values?.sundry,
    ];

    const total = valuesToSum.reduce(
      (total: any, value: any) =>
        Number(value) > 0 ? total + Number(value) : total,
      0
    );

    handleChange(componentNames?.total)(total.toString());
  }, [
    componentNames?.total,
    handleChange,
    values?.water,
    values?.eletricity,
    values?.iptu,
    values?.incomeTax,
    values?.condominium,
    values?.rent,
    values?.sundry,
  ]);

  const fields = [
    <Input
      title="Água"
      name={componentNames?.water}
      handleChange={handleChange}
      currencyInput
      inverted={inverted}
      values={values}
      disabled={disableComponents}
    />, // 1
    <Input
      title="Luz"
      name={componentNames?.eletricity}
      handleChange={handleChange}
      currencyInput
      inverted={inverted}
      values={values}
      disabled={disableComponents}
    />, // 2
    <Input
      title="IPTU"
      name={componentNames?.iptu}
      handleChange={handleChange}
      currencyInput
      inverted={inverted}
      values={values}
      disabled={disableComponents}
    />, // 3
    <Input
      title="Imposto de renda"
      name={componentNames?.incomeTax}
      handleChange={handleChange}
      currencyInput
      inverted={inverted}
      values={values}
      disabled={disableComponents}
    />, // 4
    <Input
      title="Condomínio"
      name={componentNames?.condominium}
      handleChange={handleChange}
      currencyInput
      inverted={inverted}
      values={values}
      disabled={disableComponents}
    />, // 5
    <Input
      title="Desconto especial"
      name={componentNames?.specialDiscount}
      handleChange={handleChange}
      currencyInput
      inverted={inverted}
      values={values}
      disabled={disableComponents}
    />, // 6
    <Input
      title="Aluguel"
      name={componentNames?.rent}
      handleChange={handleChange}
      currencyInput
      inverted={inverted}
      values={values}
      disabled={disableComponents}
    />, // 7
    <Input
      title="Multa romp. contrato"
      name={componentNames?.breachOfContractFine}
      handleChange={handleChange}
      currencyInput
      inverted={inverted}
      values={values}
      disabled={disableComponents}
    />, // 8
    <Input
      title="Diversos"
      name={componentNames?.sundry}
      handleChange={handleChange}
      currencyInput
      inverted={inverted}
      values={values}
      disabled={disableComponents}
    />, // 9
    <Input
      title="Taxa de administração"
      name={componentNames?.administrationFee}
      handleChange={handleChange}
      currencyInput
      inverted={inverted}
      values={values}
      disabled
    />, // 10
    <Input
      title="Taxa de locação"
      name={componentNames?.leaseFee}
      handleChange={handleChange}
      currencyInput
      inverted={inverted}
      values={values}
      disabled={disableComponents}
    />, // 11
  ];

  return (
    <FormControl
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap="8px"
    >
      <Flex flexDirection="column">
        <Text w="100%" fontWeight="semibold" align="center" marginBottom="12px">
          {title}
        </Text>
        <Divider marginBottom="20px" width="100%" />
        <Flex width="auto" flexDirection="column" gap="8px">
          {fieldList.map((value: number, index: number) => fields[value - 1])}
        </Flex>
      </Flex>
      <Flex flexDirection="column" gap="8px">
        <Textarea
          placeholder="Descrição de diversos"
          width="100%"
          height="60px"
          size="sm"
          resize="unset"
          disabled={disableComponents}
          name={componentNames?.sundryDescription}
          onChange={handleChange}
          value={values[componentNames?.sundryDescription] || ""}
        />
        <Text
          fontSize="sm"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          textAlign="center"
        >
          Total {title}
          <Text color="black" fontWeight="bold">
            {currencyFormatter({ value: values[componentNames?.total] ?? 0 })}
          </Text>
        </Text>
      </Flex>
    </FormControl>
  );
};

export default RentInputs;
