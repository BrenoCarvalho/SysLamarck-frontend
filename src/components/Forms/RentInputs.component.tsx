import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Flex,
  Text,
  Divider,
  Textarea,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";

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
}: {
  componentNames?: any;
  handleChange?: any;
  values?: any;
  inverted?: boolean;
  title: string;
  fieldList: number[];
}) => {
  const fields = [
    <Input
      title="Água"
      name={componentNames?.water}
      onChange={handleChange}
      value={values ? values[componentNames?.water] : null}
      inverted={inverted}
      placeholder="R$ 0,00"
    />, // 1
    <Input
      title="Luz"
      name={componentNames?.eletricity}
      onChange={handleChange}
      value={values ? values[componentNames?.eletricity] : null}
      inverted={inverted}
      placeholder="R$ 0,00"
    />, // 2
    <Input
      title="IPTU"
      name={componentNames?.iptu}
      onChange={handleChange}
      value={values ? values[componentNames?.iptu] : null}
      inverted={inverted}
      placeholder="R$ 0,00"
    />, // 3
    <Input
      title="Imposto de renda"
      name={componentNames?.incomeTax}
      onChange={handleChange}
      value={values ? values[componentNames?.incomeTax] : null}
      inverted={inverted}
      placeholder="R$ 0,00"
    />, // 4
    <Input
      title="Condomínio"
      name={componentNames?.condominium}
      onChange={handleChange}
      value={values ? values[componentNames?.condominium] : null}
      inverted={inverted}
      placeholder="R$ 0,00"
    />, // 5
    <Input
      title="Desconto especial"
      name={componentNames?.commission}
      onChange={handleChange}
      value={values ? values[componentNames?.commission] : null}
      inverted={inverted}
      placeholder="R$ 0,00"
    />, // 6
    <Input
      title="Aluguel"
      name={componentNames?.rent}
      onChange={handleChange}
      value={values ? values[componentNames?.rent] : null}
      inverted={inverted}
      placeholder="R$ 0,00"
    />, // 7
    <Input
      title="Multa romp. contrato"
      name={componentNames?.breachOfContractFine}
      onChange={handleChange}
      value={values ? values[componentNames?.breachOfContractFine] : null}
      inverted={inverted}
      placeholder="R$ 0,00"
    />, // 8
    <Input
      title="Diversos"
      name={componentNames?.sundry}
      onChange={handleChange}
      value={values ? values[componentNames?.sundry] : null}
      inverted={inverted}
      placeholder="R$ 0,00"
    />, // 9
    <Input
      title="Taxa de administração"
      name={componentNames?.administrationFee}
      onChange={handleChange}
      value={values ? values[componentNames?.administrationFee] : null}
      inverted={inverted}
      disabled
      placeholder="R$ 0,00"
    />, // 10
    <Input
      title="Taxa de locação"
      name={componentNames?.leaseFee}
      onChange={handleChange}
      value={values ? values[componentNames?.leaseFee] : null}
      inverted={inverted}
      placeholder="R$ 0,00"
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
            R$ 0,00
          </Text>
        </Text>
      </Flex>
    </FormControl>
  );
};

export default RentInputs;
