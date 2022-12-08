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

const MunicipalData = ({
  fieldList = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  showHeader = true,
  headerTitle = "Dados municipais",
}: {
  fieldList?: number[];
  showHeader?: boolean;
  headerTitle?: string;
}) => {
  const fields = [
    <Input title="Nº de matricula" />, // 1
    <Input title="Código Municipal" />, // 2
    <Input title="Nº IPTU" />, // 3
    <Input title="Valor do IPTU integral" />, // 4
    <Input title="Nº de parcelas" />, // 5
    <Input title="Valor IPTU parcelado" />, // 6
    <Input title="Instalação EDP" />, // 7
    <Input title="RGI" />, // 8
    <Input title="Fornecimento" />, // 9
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

export default MunicipalData;
