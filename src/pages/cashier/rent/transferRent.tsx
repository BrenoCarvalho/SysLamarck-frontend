import {
  Flex,
  Text,
  Input as ChakraInput,
  Divider,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Page from "../../../components/Page.component";
import { useEffect, useState } from "react";
import TenantService from "../../../services/tenantService";
import RentInputs from "../../../components/inputs/RentInputs.component";
import RentInstallmentsTable from "../../../components/tables/RentInstallmentsTable.component";
import TenantSelect from "../../../components/TenantSelect.component";
import { Form, Formik } from "formik";
import ContractService from "../../../services/contractService";
import Alert from "../../../components/modals/Alert.component";
import { currencyFormatter, dateFormatter } from "../../../services/formatters";

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

const TransferRent = () => {
  const {
    isOpen: dialogIsOpen,
    onOpen: dialogOnOpen,
    onClose: dialogOnClose,
  } = useDisclosure();

  const [dialogError, setDialogError] = useState<boolean>(false);

  const [tenant, setTenant] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [installments, setInstallments] = useState<[]>([]);
  const [installmentSelected, setInstallmentSelected] = useState<any>();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const updateBalance = async () => {
      const installment = await ContractService.getInstallment(
        installmentSelected?.id
      );

      setBalance(installment?.transaction[0].amount ?? 0);
    };

    updateBalance();
  }, [installmentSelected]);

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
    setInstallmentSelected(null);

    const tenant = await TenantService?.get(Number(tenantId));
    const contract = await ContractService?.get(
      Number(tenant?.contract?.id),
      false,
      false,
      true
    );
    let installments = await ContractService.getInstallments(contract?.id);
    installments = installments.filter(
      (installment: any) =>
        installment?.status === "Pg" && installment.transaction.length === 1
    );

    setTenant(tenant ?? null);
    setContract(contract ?? null);
    setInstallments(installments ?? null);
  };

  return (
    <Page
      title="Repasse de Aluguel"
      direction="column"
      paddingBottom="-2"
      gap="4"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
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
                    title="Débito"
                    fieldList={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    componentNames={componentNames}
                    handleChange={handleChange}
                    values={values}
                    disableComponents={!installmentSelected}
                  />
                </Flex>
                <Divider />
                <Flex w="100%" direction="column" gap="8px">
                  <Text fontSize="md" w="100%" textAlign="right" pr="8px">
                    Saldo
                    <Text fontWeight="bold">
                      {currencyFormatter({
                        value: balance,
                      }) || "R$ 0,00"}
                    </Text>
                  </Text>
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
                      disabled={!installmentSelected}
                    />
                    <Button type="submit" disabled={!installmentSelected}>
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
                <RentInstallmentsTable
                  data={installments}
                  setSelected={setInstallmentSelected}
                />
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

export default TransferRent;
