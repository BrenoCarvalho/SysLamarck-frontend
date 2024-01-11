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
import { useState } from "react";

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

  const [initialValues, setInitialValues] = useState({
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
        <ModalHeader>Editar detalhes de pagamento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={
              installment?.transaction[mode === "credit" ? 0 : 1]?.data ??
              initialValues
            }
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              resetForm();
            }}
          >
            {({ handleChange, values }) => (
              <Form>
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
              </Form>
            )}
          </Formik>
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
            onClick={() => null}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditRentPaymentDetails;
