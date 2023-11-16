import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input as ChakraInput,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";

const Input = ({
  title,
  placeholder = title,
  isRequired = false,
  ...props
}: any) => {
  return (
    <FormControl w="100%" isRequired={isRequired}>
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

const DateInput = ({ title, width = "100%", ...props }: any) => {
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

interface PersonalInputsProps {
  fieldList?: number[];
  requiredFields?: number[];
  showHeader?: boolean;
  headerTitle?: string;
  componentNames?: any;
  handleChange?: any;
  values?: any;
}

const PersonalInputs = ({
  fieldList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  requiredFields = [],
  showHeader = true,
  headerTitle = "Dados pessoais",
  componentNames = {},
  handleChange,
  values,
}: PersonalInputsProps) => {
  console.log();
  const fields = [
    <Input
      title="Nome completo"
      name={componentNames?.fullName}
      onChange={handleChange}
      value={values ? values[componentNames?.fullName] : null}
      isRequired={requiredFields.includes(1) ?? false}
    />, // 1
    <DateInput
      title="Data de nascimento"
      width="40%"
      name={componentNames?.birthDate}
      onChange={handleChange}
      value={values ? values[componentNames?.birthDate] : null}
      isRequired={requiredFields.includes(2) ?? false}
    />, // 2
    <Input
      title="RG"
      name={componentNames?.rg}
      onChange={handleChange}
      value={values ? values[componentNames?.rg] : null}
      isRequired={requiredFields.includes(3) ?? false}
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
      isRequired={requiredFields.includes(4) ?? false}
    />, // 4
    <Input
      title="Nacionalidade"
      name={componentNames?.nationality}
      onChange={handleChange}
      value={values ? values[componentNames?.nationality] : null}
      isRequired={requiredFields.includes(5) ?? false}
    />, // 5
    <Input
      title="Estado Civil"
      name={componentNames?.maritalStatus}
      onChange={handleChange}
      value={values ? values[componentNames?.maritalStatus] : null}
      isRequired={requiredFields.includes(6) ?? false}
    />, // 6
    <Input
      title="Profissão"
      name={componentNames?.profession}
      onChange={handleChange}
      value={values ? values[componentNames?.profession] : null}
      isRequired={requiredFields.includes(7) ?? false}
    />, // 7
    <Input
      title="E-mail"
      name={componentNames?.email}
      onChange={handleChange}
      type="email"
      value={values ? values[componentNames?.email] : null}
      isRequired={requiredFields.includes(8) ?? false}
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
      isRequired={requiredFields.includes(9) ?? false}
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
      isRequired={requiredFields.includes(10) ?? false}
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

export default PersonalInputs;
