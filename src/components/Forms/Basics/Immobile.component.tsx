import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LocatorService from "../../../services/LocatorService";

const Immobile = ({
  showHeader = true,
  headerTitle = "Dados do imóvel",
  componentNames = {},
  handleChange,
  values,
}: {
  showHeader?: boolean;
  headerTitle?: string;
  componentNames?: any;
  handleChange?: any;
  values?: any;
}) => {
  const [locatorName, setLocatorName] = useState("Não identificado");

  const getLocatorName = async (locatorCode: string | number) => {
    const locator = await LocatorService?.get(Number(locatorCode));
    return locator?.fullName;
  };

  const updateLocator = async (locatorCode: string | number) => {
    const locatorName = await getLocatorName(locatorCode);

    setLocatorName(locatorName ? locatorName : "Não identificado");
    handleChange(componentNames?.locatorCode)(locatorCode);
  };

  useEffect(() => {
    const updateLocatorName = async () => {
      const newLocatorName = await getLocatorName(values?.locatorCode);
      if (newLocatorName && newLocatorName !== locatorName) {
        setLocatorName(newLocatorName);
      }
    };

    updateLocatorName();
  }, [locatorName, values?.locatorCode]);

  return (
    <FormControl>
      {showHeader ? (
        <>
          <FormLabel>{headerTitle}</FormLabel>
          <Divider mb="6" mt="4" />
        </>
      ) : null}

      <Flex gap="6">
        <FormControl w="100%">
          <FormLabel fontSize="sm">
            Locador:{" "}
            {locatorName.length >= 39
              ? `${locatorName.substring(0, 36)}...`
              : locatorName}
          </FormLabel>
          <NumberInput
            onChange={(value) => {
              updateLocator(value);
            }}
            name={componentNames?.locatorCode}
            value={values?.locatorCode}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl w="100%">
          <FormLabel fontSize="sm">Tipo do Imóvel</FormLabel>
          <Select
            placeholder="Selecionar"
            onChange={handleChange}
            name={componentNames?.propertyType}
            value={values?.propertyType}
          >
            <option>Residencial</option>
            <option>Apartamento</option>
            <option>Comercial</option>
            <option>Terreno</option>
          </Select>
        </FormControl>
      </Flex>
    </FormControl>
  );
};

export default Immobile;
