import {
  Flex,
  Text,
  Input as ChakraInput,
  FormLabel,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  Button,
} from "@chakra-ui/react";
import Page from "../components/Page.component";
import InputMask from "react-input-mask";
import { useState } from "react";
import TenantService from "../services/TenantService";
import PropertyService from "../services/PropertyService";
import RentInputs from "../components/Forms/RentInputs.component";
import RentMovimentationTable from "../components/Tables/RentMovimentationTable.component";

const Input = ({ title, placeholder = title, ...props }: any) => {
  return (
    <FormControl w="100%">
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

const TenantSelect = ({
  tenantName,
  updateTenant,
}: {
  tenantName: string;
  updateTenant: any;
}) => (
  <FormControl w="100%">
    <FormLabel fontSize="sm">
      Locatário:{" "}
      {tenantName.length >= 39
        ? `${tenantName.substring(0, 36)}...`
        : tenantName}
    </FormLabel>
    <NumberInput
      onChange={(value) => {
        updateTenant(value);
      }}
      min={0}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </FormControl>
);

const CashierRent = () => {
  const [tenant, setTenant] = useState<any>();
  const [property, setProperty] = useState<any>();

  const updateTenant = async (tenantCode: string | number) => {
    setTenant(null);
    setProperty(null);

    const tenant = await TenantService?.get(Number(tenantCode));

    setTenant(tenant || null);
    setProperty(
      (await PropertyService.getByPropertyCode(tenant?.propertyCode)) || null
    );
  };

  return (
    <Page
      title="Recebimento de Aluguel"
      direction="column"
      paddingBottom="-2"
      gap="4"
    >
      <Flex
        w="100%"
        h="100%"
        direction={["column", "column", "column", "row"]}
        bg="#fff"
        p="1"
        borderRadius="lg"
        shadow="lg"
      >
        <Flex
          w={["100%", "100%", "100%", "50%"]}
          flexDirection="column"
          padding="25px"
          align="center"
          gap="4"
        >
          <Flex w="100%" flexDirection="column" gap="10px">
            <TenantSelect
              tenantName={tenant?.fullName || "Não identificado"}
              updateTenant={updateTenant}
            />
            <Flex w="100%" direction="column" gap="4px">
              <Flex
                paddingLeft="1"
                paddingRight="1"
                width="100%"
                justifyContent="space-between"
              >
                <Text fontSize="sm">
                  Endereço do imóvel: {property?.address}
                </Text>
                <Text fontSize="sm">
                  Nº Contrato: {tenant?.contract?.contractCode}
                </Text>
              </Flex>
              <Flex
                paddingLeft="1"
                paddingRight="1"
                width="100%"
                justifyContent="space-between"
              >
                <Text fontSize="sm">Parcela:</Text>
                <Text fontSize="sm">Data de vencimento:</Text>
              </Flex>
              <Text paddingLeft="1" fontSize="sm">
                Mês referência:
              </Text>
            </Flex>
          </Flex>
          <Divider width="100%" />
          <Flex w="100%" gap="20px">
            <RentInputs
              title="Débito"
              fieldList={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            />

            <RentInputs
              title="Crédito"
              fieldList={[1, 2, 3, 4, 5, 9, 10, 11]}
            />
          </Flex>
          <Divider />
          <Flex w="100%" direction="column" gap="8px">
            <Text fontSize="md" w="100%" textAlign="right" pr="8px">
              Saldo<Text fontWeight="bold">R$ 0,00</Text>
            </Text>
            <Flex
              w="100%"
              direction="column"
              gap="6px"
              justifyContent="center"
              textAlign="center"
            >
              <ChakraInput placeholder="Forma de pagamento" />
            </Flex>
          </Flex>
        </Flex>
        <Flex w="50%" flexDirection="column" padding="20px">
          <RentMovimentationTable />
          <Flex w="100%" gap="4px" mt="20px" mb="5px">
            <Button w="100%">Cancelar multa atraso</Button>
            <Button w="100%">Imprimir recibo</Button>
          </Flex>
          <Button>Baixa</Button>
        </Flex>
      </Flex>
    </Page>
  );
};

export default CashierRent;
