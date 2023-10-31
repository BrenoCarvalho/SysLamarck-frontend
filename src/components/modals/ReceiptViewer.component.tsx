import {
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";

interface PdfViewerParams {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  content: string;
}

const PdfViewer = ({
  isOpen,
  onClose,
  isLoading,
  content,
}: PdfViewerParams) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent maxW="80%">
        <Flex
          width="100%"
          height="90vh"
          justifyContent="center"
          alignItems="center"
        >
          {!isLoading ? (
            <iframe title="receipt" src={content} width="100%" height="100%" />
          ) : (
            <Spinner size="lg" />
          )}
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default PdfViewer;
