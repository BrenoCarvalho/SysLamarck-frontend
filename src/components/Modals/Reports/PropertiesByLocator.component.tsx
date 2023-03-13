import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LocatorService from "../../../services/LocatorService";
import ReportViewer from "./ReportViewer.component";
import PropertiesByLocator from "../../documents/properties/PropertiesByLocator";

const PropertiesByLocatorModal = ({ isOpen, onClose }: any) => {
  const {
    isOpen: isOpenPropertiesByLocator,
    onOpen: onOpenPropertiesByLocator,
    onClose: onClosePropertiesByLocator,
  } = useDisclosure();

  const [locatorCode, setLocatorCode] = useState<any>();
  const [locatorName, setLocatorName] = useState("Não identificado");

  const getLocatorName = async (locatorCode: string | number) => {
    const locator = await LocatorService?.get(Number(locatorCode));
    return locator?.fullName;
  };

  const updateLocator = async (locatorCode: string | number) => {
    const locatorName = await getLocatorName(locatorCode);

    setLocatorCode(locatorCode);
    setLocatorName(locatorName ? locatorName : "Não identificado");
  };

  useEffect(() => {
    const updateLocatorName = async () => {
      const newLocatorName = await getLocatorName(locatorCode);
      if (newLocatorName && newLocatorName !== locatorName) {
        setLocatorName(newLocatorName);
      }
    };

    updateLocatorName();
  }, [locatorName, locatorCode]);

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Digite o código do locador</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl w="100%">
              <FormLabel fontSize="sm">
                Locador:{" "}
                {locatorName.length >= 42
                  ? `${locatorName.substring(0, 39)}...`
                  : locatorName}
              </FormLabel>
              <NumberInput
                onChange={(value) => updateLocator(value)}
                value={locatorCode}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onClose();
                onOpenPropertiesByLocator();
              }}
            >
              Gerar relatório
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ReportViewer
        isOpen={isOpenPropertiesByLocator}
        onClose={onClosePropertiesByLocator}
        report={<PropertiesByLocator locatorCode={locatorCode} />}
      />
    </>
  );
};

export default PropertiesByLocatorModal;
