import Page from "../components/Page.component";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import TenantService from "../services/TenantService";
import ConfirmDelete from "../components/Modals/ConfirmDelete.component";
import { useState } from "react";
import Alert from "../components/Modals/Alert.component";
import { useNavigate } from "react-router-dom";
import TenantVisualizationModal from "../components/Modals/Visualization/TenantVisualization.component.";
import TenantTable from "../components/Tables/TenantTable.component";

const TenantSearch = () => {
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

  const deleteTenant = async () => {
    const response = await TenantService.delete(selected?.tenantCode);
    if (response === 1) {
      successDeletedDialogOnOpen();
    }
  };

  return (
    <Page
      title="Consulta de imóvel"
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
        <TenantTable
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
                      console.log("Selecione algum locatário");
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
                    console.log("Selecione algum locatário");
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
        onConfirm={deleteTenant}
        message={`Tem certeza que deseja excluir o locatário ${selected?.tenantCode}?`}
      />

      <Alert
        onClose={successDeletedDialogOnClose}
        isOpen={successDeletedDialogIsOpen}
        title="Sucesso!"
        message="Locatário deletado com sucesso."
      />

      <TenantVisualizationModal
        onClose={visualizationModalDialogOnClose}
        isOpen={visualizationModalDialogIsOpen}
        propertySelected={selected}
      />
    </Page>
  );
};

export default TenantSearch;
