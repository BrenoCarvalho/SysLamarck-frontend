import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

interface SelectRentReceiptModeParams {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: (mode: string) => void;
  showAllOptions: boolean;
  isEdit: boolean;
}

const SelectInstallmentMode = ({
  onClose,
  isOpen,
  onConfirm,
  showAllOptions,
  isEdit,
}: SelectRentReceiptModeParams) => {
  const [mode, setMode] = useState();

  return (
    <Modal
      size="sm"
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEdit ? "Editar" : "Selecione o modo do recibo"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl w="100%">
            <Select onChange={(v: any) => setMode(v.target.value)} value={mode}>
              {isEdit ? (
                <>
                  <option value="credit">Recebimento</option>
                  {showAllOptions && <option value="debit">Repasse</option>}
                </>
              ) : (
                <>
                  <option value="tenant">Locatário</option>
                  {showAllOptions && <option value="locator">Locador</option>}
                </>
              )}
            </Select>
          </FormControl>
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
            onClick={() => {
              onConfirm(mode ? mode : isEdit ? "credit" : "tenant");
            }}
          >
            {isEdit ? "Confirmar" : "Imprimir"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelectInstallmentMode;
