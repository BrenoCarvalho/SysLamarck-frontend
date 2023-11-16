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
  isRequired = false,
  ...props
}: any) => {
  return (
    <FormControl w={width} isRequired={isRequired}>
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

interface ContractInputsProps {
  fieldList?: number[];
  requiredFields?: number[];
  showHeader?: boolean;
  headerTitle?: string;
  componentNames?: any;
  handleChange?: any;
  values?: any;
}

const ContractInputs = ({
  fieldList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  requiredFields = [],
  showHeader = true,
  headerTitle = "Contrato",
  componentNames = {},
  handleChange,
  values,
}: ContractInputsProps) => {
  const fields = [
    <SwitchButton
      title="Aplicar desconto"
      name={componentNames?.applyDiscount}
      onChange={handleChange}
      value={values ? values[componentNames?.applyDiscount] : null}
      isChecked={values ? values[componentNames?.applyDiscount] : null}
      isRequired={requiredFields.includes(1) ?? false}
    />, // 1
    <SwitchButton
      title="Imposto recolhido na fonte"
      name={componentNames?.withholdingTax}
      onChange={handleChange}
      value={values ? values[componentNames?.withholdingTax] : null}
      isChecked={values ? values[componentNames?.withholdingTax] : null}
      isRequired={requiredFields.includes(2) ?? false}
    />, // 2
    <RadioButton
      title="Finalidade"
      name={componentNames?.goal}
      onChange={(value: any) => handleChange(componentNames?.goal)(value)}
      value={values ? values[componentNames?.goal] : null}
      isRequired={requiredFields.includes(3) ?? false}
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
      isRequired={requiredFields.includes(4) ?? false}
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
      isRequired={requiredFields.includes(5) ?? false}
    />, // 5
    <CustomSelect
      title="Reajuste"
      options={["Anual", "Mensal", "Trimestral", "Quadrimestral", "Semestral"]}
      name={componentNames?.reajust}
      onChange={handleChange}
      value={values ? values[componentNames?.reajust] : null}
      isRequired={requiredFields.includes(6) ?? false}
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
      isRequired={requiredFields.includes(7) ?? false}
    />, // 7
    <Input
      title="Valor Locação"
      name={componentNames.leaseAmount}
      // onChange={handleChange}
      value={
        values ? Math.round(values[componentNames?.integralValue] * 0.9) : null
      }
      type="number"
      isRequired={requiredFields.includes(8) ?? false}
    />, // 8
    <Input
      title="Data de início"
      type="date"
      name={componentNames.start}
      value={values ? values[componentNames?.start] : null}
      onChange={handleChange}
      isRequired={requiredFields.includes(9) ?? false}
    />, // 9
    <Input
      title="Duração do contrato"
      name={componentNames.duration}
      onChange={handleChange}
      value={values ? values[componentNames?.duration] : null}
      type="number"
      isRequired={requiredFields.includes(10) ?? false}
    />, // 10
    <Input
      title="Dia de pagamento"
      name={componentNames.payday}
      onChange={handleChange}
      value={values ? values[componentNames?.payday] : null}
      type="number"
      isRequired={requiredFields.includes(11) ?? false}
    />, // 11
    <Input
      title="Meses de carência"
      name={componentNames.gracePeriod}
      onChange={handleChange}
      value={values ? values[componentNames?.gracePeriod] : null}
      type="number"
      isRequired={requiredFields.includes(12) ?? false}
    />, // 12
    <Input
      title="Parcelas pagas"
      name={componentNames.installmentsPaid}
      onChange={handleChange}
      value={values ? values[componentNames?.installmentsPaid] : null}
      type="number"
      isRequired={requiredFields.includes(13) ?? false}
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

export default ContractInputs;
