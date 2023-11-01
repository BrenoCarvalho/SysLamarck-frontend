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
  return (
    <FormControl w={width}>
      <FormLabel fontSize="sm">{title}</FormLabel>
      <Select {...props}>
        {options?.map((value: any) => {
          return <option>{value}</option>;
        })}
      </Select>
    </FormControl>
  );
};

const ContractInputs = ({
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
      value={values ? values[componentNames?.applyDiscount] : null}
      isChecked={values ? values[componentNames?.applyDiscount] : null}
    />, // 1
    <SwitchButton
      title="Imposto recolhido na fonte"
      name={componentNames?.withholdingTax}
      onChange={handleChange}
      value={values ? values[componentNames?.withholdingTax] : null}
      isChecked={values ? values[componentNames?.withholdingTax] : null}
    />, // 2
    <RadioButton
      title="Finalidade"
      name={componentNames?.goal}
      onChange={(value: any) => handleChange(componentNames?.goal)(value)}
      value={values ? values[componentNames?.goal] : null}
    >
      <Radio value="Residencial">Residencial</Radio>
      <Radio value="Comercial">Comercial</Radio>
    </RadioButton>, // 3
    <RadioButton
      title="Pagamento IPTU"
      name={componentNames?.IPTUPayment}
      onChange={(value: any) =>
        handleChange(componentNames?.IPTUPayment)(value)
      }
      value={values ? values[componentNames?.IPTUPayment] : null}
    >
      <Radio value="Integral">Integral</Radio>
      <Radio value="Parcelado">Parcelado</Radio>
    </RadioButton>, // 4
    <CustomSelect
      title="Índice"
      options={["IGP-M(FGV)", "IGP(FGV)", "INPC(IBGE)", "IPCA(IBGE)"]}
      name={componentNames?.index}
      onChange={handleChange}
      value={values ? values[componentNames?.index] : null}
    />, // 5
    <CustomSelect
      title="Reajuste"
      options={["Anual", "Mensal", "Trimestral", "Quadrimestral", "Semestral"]}
      name={componentNames?.reajust}
      onChange={handleChange}
      value={values ? values[componentNames?.reajust] : null}
    />, // 6
    <Input
      title="Valor Integral"
      name={componentNames.integralValue}
      onChange={(value: any) => {
        handleChange(componentNames.integralValue)(value?.target?.value);
        handleChange(componentNames.leaseAmount)(
          `${values ? Math.round(Number(value?.target?.value) * 0.9) : null}`
        );
      }}
      value={values ? values[componentNames?.integralValue] : null}
      type="number"
    />, // 7
    <Input
      title="Valor Locação"
      name={componentNames.leaseAmount}
      // onChange={handleChange}
      value={
        values ? Math.round(values[componentNames?.integralValue] * 0.9) : null
      }
      type="number"
    />, // 8
    <Input
      title="Duração do contrato"
      name={componentNames.duration}
      onChange={handleChange}
      value={values ? values[componentNames?.duration] : null}
      type="number"
    />, // 9
    <Input
      title="Dia de pagamento"
      name={componentNames.payday}
      onChange={handleChange}
      value={values ? values[componentNames?.payday] : null}
      type="number"
    />, // 10
    <Input
      title="Meses de carência"
      name={componentNames.gracePeriod}
      onChange={handleChange}
      value={values ? values[componentNames?.gracePeriod] : null}
      type="number"
    />, // 11
    <Input
      title="Parcelas pagas"
      name={componentNames.installmentsPaid}
      onChange={handleChange}
      value={values ? values[componentNames?.installmentsPaid] : null}
      type="number"
    />, // 12
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

export default ContractInputs;
