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

const Input = ({ title, placeholder = title, ...props }: any) => {
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
        as={InputMask}
        size="sm"
        minW="100px"
        w="40%"
        placeholder={placeholder}
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
      (total: any, value: any) => (value > 0 ? total + value : total),
      0
    );

    handleChange(componentNames?.total)(total.toString());
  }, [componentNames?.total, handleChange, values]);

  const fields = [
    <Input
      title="Água"
      name={componentNames?.water}
      type="number"
      onChange={handleChange}
      value={values[componentNames?.water] || ""}
      inverted={inverted}
      placeholder="R$ 0,00"
      disabled={disableComponents}
    />, // 1
    <Input
      title="Luz"
      name={componentNames?.eletricity}
      type="number"
      onChange={handleChange}
      value={values[componentNames?.eletricity] || ""}
      inverted={inverted}
      placeholder="R$ 0,00"
      disabled={disableComponents}
    />, // 2
    <Input
      title="IPTU"
      name={componentNames?.iptu}
      type="number"
      onChange={handleChange}
      value={values[componentNames?.iptu] || ""}
      inverted={inverted}
      placeholder="R$ 0,00"
      disabled={disableComponents}
    />, // 3
    <Input
      title="Imposto de renda"
      name={componentNames?.incomeTax}
      type="number"
      onChange={handleChange}
      value={values[componentNames?.incomeTax] || ""}
      inverted={inverted}
      placeholder="R$ 0,00"
      disabled={disableComponents}
    />, // 4
    <Input
      title="Condomínio"
      name={componentNames?.condominium}
      type="number"
      onChange={handleChange}
      value={values[componentNames?.condominium] || ""}
      inverted={inverted}
      placeholder="R$ 0,00"
      disabled={disableComponents}
    />, // 5
    <Input
      title="Desconto especial"
      name={componentNames?.specialDiscount}
      type="number"
      onChange={handleChange}
      value={values[componentNames?.specialDiscount] || ""}
      inverted={inverted}
      placeholder="R$ 0,00"
      disabled={disableComponents}
    />, // 6
    <Input
      title="Aluguel"
      name={componentNames?.rent}
      type="number"
      onChange={handleChange}
      value={values[componentNames?.rent] || ""}
      inverted={inverted}
      placeholder="R$ 0,00"
      disabled={disableComponents}
    />, // 7
    <Input
      title="Multa romp. contrato"
      name={componentNames?.breachOfContractFine}
      type="number"
      onChange={handleChange}
      value={values[componentNames?.breachOfContractFine] || ""}
      inverted={inverted}
      placeholder="R$ 0,00"
      disabled={disableComponents}
    />, // 8
    <Input
      title="Diversos"
      name={componentNames?.sundry}
      type="number"
      onChange={handleChange}
      value={values[componentNames?.sundry] || ""}
      inverted={inverted}
      placeholder="R$ 0,00"
      disabled={disableComponents}
    />, // 9
    <Input
      title="Taxa de administração"
      name={componentNames?.administrationFee}
      type="number"
      onChange={handleChange}
      value={values[componentNames?.administrationFee] || ""}
      inverted={inverted}
      disabled
      placeholder="R$ 0,00"
    />, // 10
    <Input
      title="Taxa de locação"
      name={componentNames?.leaseFee}
      type="number"
      onChange={handleChange}
      value={values[componentNames?.leaseFee] || ""}
      inverted={inverted}
      placeholder="R$ 0,00"
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
