import {
  Flex,
  Text,
  Input as ChakraInput,
  Divider,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Page from "../../../components/Page.component";
import { useContext, useEffect, useState } from "react";
import TenantService from "../../../services/tenantService";
import RentInputs from "../../../components/inputs/RentInputs.component";
import RentInstallmentsTable from "../../../components/tables/RentInstallmentsTable.component";
import TenantSelect from "../../../components/TenantSelect.component";
import { Form, Formik } from "formik";
import { currencyFormatter } from "../../../services/formatters";
import Alert from "../../../components/modals/Alert.component";
import CashierControl from "../../../components/CashierControl.component";
import { CashierContext } from "../../../context/CashierContext";
import { MdSave } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import CashierService from "../../../services/cashierService";
import PdfViewer from "../../../components/modals/ReceiptViewer.component";

const componentNames = {
  water: "water",
  eletricity: "eletricity",
  iptu: "iptu",
  incomeTax: "incomeTax",
  condominium: "condominium",
  administrationFee: "administrationFee",
  leaseFee: "leaseFee",
  sundry: "sundry",
  rent: "rent",
  sundryDescription: "sundryDescription",
  total: "total",
  formOfPayment: "formOfPayment",
};

const defaultInitialValues = {
  water: null,
  eletricity: null,
  iptu: null,
  rent: null,
  incomeTax: null,
  condominium: null,
  administrationFee: null,
  leaseFee: null,
  sundry: null,
  sundryDescription: null,
  total: null,
  formOfPayment: null,
};

const TransferRent = () => {
  const { openedCashier } = useContext(CashierContext);

  const {
    isOpen: dialogIsOpen,
    onOpen: dialogOnOpen,
    onClose: dialogOnClose,
  } = useDisclosure();

  const {
    isOpen: showReceiptIsOpen,
    onOpen: showReceiptOnOpen,
    onClose: showReceiptOnClose,
  } = useDisclosure();

  const [blobReceiptPdfLink, setBlobReceiptPdfLink] = useState("");

  const [dialogError, setDialogError] = useState<boolean>(false);

  const {
    isOpen: saveTemplateDialogIsOpen,
    onOpen: saveTemplateDialogOnOpen,
    onClose: saveTemplateDialogOnClose,
  } = useDisclosure();

  const [saveTemplateDialogError, setSaveTemplateDialogError] =
    useState<boolean>(false);

  const [tenant, setTenant] = useState<any>();
  const [installments, setInstallments] = useState<[]>([]);
  const [installmentSelected, setInstallmentSelected] = useState<any>();
  const [balance, setBalance] = useState<number>(0);
  const [installmentSelectedTotalAmount, setInstallmentSelectedTotalAmount] =
    useState<number>(0);

  const [initialValues, setInitialValues] = useState<any>({
    ...defaultInitialValues,
  });

  const updateAdministrationFee = async (currentInstallmentSelected: any) => {
    const installment = await TenantService.Contract.Installment.get({
      tenantId: tenant?.id,
      installmentId: currentInstallmentSelected?.id,
    });

    const receiveTransaction =
      installment.transaction?.length > 0 ? installment.transaction[0] : null;

    setInitialValues({
      ...initialValues,
      rent: receiveTransaction.data?.rent,
    });

    const administrationFee =
      ((Number(receiveTransaction?.data?.rent ?? 0) +
        Number(receiveTransaction?.data?.iptu ?? 0) +
        Number(receiveTransaction?.data?.breachOfContractFine ?? 0)) *
        Number(tenant?.property?.administrationTax ?? 0)) /
      100;

    if (administrationFee !== 0)
      setInitialValues({ ...initialValues, administrationFee });
  };

  useEffect(() => {
    const updateBalance = async () => {
      const installment = await TenantService.Contract.Installment.get({
        tenantId: tenant?.id,
        installmentId: installmentSelected?.id,
      });

      const receiveTransaction =
        installment.transaction?.length > 0 ? installment.transaction[0] : null;

      setInstallmentSelectedTotalAmount(receiveTransaction?.amount ?? 0);
      setBalance(receiveTransaction?.amount ?? 0);
    };

    updateBalance();
  }, [initialValues, installmentSelected, tenant?.id]);

  const updateData = async (tenantId: string | number) => {
    setTenant(null);
    setInstallments([]);
    setInstallmentSelected(null);

    const tenant = await TenantService?.get(Number(tenantId));
    let installments = await TenantService.Contract.Installment.getAll({
      tenantId: tenant?.id,
    });

    installments = installments.filter(
      (installment: any) =>
        installment?.status === "Pg" && installment.transaction.length === 1
    );

    setTenant(tenant ?? null);
    setInitialValues({
      ...defaultInitialValues,
    });
    setInstallments(installments ?? null);
  };

  const saveDataTemplate = (values: any) => {
    const data = { ...values };

    delete data["formOfPayment"];
    delete data["total"];

    CashierService.Transaction.DataTemplate.save({
      tenantId: tenant?.id,
      type: "credit",
      data: data,
    })
      .then(() => {
        saveTemplateDialogOnOpen();
      })
      .catch(() => {
        setSaveTemplateDialogError(true);
      });
  };

  const loadDataTemplate = async () => {
    setInitialValues(defaultInitialValues);

    const dataTemplate = (
      await CashierService.Transaction.DataTemplate.load({
        tenantId: tenant?.id,
        type: "credit",
      })
    )?.data?.data;

    setInitialValues({ ...dataTemplate });
  };

  const loadReceipt = (installmentId: number) => {
    TenantService.Contract.Installment.receipt({
      tenantId: +tenant?.id,
      installmentId: installmentId,
      mode: "locator",
    }).then((value) => {
      const blob = new Blob([value.data], { type: "application/pdf" });
      setBlobReceiptPdfLink(window.URL.createObjectURL(blob));
    });
  };

  const transferRent = (values: any) => {
    const total = values[componentNames?.total];
    const formOfPayment = values[componentNames?.formOfPayment];

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
        dueDate: installmentSelected?.dueDate,
        referenceMonth: installmentSelected?.referenceMonth,
        currentInstallment: installmentSelected?.currentInstallment,
      },
    };

    TenantService.Contract.Installment.transfer(
      tenant?.id,
      installmentSelected.id,
      total,
      formOfPayment,
      values,
      metadata
    )
      .then((value) => {
        setDialogError(false);
        loadReceipt(installmentSelected.id);
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
      title="Repasse de Aluguel"
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
            transferRent(values);
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
                            {installmentSelected?.currentInstallment}
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
                          Endereço do imóvel:{" "}
                          <Text fontWeight="bold">
                            {tenant?.property?.address}
                          </Text>
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex
                    gap="1.5"
                    h="100%"
                    justifyContent="end"
                    w="100%"
                    mt="-25px"
                    mb="-5px"
                  >
                    <FiDownload
                      size="24px"
                      cursor="pointer"
                      onClick={() => loadDataTemplate()}
                    />
                    <MdSave
                      size="26px"
                      cursor="pointer"
                      onClick={() => saveDataTemplate(values)}
                    />
                  </Flex>
                  <Divider width="100%" />
                  <Flex w="100%" gap="20px">
                    <RentInputs
                      title="Débito"
                      fieldList={[1, 2, 3, 4, 5, 10, 11, 9]}
                      componentNames={componentNames}
                      handleChange={handleChange}
                      values={values}
                      disableComponents={!installmentSelected}
                      onUpdateTotalValue={(total: number) =>
                        setBalance(installmentSelectedTotalAmount - total)
                      }
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
                    setSelected={(value: any) => {
                      setInstallmentSelected(value);
                      updateAdministrationFee(value);
                    }}
                  />
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      )}

      <PdfViewer
        isOpen={showReceiptIsOpen}
        onClose={() => {
          setBlobReceiptPdfLink("");
          showReceiptOnClose();
        }}
        isLoading={!(blobReceiptPdfLink?.length > 0)}
        content={blobReceiptPdfLink}
      />

      <Alert
        onClose={() => {
          if (!dialogError) showReceiptOnOpen();
          dialogOnClose();
        }}
        isOpen={dialogIsOpen}
        title={dialogError ? "Erro!" : "Sucesso!"}
        message={
          dialogError
            ? "Falha ao criar movimentação, verifique os campos e tente novamente."
            : "Aluguel repassado com sucesso, clique em fechar para imprimir o recibo do locador."
        }
      />

      <Alert
        onClose={saveTemplateDialogOnClose}
        isOpen={saveTemplateDialogIsOpen}
        title={saveTemplateDialogError ? "Falha!" : "Sucesso!"}
        message={
          saveTemplateDialogError
            ? "Falha ao salvar modelo de dados."
            : "Modelo de dados salvo com sucesso."
        }
      />
    </Page>
  );
};

export default TransferRent;
