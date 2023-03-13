import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import ReportViewer from "./ReportViewer.component";

const ContractsByPeriodModal = ({ isOpen, onClose, mode }: any) => {
  const {
    isOpen: isOpenDocument,
    onOpen: onOpenDocument,
    onClose: onCloseDocument,
  } = useDisclosure();

  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selecione o período em que deseja buscar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap="3" direction="column">
              <FormControl>
                <FormLabel
                  fontSize="sm"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                >
                  Data inicial
                </FormLabel>
                <Input
                  placeholder="Selecione a data"
                  size="md"
                  type="date"
                  onChange={(value) => {
                    setStartDate(value?.target?.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize="sm"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                >
                  Data final
                </FormLabel>
                <Input
                  placeholder="Selecione a data"
                  size="md"
                  type="date"
                  onChange={(value) => {
                    setEndDate(value?.target?.value);
                  }}
                />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onOpenDocument();
                onClose();
              }}
            >
              Gerar relatório
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <ReportViewer
        isOpen={isOpenDocument}
        onClose={onCloseContractsCompletedByPeriod}
        report={}
      /> */}
    </>
  );
};

export default ContractsByPeriodModal;
