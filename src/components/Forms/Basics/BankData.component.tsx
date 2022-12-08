import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input as ChakraInput,
} from "@chakra-ui/react";

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

const BankData = ({
  fieldList = [1, 2, 3, 4, 5],
  showHeader = true,
  headerTitle = "Dados bancários",
}: {
  fieldList?: number[];
  showHeader?: boolean;
  headerTitle?: string;
}) => {
  const fields = [
    <Input title="Banco" />, // 1
    <Input title="Tipo de conta" />, // 2
    <Input title="Agência" />, // 3
    <Input title="Nº da conta" />, // 4
    <Input title="Remessa de pagamento" />, // 5
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

export default BankData;
