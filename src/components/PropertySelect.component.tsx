import { FormControl } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import PropertyService from "../services/propertyService";

const PropertySelect = ({
  onUpdatePropertyCode,
  variant,
}: {
  onUpdatePropertyCode: (propertyCode: string) => void;
  variant?: "filled" | "flushed" | "outline" | "unstayled";
}) => {
  const [data, setData] = useState<{ value: string; label: string }[] | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
      const data = (await PropertyService.getData())?.map((peropety: any) => ({
        value: peropety.propertyCode,
        label: peropety.address,
      }));

      setData(data);
    };

    if (!data) loadData();
  }, [data]);

  return (
    <FormControl w="100%">
      <Select
        name="property"
        placeholder="Imóvel"
        variant={variant ?? "flushed"}
        options={data ?? []}
        onChange={(selected: any) => onUpdatePropertyCode(selected.value)}
      />
    </FormControl>
  );
};

export default PropertySelect;
