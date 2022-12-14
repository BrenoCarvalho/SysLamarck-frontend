import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";

const Locator = ({
  showHeader = true,
  headerTitle = "Dados do locador",
  componentNames = {},
  handleChange,
}: {
  showHeader?: boolean;
  headerTitle?: string;
  componentNames?: any;
  handleChange?: any;
}) => {
  return (
    <FormControl>
      {showHeader ? (
        <>
          <FormLabel>{headerTitle}</FormLabel>
          <Divider mb="6" mt="4" />
        </>
      ) : null}

      <Flex gap="6">
        <FormControl w="40%">
          <FormLabel fontSize="sm">Código do locador</FormLabel>
          <NumberInput
            min={1}
            max={500}
            name={componentNames.locatorCode}
            onChange={handleChange(componentNames.locatorCode)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl w="100%">
          <FormLabel fontSize="sm">Prestação de Serviço</FormLabel>
          <Select
            placeholder="Selecionar"
            name={componentNames.provisionService}
            onChange={handleChange}
          >
            <option>Leomar</option>
            <option>Glaucia</option>
            <option>Luiza</option>
            <option>Imobiliária</option>
          </Select>
        </FormControl>
      </Flex>
    </FormControl>
  );
};

export default Locator;
