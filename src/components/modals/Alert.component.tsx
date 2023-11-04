import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from "@chakra-ui/react";

interface AlertProps {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  message: string;
  size?: ModalProps["size"];
}

const Alert = ({ onClose, isOpen, title, message, size }: AlertProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Alert;
