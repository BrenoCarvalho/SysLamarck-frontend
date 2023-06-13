import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  cpfFormatter,
  dateFormatter,
  phoneFormatter,
  cepFormatter,
} from "../../../services/Formatters";
import LocatorService from "../../../services/LocatorService";

const LocatorVisualizationModal = ({
  onClose,
  isOpen,
  locatorSelected,
}: any) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        const locator = await LocatorService.get(locatorSelected?.id);

        setData([
          ["Código", locator?.id],
          ["Nome Completo", locator?.fullName],
          ["Prestação de serviço", locator?.provisionService],
          ["Data de nascimento", dateFormatter({ value: locator?.birthDate })],
          ["RG", locator?.rg],
          ["CPF", cpfFormatter({ value: locator?.cpf })],
          ["Nacionalidade", locator?.nationality],
          ["Estado civil", locator?.maritalStatus],
          ["Profissão", locator?.profession],
          ["E-mail", locator?.email],
          ["Contato 1", phoneFormatter({ value: locator?.contact1 })],
          ["Contato 2", phoneFormatter({ value: locator?.contact2 })],
          ["CEP", cepFormatter({ value: locator?.cep })],
          ["Endereço", locator?.address],
          ["Cidade", locator?.city],
          ["Estado", locator?.district],
          ["Banco", locator?.bank],
          ["Tipo de conta", locator?.accountType],
          ["Agência", locator?.agency],
          ["Nº da conta", locator?.accountNumber],
          ["Remessa de pagamento", locator?.paymentRemittance],
        ]);
      };
      loadData();
    }
  }, [isOpen, locatorSelected?.id]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Locador</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap="2.5" direction="column">
            {data?.map((value: any) => {
              return (
                <Flex>
                  <Text fontWeight="bold">
                    {value[0]}
                    <Text fontWeight="normal">
                      {value[1] ? value[1] : "Não cadastrado"}
                    </Text>
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LocatorVisualizationModal;
