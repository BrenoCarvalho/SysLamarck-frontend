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

const ResidentialData = ({
  fieldList = [1, 2, 3, 4, 5],
  showHeader = true,
  headerTitle = "Dados residenciais",
}: {
  fieldList?: number[];
  showHeader?: boolean;
  headerTitle?: string;
}) => {
  const fields = [
    <Input title="CEP" w="40%" />, // 1
    <Input title="Cidade" />, // 2
    <Input title="Bairro" />, // 3
    <Input title="Logradouro" placeholder="Nº do imóvel" />, // 4
    <Input title="Descrição do Imóvel" />, // 5
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

export default ResidentialData;
