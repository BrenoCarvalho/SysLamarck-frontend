import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import RentInputs from "../inputs/RentInputs.component";
import { Form, Formik } from "formik";
import CashierService from "../../services/cashierService";

interface EditRentPaymentDetailsParams {
  isOpen: boolean;
  onClose: () => void;
  mode: "credit" | "debit";
  installment: any;
}

const EditRentPaymentDetails = ({
  isOpen,
  onClose,
  mode,
  installment,
}: EditRentPaymentDetailsParams) => {
  const componentNames =
    mode === "credit"
      ? {
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
        }
      : {
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

  const initialValues = {
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
  };

  return (
    <Modal
      size="md"
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={
            installment?.transaction[mode === "credit" ? 0 : 1]?.data ??
            initialValues
          }
          enableReinitialize={true}
          onSubmit={(values) => {
            const total = values[componentNames?.total];

            delete values[componentNames?.rentWithoutDiscount ?? ""];
            delete values[componentNames?.total];
            delete values[componentNames?.formOfPayment];

            CashierService.Transaction.update(
              installment?.transaction[mode === "credit" ? 0 : 1]?.id,
              { data: JSON.stringify(values), amount: total }
            )
              .then((result) => {
                onClose();
              })
              .catch((error) => console.log(error));
          }}
        >
          {({ handleChange, values }) => (
            <Form>
              <ModalHeader>Editar detalhes de pagamento</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <RentInputs
                  componentNames={componentNames}
                  handleChange={handleChange}
                  values={values}
                  fieldList={
                    mode === "credit"
                      ? [1, 2, 3, 5, 6, 7, 8, 9]
                      : [1, 2, 3, 4, 5, 10, 11, 9]
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  mr={3}
                  onClick={onClose}
                  variant="unstyled"
                  w="80px"
                  _hover={{ color: "gray.900" }}
                >
                  Fechar
                </Button>
                <Button
                  bg="gray.800"
                  _hover={{ bg: "gray.900" }}
                  color="#fff"
                  type="submit"
                >
                  Salvar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default EditRentPaymentDetails;
