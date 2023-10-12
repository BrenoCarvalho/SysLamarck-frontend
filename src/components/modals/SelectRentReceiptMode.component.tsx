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

const SelectRentReceiptMode = ({ onClose, isOpen, onConfirm }: any) => {
  const [mode, setMode] = useState<"tenant" | "locator">("tenant");

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
        <ModalHeader>Selecione o modo do recibo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl w="100%">
            <Select onChange={(v: any) => setMode(v.target.value)} value={mode}>
              <option value="tenant">Locatário</option>
              <option value="locator">Locador</option>
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
              onConfirm(mode);
            }}
          >
            Imprimir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelectRentReceiptMode;
