import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LocatorService from "../../../services/locatorService";
import { Select as SelectSearchable } from "chakra-react-select";

interface PropertyInputsProps {
  showHeader?: boolean;
  headerTitle?: string;
  componentNames?: any;
  handleChange?: any;
  values?: any;
}

const PropertyInputs = ({
  showHeader = true,
  headerTitle = "Dados do imóvel",
  componentNames = {},
  handleChange,
  values,
}: PropertyInputsProps) => {
  const [locators, setLocators] = useState<
    { value: string; label: string }[] | null
  >();

  const [locator, setLocator] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const updateLocator = async (locatorId: string | number) => {
    if (!locatorId) return;
    handleChange(componentNames?.locatorId)(`${locatorId}`);
  };

  useEffect(() => {
    const loadData = async () => {
      const data = (await LocatorService.getData())?.map((locator: any) => ({
        value: locator.id,
        label: locator.fullName,
      }));

      setLocators(data);
    };

    if (!locators) loadData();
  }, [locators]);

  useEffect(() => {
    if (!locator && values) {
      const oldLocator = locators?.find(
        (item) => `${item.value}` === `${values?.locatorId}`
      );

      if (oldLocator) setLocator(oldLocator);
    }
  }, [locator, locators, values]);

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
          <FormLabel fontSize="sm">Locador</FormLabel>
          <SelectSearchable
            name="locator"
            placeholder="Selecione o locador"
            variant="outline"
            options={locators ?? []}
            value={locator}
            onChange={(selected: any) => {
              setLocator(selected);
              updateLocator(selected.value);
            }}
          />
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

export default PropertyInputs;
