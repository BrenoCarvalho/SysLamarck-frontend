import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

const LocatorInputs = ({
  showHeader = true,
  headerTitle = "Dados do locador",
  componentNames = {},
  handleChange,
  values,
}: {
  showHeader?: boolean;
  headerTitle?: string;
  componentNames?: any;
  handleChange?: any;
  values?: any;
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
        <FormControl w="100%">
          <FormLabel fontSize="sm">Prestação de Serviço</FormLabel>
          <Select
            placeholder="Selecionar"
            name={componentNames.provisionService}
            onChange={handleChange}
            value={values?.provisionService}
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

export default LocatorInputs;
