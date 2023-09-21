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
import TenantService from "../../../services/tenantService";
import {
  cpfFormatter,
  currencyFormatter,
  dateFormatter,
  phoneFormatter,
  propertyCodeFormatter,
} from "../../../services/formatters";

const TenantVisualizationModal = ({
  onClose,
  isOpen,
  propertySelected: tenantSelected,
}: any) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        const tenant = await TenantService.get(tenantSelected?.id);

        console.log(tenant);

        const residents: any = tenant?.residents?.length ? [["Moradores"]] : [];

        tenant?.residents?.map((resident: any) => {
          const tenantIndex = tenant?.residents?.indexOf(resident) + 1;

          residents.push([`Nome - Morador ${tenantIndex}`, resident.fullName]);
          residents.push([`RG - Morador ${tenantIndex}`, resident.rg]);
          residents.push([`CPF / CNPJ - Morador ${tenantIndex}`, resident.cpf]);
          residents.push([
            `Contato 1 - Morador ${tenantIndex}`,
            resident.contact1,
          ]);
        });

        setData([
          ["Locatário"],
          [
            "Código do locatário",
            propertyCodeFormatter({ value: tenant?.property?.propertyCode }),
          ],
          ["Endereço do imóvel", tenant?.property?.address],
          ["Nome do locatário", tenant?.fullName],
          [
            "Data de nascimento",
            dateFormatter({ value: tenant?.contract.birthDate }),
          ],
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
                dateFormatter({ value: tenant?.contract.birthDateT2 }),
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
          ...residents,
          ["Contrato"],
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
          [
            "Data de início do contrato",
            dateFormatter({ value: tenant?.contract?.start }),
          ],
          [
            "Data de termino do contrato",
            dateFormatter({ value: tenant?.contract?.end }),
          ],
          [
            "Primeiro pagamento",
            dateFormatter({ value: tenant?.contract?.firstPayment }),
          ],
          ["Fiança"],
          ["Tipo de fiança", tenant?.contract.bail?.type],
          tenant?.contract.bail?.type === "Calção"
            ? [
                "Valor de caução",
                currencyFormatter({
                  value: tenant?.contract.bail?.escrowValue,
                }),
              ]
            : null,
          tenant?.contract.bail?.type === "Termo de garantia"
            ? ["Termo de garantia", tenant?.contract.bail?.warrantyTerm]
            : null,
          tenant?.contract.bail?.type === "Título de capitalização"
            ? [
                "Título de capitalização",
                tenant?.contract.bail?.capitalizationTitle,
              ]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["Nome completo (Fiador)", tenant?.contract.bail?.fullNameG1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? [
                "Data de nascimento (Fiador)",
                dateFormatter({ value: tenant?.contract.bail?.birthDateG1 }),
              ]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["RG (Fiador)", tenant?.contract.bail?.rgG1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["CPF / CNPJ (Fiador)", tenant?.contract.bail?.cpfG1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["Nacionalidade (Fiador)", tenant?.contract.bail?.nationalityG1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["Estado civil (Fiador)", tenant?.contract.bail?.maritalStatusG1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["Profissão (Fiador)", tenant?.contract.bail?.professionG1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["E-mail (Fiador)", tenant?.contract.bail?.emailG1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["Contato 1 (Fiador)", tenant?.contract.bail?.contact1G1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["Contato 2 (Fiador)", tenant?.contract.bail?.contact2G1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["CEP (Fiador)", tenant?.contract.bail?.cepG1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["Cidade (Fiador)", tenant?.contract.bail?.cityG1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["Estado (Fiador)", tenant?.contract.bail?.districtG1]
            : null,
          tenant?.contract.bail?.type === "Fiador"
            ? ["Endereço (Fiador)", tenant?.contract.bail?.addressG1]
            : null,
          tenant?.contract.bail?.spouseFullNameG1
            ? [
                "Nome completo (Cônjuge)",
                tenant?.contract.bail?.spouseFullNameG1,
              ]
            : null,
          tenant?.contract.bail?.spouseFullNameG1
            ? [
                "Data de nascimento (Cônjuge)",
                dateFormatter({
                  value:
                    tenant?.contract.bail?.tenant?.contract.bail
                      ?.spouseBirthDateG1,
                }),
              ]
            : null,
          tenant?.contract.bail?.spouseFullNameG1
            ? ["RG (Cônjuge)", tenant?.contract.bail?.spouseRgG1]
            : null,
          tenant?.contract.bail?.spouseFullNameG1
            ? ["CPF (Cônjuge)", tenant?.contract.bail?.spouseCpfG1]
            : null,
          tenant?.contract.bail?.spouseFullNameG1
            ? [
                "Nacionalidade (Cônjuge)",
                tenant?.contract.bail?.spouseNationalityG1,
              ]
            : null,
          tenant?.contract.bail?.spouseFullNameG1
            ? ["Profissão (Cônjuge)", tenant?.contract.bail?.spouseProfessionG1]
            : null,
          tenant?.contract.bail?.spouseFullNameG1
            ? ["Contato1 (Cônjuge)", tenant?.contract.bail?.spouseContact1G1]
            : null,
          tenant?.contract.bail?.bailPropertyCepG1
            ? [
                "CEP (Imóvel de fiança)",
                tenant?.contract.bail?.bailPropertyCepG1,
              ]
            : null,
          tenant?.contract.bail?.bailPropertyCepG1
            ? [
                "Cidade (Imóvel de fiança)",
                tenant?.contract.bail?.bailPropertyCityG1,
              ]
            : null,
          tenant?.contract.bail?.bailPropertyCepG1
            ? [
                "Estado (Imóvel de fiança)",
                tenant?.contract.bail?.bailPropertyDistrictG1,
              ]
            : null,
          tenant?.contract.bail?.bailPropertyCepG1
            ? [
                "Endereço (Imóvel de fiança)",
                tenant?.contract.bail?.bailPropertyAddressG1,
              ]
            : null,
          tenant?.contract.bail?.bailPropertyCepG1
            ? [
                "Nº de matricula (Imóvel de fiança)",
                tenant?.contract.bail?.bailPropertyRegistrationNumberG1,
              ]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["Nome completo (Fiador 2)", tenant?.contract.bail?.fullNameG2]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? [
                "Data de nascimento (Fiador 2)",
                dateFormatter({
                  value: tenant?.contract.bail?.birthDateG2,
                }),
              ]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["RG (Fiador 2)", tenant?.contract.bail?.rgG2]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["CPF / CNPJ (Fiador 2)", tenant?.contract.bail?.cpfG2]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["Nacionalidade (Fiador 2)", tenant?.contract.bail?.nationalityG2]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? [
                "Estado civil (Fiador 2)",
                tenant?.contract.bail?.maritalStatusG2,
              ]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["Profissão (Fiador 2)", tenant?.contract.bail?.professionG2]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["E-mail (Fiador 2)", tenant?.contract.bail?.emailG2]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["Contato 1 (Fiador 2)", tenant?.contract.bail?.contact1G2]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["Contato 2 (Fiador 2)", tenant?.contract.bail?.contact2G2]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["CEP (Fiador 2)", tenant?.contract.bail?.cepG2]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["Cidade (Fiador 2)", tenant?.contract.bail?.cityG2]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["Estado (Fiador 2)", tenant?.contract.bail?.districtG2]
            : null,
          tenant?.contract.bail?.fullNameG2
            ? ["Endereço (Fiador 2)", tenant?.contract.bail?.addressG2]
            : null,
          tenant?.contract.bail?.spouseFullNameG2
            ? [
                "Nome completo (Cônjuge 2)",
                tenant?.contract.bail?.spouseFullNameG2,
              ]
            : null,
          tenant?.contract.bail?.spouseFullNameG2
            ? [
                "Data de nascimento (Cônjuge 2)",
                dateFormatter({
                  value: tenant?.contract.bail?.spouseBirthDateG2,
                }),
              ]
            : null,
          tenant?.contract.bail?.spouseFullNameG2
            ? ["RG (Cônjuge 2)", tenant?.contract.bail?.spouseRgG2]
            : null,
          tenant?.contract.bail?.spouseFullNameG2
            ? ["CPF (Cônjuge 2)", tenant?.contract.bail?.spouseCpfG2]
            : null,
          tenant?.contract.bail?.spouseFullNameG2
            ? [
                "Nacionalidade (Cônjuge 2)",
                tenant?.contract.bail?.spouseNationalityG2,
              ]
            : null,
          tenant?.contract.bail?.spouseFullNameG2
            ? [
                "Profissão (Cônjuge 2)",
                tenant?.contract.bail?.spouseProfessionG2,
              ]
            : null,
          tenant?.contract.bail?.spouseFullNameG2
            ? ["Contato1 (Cônjuge 2)", tenant?.contract.bail?.spouseContact1G2]
            : null,
          tenant?.contract.bail?.bailPropertyCepG2
            ? [
                "CEP (Imóvel de fiança 2)",
                tenant?.contract.bail?.bailPropertyCepG2,
              ]
            : null,
          tenant?.contract.bail?.bailPropertyCepG2
            ? [
                "Cidade (Imóvel de fiança 2)",
                tenant?.contract.bail?.bailPropertyCityG2,
              ]
            : null,
          tenant?.contract.bail?.bailPropertyCepG2
            ? [
                "Estado (Imóvel de fiança 2)",
                tenant?.contract.bail?.bailPropertyDistrictG2,
              ]
            : null,
          tenant?.contract.bail?.bailPropertyCepG2
            ? [
                "Endereço (Imóvel de fiança 2)",
                tenant?.contract.bail?.bailPropertyAddressG2,
              ]
            : null,
          tenant?.contract.bail?.bailPropertyCepG2
            ? [
                "Nº de matricula (Imóvel de fiança 2)",
                tenant?.contract.bail?.bailPropertyRegistrationNumberG2,
              ]
            : null,
        ]);
      };
      loadData();
    }
  }, [isOpen, tenantSelected?.id]);

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

export default TenantVisualizationModal;
