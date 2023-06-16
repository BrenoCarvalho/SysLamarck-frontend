import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

const ConfirmDelete = ({ isOpen, onClose, onConfirm, message }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar exclusão</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{message}</Text>
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
              onConfirm();
              onClose();
            }}
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDelete;
