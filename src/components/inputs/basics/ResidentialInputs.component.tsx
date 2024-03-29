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
      <ChakraInput as={InputMask} placeholder={placeholder} {...props} />
    </FormControl>
  );
};

const ResidentialInputs = ({
  fieldList = [1, 2, 3, 4, 5],
  showHeader = true,
  headerTitle = "Dados residenciais",
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
      title="CEP"
      width="40%"
      name={componentNames?.cep}
      onChange={handleChange}
      value={values ? values[componentNames?.cep] : null}
      mask="*****-***"
      maskChar={null}
    />, // 1
    <Input
      title="Cidade"
      name={componentNames?.city}
      onChange={handleChange}
      value={values ? values[componentNames?.city] : null}
    />, // 2
    <Input
      title="Bairro"
      name={componentNames?.district}
      onChange={handleChange}
      value={values ? values[componentNames?.district] : null}
    />, // 3
    <Input
      title="Endereço"
      name={componentNames?.address}
      onChange={handleChange}
      value={values ? values[componentNames?.address] : null}
    />, // 4
    <Input
      title="Descrição do Imóvel"
      name={componentNames?.propertyDescription}
      onChange={handleChange}
      value={values ? values[componentNames?.propertyDescription] : null}
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

export default ResidentialInputs;
