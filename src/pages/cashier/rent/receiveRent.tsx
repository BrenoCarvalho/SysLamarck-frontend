import {
  Flex,
  Text,
  Input as ChakraInput,
  Divider,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Page from "../../../components/Page.component";
import { useContext, useState } from "react";
import TenantService from "../../../services/tenantService";
import RentInputs from "../../../components/inputs/RentInputs.component";
import RentInstallmentsTable from "../../../components/tables/RentInstallmentsTable.component";
import { dateFormatter } from "../../../services/formatters";
import { Form, Formik } from "formik";
import Alert from "../../../components/modals/Alert.component";
import TenantSelect from "../../../components/TenantSelect.component";
import CashierControl from "../../../components/CashierControl.component";
import { CashierContext } from "../../../context/CashierContext";
import PdfViewer from "../../../components/modals/ReceiptViewer.component";

const componentNames = {
  water: "water",
  eletricity: "eletricity",
  iptu: "iptu",
  incomeTax: "incomeTax",
  condominium: "condominium",
  specialDiscount: "specialDiscount",
  rent: "rent",
  rentWithoutDiscount: "rentWithoutDiscount",
  breachOfContractFine: "breachOfContractFine",
  sundry: "sundry",
  sundryDescription: "sundryDescription",
  total: "total",
  formOfPayment: "formOfPayment",
};

const ReceiveRent = () => {
  const { openedCashier } = useContext(CashierContext);

  const {
    isOpen: dialogIsOpen,
    onOpen: dialogOnOpen,
    onClose: dialogOnClose,
  } = useDisclosure();

  const [dialogError, setDialogError] = useState<boolean>(false);

  const [tenant, setTenant] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [installments, setInstallments] = useState<[]>([]);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [blobPdfLink, setBlobPdfLink] = useState("");

  const [initialValues, setInitialValues] = useState<any>({
    water: null,
    eletricity: null,
    iptu: null,
    incomeTax: null,
    condominium: null,
    specialDiscount: null,
    rent: null,
    rentWithoutDiscount: null,
    breachOfContractFine: null,
    sundry: null,
    sundryDescription: null,
    total: null,
    formOfPayment: null,
  });

  const updateData = async (tenantId: string | number) => {
    setTenant(null);
    setContract(null);
    setInstallments([]);

    const tenant = await TenantService?.get(Number(tenantId));
    const contract = await TenantService.Contract.get(
      Number(tenant?.id),
      false,
      false,
      true
    );
    const installments = await TenantService.Contract.Installment.getAll({
      tenantId: tenant?.id,
    });

    setTenant(tenant ?? null);
    setContract(contract ?? null);
    setInstallments(installments ?? null);
    setInitialValues({
      ...initialValues,
      rentWithoutDiscount: contract?.leaseAmount,
      iptu: contract?.iptu,
    });
  };

  const loadReceipt = (installmentId: number) => {
    TenantService.Contract.Installment.receipt({
      tenantId: +tenant?.id,
      installmentId: installmentId,
      mode: "tenant",
    }).then((value) => {
      const blob = new Blob([value.data], { type: "application/pdf" });
      setBlobPdfLink(window.URL.createObjectURL(blob));
    });
  };

  const payInstallment = (values: any) => {
    const total = values[componentNames?.total];
    const formOfPayment = values[componentNames?.formOfPayment];

    delete values[componentNames?.rentWithoutDiscount];
    delete values[componentNames?.total];
    delete values[componentNames?.formOfPayment];

    const metadata = {
      tenant: {
        fullName: tenant?.fullName,
        cpf: tenant?.cpf,
        rg: tenant?.rg,
        email: tenant?.email,
        birthDate: tenant?.birthDate,
        contact1: tenant?.contact1,
        contact2: tenant?.contact2,
      },
      property: {
        address: tenant?.property?.address,
      },
      locator: {
        fullName: tenant?.property?.locator?.fullName,
        cpf: tenant?.property?.locator?.cpf,
        rg: tenant?.property?.locator?.rg,
        email: tenant?.property?.locator?.email,
        birthDate: tenant?.property?.locator?.birthDate,
        contact1: tenant?.property?.locator?.contact1,
        contact2: tenant?.property?.locator?.contact2,
      },
      installment: {
        dueDate: contract?.currentInstallment?.dueDate,
        referenceMonth: contract?.currentInstallment?.referenceMonth,
        currentInstallment: contract?.currentInstallment?.currentInstallment,
      },
    };

    TenantService.Contract.Installment.pay(
      tenant?.id,
      total,
      formOfPayment,
      values,
      metadata
    )
      .then((value) => {
        setDialogError(false);
        loadReceipt(value.data);
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
      menuGroup="Caixa"
      title="Recebimento de Aluguel"
      direction="column"
      paddingBottom="-2"
      gap="4"
      rightButton={CashierControl()}
    >
      {!openedCashier ? (
        <Flex
          w="100%"
          h="82vh"
          direction="column"
          bg="#fff"
          p="4"
          borderRadius="lg"
          shadow="lg"
          justifyContent="center"
        >
          <Text
            w="100%"
            fontSize="46px"
            textAlign="center"
            fontWeight="bold"
            color="gray"
          >
            Caixa fechado
          </Text>
        </Flex>
      ) : (
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
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
                    <TenantSelect onUpdateTenantId={updateData} />
                    <Flex
                      w="100%"
                      direction="column"
                      gap="4px"
                      marginTop="10px"
                    >
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
                      fieldList={[1, 2, 3, 5, 6, 7, 8, 9]}
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
                  <RentInstallmentsTable
                    data={installments}
                    setSelected={() => {}}
                  />
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      )}

      <PdfViewer
        isOpen={showPdfViewer}
        onClose={() => {
          setBlobPdfLink("");
          setShowPdfViewer(false);
        }}
        isLoading={!(blobPdfLink?.length > 0)}
        content={blobPdfLink}
      />

      <Alert
        onClose={() => {
          if (!dialogError) setShowPdfViewer(true);
          dialogOnClose();
        }}
        isOpen={dialogIsOpen}
        title={dialogError ? "Erro!" : "Sucesso!"}
        message={
          dialogError
            ? "Falha ao criar movimentação, verifique os campos e tente novamente."
            : "Aluguel pago com sucesso, clique em fechar para imprimir o recibo do locatário."
        }
      />
    </Page>
  );
};

export default ReceiveRent;
