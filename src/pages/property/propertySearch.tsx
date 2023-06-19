import Page from "../../components/Page.component";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import PropertyService from "../../services/propertyService";
import PropertyTable from "../../components/tables/PropertyTable.component";
import ConfirmDelete from "../../components/modals/ConfirmDelete.component";
import { useState } from "react";
import Alert from "../../components/modals/Alert.component";
import { useNavigate } from "react-router-dom";
import PropertyVisualizationModal from "../../components/modals/visualization/PropertyVisualizationModal.component";
import { propertyCodeFormatter } from "../../services/formatters";

const PropertySearch = () => {
  const navigate = useNavigate();

  const {
    isOpen: isOpenConfirmDelete,
    onOpen: onOpenConfirmDelete,
    onClose: onCloseConfirmDelete,
  } = useDisclosure();

  const {
    isOpen: successDeletedDialogIsOpen,
    onOpen: successDeletedDialogOnOpen,
    onClose: successDeletedDialogOnClose,
  } = useDisclosure();

  const {
    isOpen: visualizationModalDialogIsOpen,
    onOpen: visualizationModalDialogOnOpen,
    onClose: visualizationModalDialogOnClose,
  } = useDisclosure();

  const [selected, setSelected] = useState<any>();

  const deleteProperty = async () => {
    const response = await PropertyService.delete(selected.id);
    if (response === 1) {
      successDeletedDialogOnOpen();
    }
  };

  return (
    <Page
      menuGroup="Consulta"
      title="Imóvel"
      direction="column"
      hScreenSize
      paddingBottom="-2"
    >
      <Flex
        w="100%"
        h="100%"
        direction="column"
        justifyContent="center"
        bg="#fff"
        p="1"
        borderRadius="lg"
        shadow="lg"
        gap="1"
      >
        <PropertyTable
          setSelected={setSelected}
          deleteCallback={successDeletedDialogIsOpen}
        />
        <Flex justifyContent="space-between" padding="2">
          <Flex>
            <Button
              mt={2}
              mr={2}
              w={150}
              _hover={{ color: "red.700" }}
              variant="unstyled"
              shadow="md"
              onClick={
                selected
                  ? onOpenConfirmDelete
                  : () => {
                      console.log("Selecione algum imóvel");
                    }
              }
            >
              Remover
            </Button>
            <Button
              mt={2}
              w={150}
              bg="gray.800"
              color="#fff"
              _hover={{ backgroundColor: "gray.900" }}
              onClick={
                selected
                  ? () => navigate(`/editar/imovel/${selected.id}`)
                  : () => {
                      console.log("Selecione algum imóvel");
                    }
              }
            >
              Editar
            </Button>
          </Flex>
          <Button
            mt={2}
            w={150}
            bg="gray.800"
            color="#fff"
            _hover={{ backgroundColor: "gray.900" }}
            onClick={
              selected
                ? () => visualizationModalDialogOnOpen()
                : () => {
                    console.log("Selecione algum imóvel");
                  }
            }
          >
            Visualizar
          </Button>
        </Flex>
      </Flex>

      <ConfirmDelete
        isOpen={isOpenConfirmDelete}
        onClose={onCloseConfirmDelete}
        onConfirm={deleteProperty}
        message={`Tem certeza que deseja excluir o imóvel ${propertyCodeFormatter(
          { value: selected?.propertyCode }
        )}?`}
      />

      <Alert
        onClose={successDeletedDialogOnClose}
        isOpen={successDeletedDialogIsOpen}
        title="Sucesso!"
        message="Imóvel deletado com sucesso."
      />

      <PropertyVisualizationModal
        onClose={visualizationModalDialogOnClose}
        isOpen={visualizationModalDialogIsOpen}
        propertySelected={selected}
      />
    </Page>
  );
};

export default PropertySearch;
