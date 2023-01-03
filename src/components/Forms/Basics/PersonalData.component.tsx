import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input as ChakraInput,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";

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
      <ChakraInput as={InputMask} placeholder={placeholder} {...props} />
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
  values,
}: {
  fieldList?: number[];
  showHeader?: boolean;
  headerTitle?: string;
  componentNames?: any;
  handleChange?: any;
  values?: any;
}) => {
  console.log();
  const fields = [
    <Input
      title="Nome completo"
      name={componentNames?.fullName}
      onChange={handleChange}
      value={values ? values[componentNames?.fullName] : null}
    />, // 1
    <InputDate
      title="Data de nascimento"
      width="40%"
      name={componentNames?.birthDate}
      onChange={handleChange}
      value={values ? values[componentNames?.birthDate] : null}
    />, // 2
    <Input
      title="RG"
      name={componentNames?.rg}
      onChange={handleChange}
      value={values ? values[componentNames?.rg] : null}
    />, // 3
    <Input
      title="CPF / CNPJ"
      name={componentNames?.cpf}
      onChange={handleChange}
      value={values ? values[componentNames?.cpf] : null}
      mask={
        values
          ? values[componentNames?.cpf]?.length <= 14
            ? "***.***.***-*****"
            : "**.***.***/****-**"
          : null
      }
      maskChar={null}
    />, // 4
    <Input
      title="Nacionalidade"
      name={componentNames?.nationality}
      onChange={handleChange}
      value={values ? values[componentNames?.nationality] : null}
    />, // 5
    <Input
      title="Estado Civil"
      name={componentNames?.maritalStatus}
      onChange={handleChange}
      value={values ? values[componentNames?.maritalStatus] : null}
    />, // 6
    <Input
      title="Profissão"
      name={componentNames?.profession}
      onChange={handleChange}
      value={values ? values[componentNames?.profession] : null}
    />, // 7
    <Input
      title="E-mail"
      name={componentNames?.email}
      onChange={handleChange}
      type="email"
      value={values ? values[componentNames?.email] : null}
    />, // 8
    <Input
      title="Contato 1"
      name={componentNames?.contact1}
      onChange={handleChange}
      value={values ? values[componentNames?.contact1] : null}
      mask={
        values
          ? values[componentNames?.contact1]?.length <= 12
            ? "** ****-*****"
            : "** *****-****"
          : null
      }
      maskChar={null}
    />, // 9
    <Input
      title="Contato 2"
      name={componentNames?.contact2}
      onChange={handleChange}
      value={values ? values[componentNames?.contact2] : null}
      mask={
        values
          ? values[componentNames?.contact2]?.length <= 12
            ? "** ****-*****"
            : "** *****-****"
          : null
      }
      maskChar={null}
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
