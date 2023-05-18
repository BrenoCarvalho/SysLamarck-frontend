import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  Flex,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";

const Input = ({ title, placeholder = title, ...props }: any) => {
  return (
    <FormControl
      w="260px"
      display="flex"
      flexDirection="row"
      justifyContent="right"
    >
      <FormLabel
        fontSize="sm"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
        w="auto"
      >
        {title}
      </FormLabel>
      <ChakraInput
        as={InputMask}
        placeholder={placeholder}
        {...props}
        width="100px"
        size="sm"
      />
    </FormControl>
  );
};

const RentInputs = ({
  componentNames = {},
  handleChange,
  values,
}: {
  componentNames?: any;
  handleChange?: any;
  values?: any;
}) => {
  return (
    <FormControl>
      <Flex height="100%" width="100%" flexDirection="column" gap="8px">
        <Input
          title="Água"
          name={componentNames?.water}
          onChange={handleChange}
          value={values ? values[componentNames?.water] : null}
        />
        <Input
          title="Luz"
          name={componentNames?.eletricity}
          onChange={handleChange}
          value={values ? values[componentNames?.eletricity] : null}
        />
        <Input
          title="IPTU"
          name={componentNames?.iptu}
          onChange={handleChange}
          value={values ? values[componentNames?.iptu] : null}
        />
        <Input
          title="Imposto de renda"
          name={componentNames?.incomeTax}
          onChange={handleChange}
          value={values ? values[componentNames?.incomeTax] : null}
        />
        <Input
          title="Condomínio"
          name={componentNames?.condominium}
          onChange={handleChange}
          value={values ? values[componentNames?.condominium] : null}
        />
        <Input
          title="Comissão"
          name={componentNames?.commission}
          onChange={handleChange}
          value={values ? values[componentNames?.commission] : null}
        />
        <Input
          title="Aluguel"
          name={componentNames?.rent}
          onChange={handleChange}
          value={values ? values[componentNames?.rent] : null}
        />
        <Input
          title="Multa romp. contrato"
          name={componentNames?.breachOfContractFine}
          onChange={handleChange}
          value={values ? values[componentNames?.breachOfContractFine] : null}
        />
        <Input
          title="Diversos"
          name={componentNames?.sundry}
          onChange={handleChange}
          value={values ? values[componentNames?.sundry] : null}
        />
      </Flex>
    </FormControl>
  );
};

export default RentInputs;
