import Page from "../../components/Page.component";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import LocatorService from "../../services/locatorService";
import LocatorTable from "../../components/tables/LocatorTable.component";
import ConfirmDelete from "../../components/modals/ConfirmDelete.component";
import { useState } from "react";
import Alert from "../../components/modals/Alert.component";
import { useNavigate } from "react-router-dom";
import LocatorVisualizationModal from "../../components/modals/visualization/LocatorVisualizationModal.component";

const LocatorSearch = () => {
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

  const deleteLocator = async () => {
    const response = await LocatorService.delete(selected.id);
    if (response === 1) {
      successDeletedDialogOnOpen();
    }
  };

  return (
    <Page
      menuGroup="Consulta"
      title="Locador"
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
        <LocatorTable
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
                      console.log("Selecione algum locatário");
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
                  ? () => navigate(`/editar/locador/${selected?.id}`)
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
        onConfirm={deleteLocator}
        message={`Tem certeza que deseja excluir o locatário ${selected?.fullName}?`}
      />

      <Alert
        onClose={successDeletedDialogOnClose}
        isOpen={successDeletedDialogIsOpen}
        title="Sucesso!"
        message="Locatário deletado com sucesso."
      />

      <LocatorVisualizationModal
        onClose={visualizationModalDialogOnClose}
        isOpen={visualizationModalDialogIsOpen}
        locatorSelected={selected}
      />
    </Page>
  );
};

export default LocatorSearch;
