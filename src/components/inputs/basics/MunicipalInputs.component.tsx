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

const MunicipalInputs = ({
  fieldList = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  showHeader = true,
  headerTitle = "Dados municipais",
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
      title="Nº de matricula"
      name={componentNames?.registrationNumber}
      onChange={handleChange}
      value={values ? values[componentNames?.registrationNumber] : null}
    />, // 1
    <Input
      title="Código Municipal"
      name={componentNames?.cityCode}
      onChange={handleChange}
      value={values ? values[componentNames?.cityCode] : null}
    />, // 2
    <Input
      title="Nº IPTU"
      name={componentNames?.IPTUNumber}
      onChange={handleChange}
      value={values ? values[componentNames?.IPTUNumber] : null}
    />, // 3
    <Input
      title="Valor do IPTU integral"
      name={componentNames?.IntegralIPTUValue}
      onChange={handleChange}
      value={values ? values[componentNames?.IntegralIPTUValue] : null}
    />, // 4
    <Input
      title="Nº de parcelas"
      name={componentNames?.numberInstallments}
      onChange={handleChange}
      value={values ? values[componentNames?.numberInstallments] : null}
    />, // 5
    <Input
      title="Valor IPTU parcelado"
      name={componentNames?.installmentsIPTUValue}
      onChange={handleChange}
      value={values ? values[componentNames?.installmentsIPTUValue] : null}
    />, // 6
    <Input
      title="Instalação EDP"
      name={componentNames?.edpInstallation}
      onChange={handleChange}
      value={values ? values[componentNames?.edpInstallation] : null}
    />, // 7
    <Input
      title="RGI"
      name={componentNames?.rgi}
      onChange={handleChange}
      value={values ? values[componentNames?.rgi] : null}
    />, // 8
    <Input
      title="Fornecimento"
      name={componentNames?.supply}
      onChange={handleChange}
      value={values ? values[componentNames?.supply] : null}
    />, // 9
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

export default MunicipalInputs;
