import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import ReportViewer from "./ReportViewer.component";
import ContractsByMonth from "../../documents/contracts/ContractsByMonth.component";

interface ContractsByMonthParams {
  isOpen: any;
  onClose: any;
  type: "readjustment" | "renovation";
}

const ContractsByMonthModal = ({
  isOpen,
  onClose,
  type,
}: ContractsByMonthParams) => {
  const {
    isOpen: isOpenDocument,
    onOpen: onOpenDocument,
    onClose: onCloseDocument,
  } = useDisclosure();

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [monthNumber, setMonthNumber] = useState<any>();
  const typeName = type === "readjustment" ? "reajuste" : "renovação";

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
          <ModalHeader>Relatório de contratos para {typeName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap="3" direction="column">
              <FormControl>
                <FormLabel fontSize="sm">Selecione o mês</FormLabel>
                <Select
                  placeholder="Selecionar"
                  onChange={(value) => {
                    setMonthNumber(months.indexOf(value?.target?.value) + 1);
                  }}
                >
                  {months?.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </Select>
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

      <ReportViewer
        isOpen={isOpenDocument}
        onClose={onCloseDocument}
        report={<ContractsByMonth month={monthNumber} mode={type} />}
      />
    </>
  );
};

export default ContractsByMonthModal;
