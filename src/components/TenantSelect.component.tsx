import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

const TenantSelect = ({
  tenantName,
  updateTenant,
}: {
  tenantName: string;
  updateTenant: any;
}) => (
  <FormControl w="100%">
    <FormLabel fontSize="sm">
      Locatário:{" "}
      {tenantName.length >= 39
        ? `${tenantName.substring(0, 36)}...`
        : tenantName}
    </FormLabel>
    <NumberInput
      onChange={(value) => {
        updateTenant(value);
      }}
      min={0}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </FormControl>
);

export default TenantSelect;
