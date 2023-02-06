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
import TenantService from "../../../services/TenantService";
import {
  cpfFormatter,
  dateFormatter,
  phoneFormatter,
  propertyCodeFormatter,
} from "../../../services/Formatters";
import PropertyService from "../../../services/PropertyService";

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
            propertyCodeFormatter({ value: tenant?.propertyCode }),
          ],
          [
            "Endereço do imóvel",
            (await PropertyService.getByPropertyCode(tenant?.propertyCode))
              ?.address,
          ],
          ["Nome do locatário", tenant?.fullName],
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
          ["Tipo de fiança", tenant?.bail?.type],
          tenant?.bail?.type === "Calção"
            ? ["Valor de caução", tenant?.bail?.escrowValue]
            : null,
          tenant?.bail?.type === "Termo de garantia"
            ? ["Termo de garantia", tenant?.bail?.warrantyTerm]
            : null,
          tenant?.bail?.type === "Título de capitalização"
            ? ["Título de capitalização", tenant?.bail?.capitalizationTitle]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["Nome completo (Fiador)", tenant?.bail?.fullNameG1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? [
                "Data de nascimento (Fiador)",
                dateFormatter({ value: tenant?.bail?.birthDateG1 }),
              ]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["RG (Fiador)", tenant?.bail?.rgG1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["CPF / CNPJ (Fiador)", tenant?.bail?.cpfG1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["Nacionalidade (Fiador)", tenant?.bail?.nationalityG1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["Estado civil (Fiador)", tenant?.bail?.maritalStatusG1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["Profissão (Fiador)", tenant?.bail?.professionG1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["E-mail (Fiador)", tenant?.bail?.emailG1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["Contato 1 (Fiador)", tenant?.bail?.contact1G1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["Contato 2 (Fiador)", tenant?.bail?.contact2G1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["CEP (Fiador)", tenant?.bail?.cepG1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["Cidade (Fiador)", tenant?.bail?.cityG1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["Estado (Fiador)", tenant?.bail?.districtG1]
            : null,
          tenant?.bail?.type === "Fiador"
            ? ["Endereço (Fiador)", tenant?.bail?.addressG1]
            : null,
          tenant?.bail?.spouseFullNameG1
            ? ["Nome completo (Cônjuge)", tenant?.bail?.spouseFullNameG1]
            : null,
          tenant?.bail?.spouseFullNameG1
            ? [
                "Data de nascimento (Cônjuge)",
                dateFormatter({
                  value: tenant?.bail?.tenant?.bail?.spouseBirthDateG1,
                }),
              ]
            : null,
          tenant?.bail?.spouseFullNameG1
            ? ["RG (Cônjuge)", tenant?.bail?.spouseRgG1]
            : null,
          tenant?.bail?.spouseFullNameG1
            ? ["CPF (Cônjuge)", tenant?.bail?.spouseCpfG1]
            : null,
          tenant?.bail?.spouseFullNameG1
            ? ["Nacionalidade (Cônjuge)", tenant?.bail?.spouseNationalityG1]
            : null,
          tenant?.bail?.spouseFullNameG1
            ? ["Profissão (Cônjuge)", tenant?.bail?.spouseProfessionG1]
            : null,
          tenant?.bail?.spouseFullNameG1
            ? ["Contato1 (Cônjuge)", tenant?.bail?.spouseContact1G1]
            : null,
          tenant?.bail?.bailPropertyCepG1
            ? ["CEP (Imóvel de fiança)", tenant?.bail?.bailPropertyCepG1]
            : null,
          tenant?.bail?.bailPropertyCepG1
            ? ["Cidade (Imóvel de fiança)", tenant?.bail?.bailPropertyCityG1]
            : null,
          tenant?.bail?.bailPropertyCepG1
            ? [
                "Estado (Imóvel de fiança)",
                tenant?.bail?.bailPropertyDistrictG1,
              ]
            : null,
          tenant?.bail?.bailPropertyCepG1
            ? [
                "Endereço (Imóvel de fiança)",
                tenant?.bail?.bailPropertyAddressG1,
              ]
            : null,
          tenant?.bail?.bailPropertyCepG1
            ? [
                "Nº de matricula (Imóvel de fiança)",
                tenant?.bail?.bailPropertyRegistrationNumberG1,
              ]
            : null,
          tenant?.bail?.fullNameG2
            ? ["Nome completo (Fiador 2)", tenant?.bail?.fullNameG2]
            : null,
          tenant?.bail?.fullNameG2
            ? [
                "Data de nascimento (Fiador 2)",
                dateFormatter({
                  value: tenant?.bail?.birthDateG2,
                }),
              ]
            : null,
          tenant?.bail?.fullNameG2
            ? ["RG (Fiador 2)", tenant?.bail?.rgG2]
            : null,
          tenant?.bail?.fullNameG2
            ? ["CPF / CNPJ (Fiador 2)", tenant?.bail?.cpfG2]
            : null,
          tenant?.bail?.fullNameG2
            ? ["Nacionalidade (Fiador 2)", tenant?.bail?.nationalityG2]
            : null,
          tenant?.bail?.fullNameG2
            ? ["Estado civil (Fiador 2)", tenant?.bail?.maritalStatusG2]
            : null,
          tenant?.bail?.fullNameG2
            ? ["Profissão (Fiador 2)", tenant?.bail?.professionG2]
            : null,
          tenant?.bail?.fullNameG2
            ? ["E-mail (Fiador 2)", tenant?.bail?.emailG2]
            : null,
          tenant?.bail?.fullNameG2
            ? ["Contato 1 (Fiador 2)", tenant?.bail?.contact1G2]
            : null,
          tenant?.bail?.fullNameG2
            ? ["Contato 2 (Fiador 2)", tenant?.bail?.contact2G2]
            : null,
          tenant?.bail?.fullNameG2
            ? ["CEP (Fiador 2)", tenant?.bail?.cepG2]
            : null,
          tenant?.bail?.fullNameG2
            ? ["Cidade (Fiador 2)", tenant?.bail?.cityG2]
            : null,
          tenant?.bail?.fullNameG2
            ? ["Estado (Fiador 2)", tenant?.bail?.districtG2]
            : null,
          tenant?.bail?.fullNameG2
            ? ["Endereço (Fiador 2)", tenant?.bail?.addressG2]
            : null,
          tenant?.bail?.spouseFullNameG2
            ? ["Nome completo (Cônjuge 2)", tenant?.bail?.spouseFullNameG2]
            : null,
          tenant?.bail?.spouseFullNameG2
            ? [
                "Data de nascimento (Cônjuge 2)",
                dateFormatter({
                  value: tenant?.bail?.spouseBirthDateG2,
                }),
              ]
            : null,
          tenant?.bail?.spouseFullNameG2
            ? ["RG (Cônjuge 2)", tenant?.bail?.spouseRgG2]
            : null,
          tenant?.bail?.spouseFullNameG2
            ? ["CPF (Cônjuge 2)", tenant?.bail?.spouseCpfG2]
            : null,
          tenant?.bail?.spouseFullNameG2
            ? ["Nacionalidade (Cônjuge 2)", tenant?.bail?.spouseNationalityG2]
            : null,
          tenant?.bail?.spouseFullNameG2
            ? ["Profissão (Cônjuge 2)", tenant?.bail?.spouseProfessionG2]
            : null,
          tenant?.bail?.spouseFullNameG2
            ? ["Contato1 (Cônjuge 2)", tenant?.bail?.spouseContact1G2]
            : null,
          tenant?.bail?.bailPropertyCepG2
            ? ["CEP (Imóvel de fiança 2)", tenant?.bail?.bailPropertyCepG2]
            : null,
          tenant?.bail?.bailPropertyCepG2
            ? ["Cidade (Imóvel de fiança 2)", tenant?.bail?.bailPropertyCityG2]
            : null,
          tenant?.bail?.bailPropertyCepG2
            ? [
                "Estado (Imóvel de fiança 2)",
                tenant?.bail?.bailPropertyDistrictG2,
              ]
            : null,
          tenant?.bail?.bailPropertyCepG2
            ? [
                "Endereço (Imóvel de fiança 2)",
                tenant?.bail?.bailPropertyAddressG2,
              ]
            : null,
          tenant?.bail?.bailPropertyCepG2
            ? [
                "Nº de matricula (Imóvel de fiança 2)",
                tenant?.bail?.bailPropertyRegistrationNumberG2,
              ]
            : null,
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
