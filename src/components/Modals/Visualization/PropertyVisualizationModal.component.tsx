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
import PropertyService from "../../../services/PropertyService";
import { propertyCodeFormatter } from "../../../services/Formatters";

const PropertyVisualizationModal = ({
  onClose,
  isOpen,
  propertySelected,
}: any) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        const property = await PropertyService.get(propertySelected?.id, true);

        setData([
          ["ID do imóvel", property.id],
          [
            "Código do imóvel",
            propertyCodeFormatter({ value: property.propertyCode }),
          ],
          ["Código do locador", property.locator.id],
          ["Imóvel", property.property],
          ["Nome do locador", property.locator.fullName],
          ["Tipo do Imóvel", property.propertyType],
          ["CEP", property.cep],
          ["Cidade", property.city],
          ["Bairro", property.district],
          ["Endereço", property.address],
          ["Descrição do Imóvel", property.propertyDescription],
          ["Pagador do IPTU", property.IPTUPayer],
          ["Declaração DIMOB", property.DIMOBDeclaration ? "Sim" : "Não"],
          ["Objetivo", property.goalOfProperty],
          ["Taxa de locação", property.leaseFee],
          ["Taxa de administração", property.administrationTax],
          ["Valor Integral", property.integralValue],
          ["Valor locação", property.leaseAmount],
          ["Valor de venda", property.sellValue],
          ["Vago", property.vacant ? "Sim" : "Não"],
          ["Nº de matricula", property.registrationNumber],
          ["Código Municipal", property.cityCode],
          ["Nº IPTU", property.IPTUNumber],
          ["Valor do IPTU integral", property.IntegralIPTUValue],
          ["Nº de parcelas", property.numberInstallments],
          ["Valor IPTU parcelado", property.installmentsIPTUValue],
          ["Instalação EDP", property.edpInstallation],
          ["RGI", property.rgi],
          ["Fornecimento", property.supply],
        ]);
      };
      loadData();
    }
  }, [isOpen, propertySelected?.id]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Imóvel</ModalHeader>
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

export default PropertyVisualizationModal;
