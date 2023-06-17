import {
  Flex,
  Text,
  Input as ChakraInput,
  Divider,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Page from "../../../components/Page.component";
import { useState } from "react";
import TenantService from "../../../services/tenantService";
import RentInputs from "../../../components/inputs/RentInputs.component";
import RentInstallmentsTable from "../../../components/tables/RentInstallmentsTable.component";
import ContractService from "../../../services/contractService";
import { dateFormatter } from "../../../services/formatters";
import { Form, Formik } from "formik";
import Alert from "../../../components/modals/Alert.component";
import TenantSelect from "../../../components/TenantSelect.component";

const componentNames = {
  water: "water",
  eletricity: "eletricity",
  iptu: "iptu",
  incomeTax: "incomeTax",
  condominium: "condominium",
  specialDiscount: "specialDiscount",
  rent: "rent",
  breachOfContractFine: "breachOfContractFine",
  sundry: "sundry",
  sundryDescription: "sundryDescription",
  total: "total",
  formOfPayment: "formOfPayment",
};

const ReceiveRent = () => {
  const {
    isOpen: dialogIsOpen,
    onOpen: dialogOnOpen,
    onClose: dialogOnClose,
  } = useDisclosure();

  const [dialogError, setDialogError] = useState<boolean>(false);

  const [tenant, setTenant] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [installments, setInstallments] = useState<[]>([]);

  const initialValues: any = {
    water: null,
    eletricity: null,
    iptu: null,
    incomeTax: null,
    condominium: null,
    specialDiscount: null,
    rent: null,
    breachOfContractFine: null,
    sundry: null,
    sundryDescription: null,
    total: null,
    formOfPayment: null,
  };

  const updateData = async (tenantId: string | number) => {
    setTenant(null);
    setContract(null);
    setInstallments([]);

    const tenant = await TenantService?.get(Number(tenantId));
    const contract = await ContractService?.get(
      Number(tenant?.contract?.id),
      false,
      false,
      true
    );
    const installments = await ContractService.getInstallments(contract?.id);

    setTenant(tenant ?? null);
    setContract(contract ?? null);
    setInstallments(installments ?? null);
  };

  const payInstallment = (values: any) => {
    const total = values[componentNames?.total];
    const formOfPayment = values[componentNames?.formOfPayment];

    delete values[componentNames?.total];
    delete values[componentNames?.formOfPayment];

    ContractService.payInstallment(
      contract?.id,
      "credit",
      total,
      formOfPayment,
      values
    )
      .then(() => {
        setDialogError(false);
      })
      .catch(() => {
        setDialogError(true);
      })
      .finally(() => {
        updateData(tenant?.id);
        dialogOnOpen();
      });
  };

  return (
    <Page
      title="Recebimento de Aluguel"
      direction="column"
      paddingBottom="-2"
      gap="4"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          payInstallment(values);
          resetForm();
        }}
      >
        {({ handleChange, values }) => (
          <Form>
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
                w={["100%", "100%", "100%", "35%"]}
                minW={["auto", "450px", "450px", "450px"]}
                flexDirection="column"
                padding="25px"
                align="center"
                gap="4"
              >
                <Flex w="100%" flexDirection="column" gap="10px">
                  <TenantSelect
                    tenantName={tenant?.fullName || "Não identificado"}
                    updateTenant={updateData}
                  />
                  <Flex w="100%" direction="column" gap="4px">
                    <Flex
                      paddingLeft="1"
                      paddingRight="1"
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Text
                        fontSize="sm"
                        display="flex"
                        flexDirection="row"
                        gap="5px"
                      >
                        Nº Contrato:{" "}
                        <Text fontWeight="bold">{tenant?.contract?.id}</Text>
                      </Text>
                      <Text
                        fontSize="sm"
                        display="flex"
                        flexDirection="row"
                        gap="5px"
                      >
                        Parcela:{" "}
                        <Text fontWeight="bold">
                          {contract?.currentInstallment?.currentInstallment}
                          {"  "}
                        </Text>
                      </Text>
                    </Flex>
                    <Flex
                      paddingLeft="1"
                      paddingRight="1"
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Text
                        fontSize="sm"
                        display="flex"
                        flexDirection="row"
                        gap="5px"
                      >
                        Mês referência:{" "}
                        <Text fontWeight="bold">
                          {contract?.currentInstallment?.referenceMonth}
                        </Text>
                      </Text>
                      <Text
                        fontSize="sm"
                        display="flex"
                        flexDirection="row"
                        gap="5px"
                      >
                        Data de vencimento:{" "}
                        <Text fontWeight="bold">
                          {dateFormatter({
                            value: contract?.currentInstallment?.dueDate,
                          })}
                        </Text>
                      </Text>
                    </Flex>
                    <Flex
                      paddingLeft="1"
                      paddingRight="1"
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Text
                        fontSize="sm"
                        display="flex"
                        flexDirection="row"
                        gap="5px"
                      >
                        Endereço do imóvel:{" "}
                        <Text fontWeight="bold">
                          {tenant?.property?.address}
                        </Text>
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Divider width="100%" />
                <Flex w="100%" gap="20px">
                  <RentInputs
                    title="Crédito"
                    fieldList={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    componentNames={componentNames}
                    handleChange={handleChange}
                    values={values}
                    disableComponents={!tenant}
                  />
                </Flex>
                <Flex w="100%" direction="column" gap="8px">
                  <Flex
                    w="100%"
                    direction="column"
                    gap="10px"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <ChakraInput
                      name={componentNames?.formOfPayment}
                      onChange={handleChange}
                      value={values[componentNames?.formOfPayment] || ""}
                      placeholder="Forma de pagamento"
                      disabled={!tenant}
                    />
                    <Button type="submit" disabled={!tenant}>
                      Baixa
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                display={["none", "none", "flex", "flex"]}
                w="75%"
                flexDirection="column"
                padding="20px"
              >
                <RentInstallmentsTable data={installments} />
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>

      <Alert
        onClose={dialogOnClose}
        isOpen={dialogIsOpen}
        title={dialogError ? "Erro!" : "Sucesso!"}
        message={
          dialogError
            ? "Falha ao criar movimentação, verifique os campos e tente novamente."
            : "Movimentação adicionada com sucesso."
        }
      />
    </Page>
  );
};

export default ReceiveRent;
