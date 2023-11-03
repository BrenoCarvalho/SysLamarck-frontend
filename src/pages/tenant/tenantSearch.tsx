import Page from "../../components/Page.component";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import TenantService from "../../services/tenantService";
import { useState } from "react";
import Alert from "../../components/modals/Alert.component";
import { useNavigate } from "react-router-dom";
import TenantVisualizationModal from "../../components/modals/visualization/TenantVisualization.component.";
import TenantTable from "../../components/tables/TenantTable.component";
import ConfirmDialog from "../../components/modals/ConfirmDialog.component";
import PdfViewer from "../../components/modals/ReceiptViewer.component";

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

  const {
    isOpen: showRegistrationFormIsOpen,
    onOpen: showRegistrationFormOnOpen,
    onClose: showRegistrationFormOnClose,
  } = useDisclosure();

  const [blobPdfLink, setBlobPdfLink] = useState("");

  const [selected, setSelected] = useState<any>();

  const deleteTenant = async () => {
    const response = await TenantService.delete(selected?.id);
    if (response === 1) {
      successDeletedDialogOnOpen();
    }
  };

  const showRegistrationForm = () => {
    if (!selected) return;

    showRegistrationFormOnOpen();

    TenantService.registrationForm({
      tenantId: selected?.id,
    }).then((value) => {
      const blob = new Blob([value.data], { type: "application/pdf" });
      setBlobPdfLink(window.URL.createObjectURL(blob));
    });
  };

  return (
    <Page
      menuGroup="Consulta"
      title="Locatário"
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
                  ? () => navigate(`/editar/locatario/${selected.id}`)
                  : () => {
                      console.log("Selecione algum locatário");
                    }
              }
            >
              Editar
            </Button>
          </Flex>
          <Flex gap="10px">
            <Button
              mt={2}
              w={180}
              bg="gray.800"
              color="#fff"
              _hover={{ backgroundColor: "gray.900" }}
              onClick={
                selected
                  ? () => showRegistrationForm()
                  : () => {
                      console.log("Selecione algum locatário");
                    }
              }
            >
              Ficha de cadastro
            </Button>
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
      </Flex>

      <ConfirmDialog
        isOpen={isOpenConfirmDelete}
        onClose={onCloseConfirmDelete}
        onConfirm={deleteTenant}
        title="Confirmar exclusão"
        message={`Tem certeza que deseja excluir o locatário ${selected?.id}?`}
      />

      <Alert
        onClose={successDeletedDialogOnClose}
        isOpen={successDeletedDialogIsOpen}
        title="Sucesso!"
        message="Locatário deletado com sucesso."
      />

      <PdfViewer
        isOpen={showRegistrationFormIsOpen}
        onClose={() => {
          setBlobPdfLink("");
          showRegistrationFormOnClose();
        }}
        isLoading={!(blobPdfLink?.length > 0)}
        content={blobPdfLink}
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
