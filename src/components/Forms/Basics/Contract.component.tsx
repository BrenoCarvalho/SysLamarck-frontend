import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Switch,
  RadioGroup,
  Stack,
  Radio,
  Select,
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

const SwitchButton = ({ title, width = "100%", ...props }: any) => {
  return (
    <FormControl alignItems="center" mr="6" width={width}>
      <FormLabel fontSize="sm">{title}</FormLabel>
      <Switch {...props} />
    </FormControl>
  );
};

const RadioButton = ({ title, width = "100%", children, ...props }: any) => {
  return (
    <FormControl width={width}>
      <FormLabel fontSize="sm">{title}</FormLabel>
      <RadioGroup {...props}>
        <Stack direction="row" gap="6">
          {children}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

const CustomSelect = ({
  title,
  width = "100%",
  options,
  children,
  ...props
}: any) => {
  console.log(options);
  return (
    <FormControl w={width}>
      <FormLabel fontSize="sm">{title}</FormLabel>
      <Select placeholder="Selecionar" {...props}>
        {options?.map((value: any) => {
          return <option>{value}</option>;
        })}
      </Select>
    </FormControl>
  );
};

const Contract = ({
  fieldList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  showHeader = true,
  headerTitle = "Contrato",
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
    <SwitchButton
      title="Aplicar desconto"
      name={componentNames?.applyDiscount}
      onChange={handleChange}
      value={values?.applyDiscount}
    />, // 1
    <SwitchButton
      title="Imposto recolhido na fonte"
      name={componentNames?.collectedTax}
      onChange={handleChange}
      value={values?.collectedTax}
    />, // 2
    <RadioButton
      title="Finalidade"
      name={componentNames?.IPTUpayment}
      onChange={handleChange}
      value={values?.IPTUpayment}
    >
      <Radio value="Residencial">Residencial</Radio>
      <Radio value="Comercial">Comercial</Radio>
    </RadioButton>, // 3
    <RadioButton
      title="Pagamento IPTU"
      name={componentNames?.IPTUpayment}
      onChange={handleChange}
      value={values?.IPTUpayment}
    >
      <Radio value="Integral">Integral</Radio>
      <Radio value="Parcelado">Parcelado</Radio>
    </RadioButton>, // 4
    <CustomSelect
      title="Índice"
      options={["IGP-M(FGV)", "IGP(FGV)", "INPC(IBGE)", "IPCA(IBGE)"]}
      name={componentNames?.index}
      onChange={handleChange}
      value={values?.index}
    />, // 5
    <CustomSelect
      title="Reajuste"
      options={["Anual", "Mensal", "Trimestral", "Quadrimestral", "Semestral"]}
      name={componentNames?.adjustment}
      onChange={handleChange}
      value={values?.adjustment}
    />, // 6
    <Input
      title="Valor Integral"
      name={componentNames.fullValue}
      onChange={handleChange}
      value={values?.fullValue}
    />, // 7
    <Input
      title="Valor Locação"
      name={componentNames.leaseValue}
      onChange={handleChange}
      value={values?.leaseValue}
    />, // 8
    <InputDate
      title="Duração do contrato"
      name={componentNames.contractDuration}
      onChange={handleChange}
      value={values?.contractDuration}
    />, // 9
    <InputDate
      title="Data de Início do Contrato"
      name={componentNames.startContractDate}
      onChange={handleChange}
      value={values?.startContractDate}
    />, // 10
    <InputDate
      title="Data de término do Contrato"
      name={componentNames.endContractDate}
      onChange={handleChange}
      value={values?.endContractDate}
    />, // 11
    <Input
      title="Dia de pagamento"
      name={componentNames.payday}
      onChange={handleChange}
      value={values?.payday}
    />, // 12
    <InputDate
      title="Primeiro pagamento"
      name={componentNames.firstPayment}
      onChange={handleChange}
      value={values?.firstPayment}
    />, // 13
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

export default Contract;
