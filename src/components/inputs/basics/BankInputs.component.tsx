import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input as ChakraInput,
} from "@chakra-ui/react";

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

const BankInputs = ({
  fieldList = [1, 2, 3, 4, 5],
  showHeader = true,
  headerTitle = "Dados bancários",
  componentNames = {},
  handleChange,
  values,
}: {
  fieldList?: number[];
  showHeader?: boolean;
  headerTitle?: string;
  componentNames?: any;
  handleChange?: any;
  values?: any;
}) => {
  const fields = [
    <Input
      title="Banco"
      name={componentNames.bank}
      onChange={handleChange}
      value={values?.bank}
    />, // 1
    <Input
      title="Tipo de conta"
      name={componentNames.accountType}
      onChange={handleChange}
      value={values?.accountType}
    />, // 2
    <Input
      title="Agência"
      name={componentNames.agency}
      onChange={handleChange}
      value={values?.agency}
    />, // 3
    <Input
      title="Nº da conta"
      name={componentNames.accountNumber}
      onChange={handleChange}
      value={values?.accountNumber}
    />, // 4
    <Input
      title="Remessa de pagamento"
      name={componentNames.paymentRemittance}
      onChange={handleChange}
      value={values?.paymentRemittance}
    />, // 5
  ];

  return (
    <FormControl>
      {showHeader ? (
        <>
          <FormLabel>{headerTitle}</FormLabel>
          <Divider mb="6" mt="4" />
        </>
      ) : null}

      <Flex gap={6} direction="column">
        {fieldList.map((value: number, index: number) => {
          return index % 2 === 0 ? (
            <Flex gap="6">
              {fields[fieldList[index] - 1]}
              {fields[fieldList[index + 1] - 1]}
            </Flex>
          ) : null;
        })}
      </Flex>
    </FormControl>
  );
};

export default BankInputs;
