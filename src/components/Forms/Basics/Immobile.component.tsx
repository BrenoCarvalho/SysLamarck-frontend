import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

const Immobile = ({
  showHeader = true,
  headerTitle = "Dados do imóvel",
}: {
  showHeader?: boolean;
  headerTitle?: string;
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
          <FormLabel fontSize="sm">Locador</FormLabel>
          <Select placeholder="Selecionar">
            <option>Exemplo1</option>
            <option>Exemplo2</option>
          </Select>
        </FormControl>
        <FormControl w="100%">
          <FormLabel fontSize="sm">Tipo do Imóvel</FormLabel>
          <Select placeholder="Selecionar">
            <option>Casa</option>
            <option>Apartamento</option>
            <option>Comercial</option>
            <option>Terreno</option>
          </Select>
        </FormControl>
      </Flex>
    </FormControl>
  );
};

export default Immobile;
