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
import TenantService from "../../../services/TenantService";
import {
  cpfFormatter,
  dateFormatter,
  phoneFormatter,
  propertyCodeFormatter,
} from "../../../services/Formatters";

const TenantVisualizationModal = ({
  onClose,
  isOpen,
  propertySelected: tenantSelected,
}: any) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        const tenant = await TenantService.get(tenantSelected?.tenantCode);

        setData([
          ["Código do locatário", tenant?.tenantCode],
          [
            "Código do imóvel",
            propertyCodeFormatter({ value: tenant?.propertyCode }),
          ],
          ["Nome do locador", tenant?.fullName],
          ["Data de nascimento", dateFormatter({ value: tenant?.birthDate })],
          ["RG", tenant?.rg],
          ["CPF", cpfFormatter({ value: tenant?.cpf })],
          ["Nacionalidade", tenant?.nationality],
          ["Estado civil", tenant?.maritalStatus],
          ["Profissão", tenant?.profession],
          ["E-mail", tenant?.email],
          ["Contato 1", phoneFormatter({ value: tenant?.contact1 })],
          ["Contato 2", phoneFormatter({ value: tenant?.contact2 })],
          tenant?.fullNameT2
            ? ["Nome do locador (Locador 2)", tenant?.fullNameT2]
            : null,
          tenant?.fullNameT2
            ? [
                "Data de nascimento (Locador 2)",
                dateFormatter({ value: tenant?.birthDateT2 }),
              ]
            : null,
          tenant?.fullNameT2 ? ["RG (Locador 2)", tenant?.rgT2] : null,
          tenant?.fullNameT2
            ? ["CPF (Locador 2)", cpfFormatter({ value: tenant?.cpfT2 })]
            : null,
          tenant?.fullNameT2
            ? ["Nacionalidade (Locador 2)", tenant?.nationalityT2]
            : null,
          tenant?.fullNameT2
            ? ["Estado civil (Locador 2)", tenant?.maritalStatusT2]
            : null,
          tenant?.fullNameT2
            ? ["Profissão (Locador 2)", tenant?.professionT2]
            : null,
          tenant?.fullNameT2 ? ["E-mail (Locador 2)", tenant?.emailT2] : null,
          tenant?.fullNameT2
            ? [
                "Contato 1 (Locador 2)",
                phoneFormatter({ value: tenant?.contact1T2 }),
              ]
            : null,
          tenant?.fullNameT2
            ? [
                "Contato 2 (Locador 2)",
                phoneFormatter({ value: tenant?.contact2T2 }),
              ]
            : null,
          ["Aplicar desconto", tenant?.contract?.applyDiscount ? "Sim" : "Não"],
          [
            "Imposto recolhido na fonte",
            tenant?.contract?.withholdingTax ? "Sim" : "Não",
          ],
          ["Finalidade", tenant?.contract?.goal],
          ["Pagamento IPTU", tenant?.contract?.IPTUPayment],
          ["Índex", tenant?.contract?.index],
          ["Reajuste", tenant?.contract?.reajust],
          ["Valor integral", tenant?.contract?.integralValue],
          ["Valor locação", tenant?.contract?.leaseAmount],
          ["Duração", tenant?.contract?.duration],
          ["Dia de pagamento", tenant?.contract?.payday],
          ["Data de início do contrato", tenant?.contract?.start],
          ["Data de termino do contrato", tenant?.contract?.end],
          ["Primeiro pagamento", tenant?.contract?.firstPayment],
          ["Tipo", tenant?.bail?.type],
          ["Valor de caução", tenant?.bail?.escrowValue],
          ["Seguro militar", tenant?.bail?.militaryInsurance],
          ["Nome completo (Fiador)", tenant?.bail?.fullName],
          ["Data de nascimento (Fiador)", tenant?.bail?.birthDate],
          ["RG (Fiador)", tenant?.bail?.rg],
          ["CPF / CNPJ (Fiador)", tenant?.bail?.cpf],
          ["Nacionalidade (Fiador)", tenant?.bail?.nationality],
          ["Estado civil (Fiador)", tenant?.bail?.maritalStatus],
          ["Profissão (Fiador)", tenant?.bail?.profession],
        ]);
      };
      loadData();
    }
  }, [isOpen, tenantSelected?.tenantCode]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Locatário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap="2.5" direction="column">
            {data?.map((value: any) => {
              return value ? (
                <Flex>
                  <Text fontWeight="bold">
                    {value[0]}
                    <Text fontWeight="normal">
                      {value[1] ? value[1] : "Não cadastrado"}
                    </Text>
                  </Text>
                </Flex>
              ) : null;
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

export default TenantVisualizationModal;
