import { Flex, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { PDFViewer } from "@react-pdf/renderer";

const ReportViewer = ({ isOpen, onClose, report, data }: any) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <Flex direction="column" h="82vh">
          <PDFViewer height="100%">{report}</PDFViewer>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default ReportViewer;
