import {
  Button,
  Divider,
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
  currencyFormatter,
  dateFormatter,
  installmentStatusFormatter,
} from "../../../services/formatters";
import ContractService from "../../../services/contractService";

const InstallmentVisualizationModal = ({
  onClose,
  isOpen,
  installmentSelected,
}: any) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        const installment = await ContractService.getInstallment(
          installmentSelected?.id
        );

        const paymentTransactionData = Object.entries(
          installment?.transaction[0]?.data ?? {}
        );

        const paymentTransactionDataNames: any = {
          water: "Água",
          eletricity: "Luz",
          iptu: "IPTU",
          incomeTax: "Imposto de renda",
          condominium: "Condomínio",
          specialDiscount: "Desconto especial",
          breachOfContractFine: "Multa romp. de contrato",
          rent: "Aluguel",
          sundry: "Diversos",
          sundryDescription: "Descrição de diversos",
        };

        const paymentTransactionDataFormatted = paymentTransactionData?.map(
          (data: any) => [
            paymentTransactionDataNames[data[0]],
            Number(data[1]) ? currencyFormatter({ value: data[1] }) : data[1],
          ]
        );

        const paymentData =
          installment?.status === "Pg"
            ? [
                ["Dados do pagamento"],
                [
                  "Data",
                  dateFormatter({
                    value: installment?.transaction[0]?.createdAt.toString(),
                  }),
                ],
                [
                  "Total pago",
                  currencyFormatter({
                    value: installment?.transaction[0]?.amount,
                  }),
                ],
                [
                  "Forma de pagamento",
                  installment?.transaction[0]?.formOfPayment,
                ],
                ...paymentTransactionDataFormatted,
              ]
            : [];

        setData([
          ["Mês referência", installment?.referenceMonth],
          [
            "Data de vencimento",
            dateFormatter({ value: installment?.dueDate }),
          ],
          ["Valor", currencyFormatter({ value: installment?.amount })],
          [
            "Status",
            installmentStatusFormatter({ value: installment?.status }),
          ],
          ...paymentData,
        ]);
      };
      loadData();
    }
  }, [isOpen, installmentSelected?.id]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Parcela {installmentSelected?.currentInstallment}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap="2.5" direction="column">
            {data?.map((value: any) => {
              return value ? (
                <Flex>
                  {value?.length > 1 ? (
                    <Text fontWeight="bold">
                      {value[0]}
                      <Text fontWeight="normal">
                        {value[1] ? value[1] : "Não cadastrado"}
                      </Text>
                    </Text>
                  ) : (
                    <Flex
                      mb="1"
                      w="100%"
                      direction="column"
                      justifyContent="center"
                      align="center"
                      gap="1"
                    >
                      <Text
                        w="100%"
                        mt="1"
                        mb="1"
                        fontWeight="bold"
                        textAlign="center"
                      >
                        {value[0]}
                      </Text>
                      <Divider w="50%" />
                    </Flex>
                  )}
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

export default InstallmentVisualizationModal;
