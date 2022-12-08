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

const PersonalData = ({
  fieldList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  showHeader = true,
  headerTitle = "Dados pessoais",
}: {
  fieldList?: number[];
  showHeader?: boolean;
  headerTitle?: string;
}) => {
  const fields = [
    <Input title="Nome completo" />, // 1
    <InputDate title="Data de nascimento" w="40%" />, // 2
    <Input title="RG" />, // 3
    <Input title="CPF" />, // 4
    <Input title="Nacionalidade" />, // 5
    <Input title="Estado Civil" />, // 6
    <Input title="Profissão" />, // 7
    <Input title="E-mail" />, // 8
    <Input title="Contato 1" />, // 9
    <Input title="Contato 2" />, // 10
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

export default PersonalData;
