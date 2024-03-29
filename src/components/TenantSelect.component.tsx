import { FormControl } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import TenantService from "../services/tenantService";

const TenantSelect = ({
  onUpdateTenantId,
  variant,
}: {
  onUpdateTenantId: (id: number) => void;
  variant?: "filled" | "flushed" | "outline" | "unstayled";
}) => {
  const [data, setData] = useState<{ value: string; label: string }[] | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
      const data = (await TenantService.getData())?.map((tenant: any) => ({
        value: tenant.id,
        label: tenant.fullName,
      }));

      setData(data);
    };

    if (!data) loadData();
  }, [data]);

  return (
    <FormControl w="100%">
      <Select
        name="tenant"
        placeholder="Locatário"
        variant={variant ?? "flushed"}
        options={data ?? []}
        onChange={(selected: any) => onUpdateTenantId(selected.value)}
      />
    </FormControl>
  );
};

export default TenantSelect;
