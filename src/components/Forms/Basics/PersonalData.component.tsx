import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input as ChakraInput,
} from "@chakra-ui/react";

const Input = ({ title, placeholder = title, ...props }: any) => {
  return (
    <FormControl w="100%">
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

const InputDate = ({ title, width = "100%", ...props }: any) => {
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
      <ChakraInput
        placeholder="Selecione a data"
        size="md"
        type="date"
        {...props}
      />
    </FormControl>
  );
};

const PersonalData = ({
  fieldList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  showHeader = true,
  headerTitle = "Dados pessoais",
  componentNames = {},
  handleChange,
}: {
  fieldList?: number[];
  showHeader?: boolean;
  headerTitle?: string;
  componentNames?: any;
  handleChange?: any;
}) => {
  const fields = [
    <Input
      title="Nome completo"
      name={componentNames.fullName}
      onChange={handleChange}
    />, // 1
    <InputDate
      title="Data de nascimento"
      width="40%"
      name={componentNames.birthDate}
      onChange={handleChange}
    />, // 2
    <Input
      title="RG"
      name={componentNames.rg}
      onChange={handleChange}
      type="number"
    />, // 3
    <Input
      title="CPF"
      name={componentNames.cpf}
      onChange={handleChange}
      type="number"
    />, // 4
    <Input
      title="Nacionalidade"
      name={componentNames.nationality}
      onChange={handleChange}
    />, // 5
    <Input
      title="Estado Civil"
      name={componentNames.maritalStatus}
      onChange={handleChange}
    />, // 6
    <Input
      title="Profissão"
      name={componentNames.profession}
      onChange={handleChange}
    />, // 7
    <Input
      title="E-mail"
      name={componentNames.email}
      onChange={handleChange}
      type="email"
    />, // 8
    <Input
      title="Contato 1"
      name={componentNames.contact1}
      onChange={handleChange}
      type="number"
    />, // 9
    <Input
      title="Contato 2"
      name={componentNames.contact2}
      onChange={handleChange}
      type="number"
    />, // 10
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
