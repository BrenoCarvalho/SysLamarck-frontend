import { Flex, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MunicipalInputs from "./basics/MunicipalInputs.component";
import PersonalInputs from "./basics/PersonalInputs.component";
import ResidentialInputs from "./basics/ResidentialInputs.component";

const GuarantorInputs = ({
  componentNames = {},
  handleChange,
  values,
}: {
  componentNames?: any;
  handleChange?: any;
  values?: any;
}) => {
  const [spouse, setSpouse] = useState(false);
  const [immobileBail, setImmobileBail] = useState(false);

  useEffect(() => {
    if (componentNames && values) {
      if (values[componentNames?.spouse?.personalData?.fullName]) {
        setSpouse(true);
      }
      if (values[componentNames?.propertyBail?.residentialData?.cep]) {
        setImmobileBail(true);
      }
    }
  }, [
    componentNames,
    componentNames?.spouse,
    componentNames?.spouse?.personalData?.fullName,
    values,
  ]);

  return (
    <Flex w="100%" h="100%" direction="column" gap="6">
      <PersonalInputs
        showHeader={false}
        componentNames={componentNames?.personalData}
        handleChange={handleChange}
        values={values}
      />
      <ResidentialInputs
        fieldList={[1, 2, 3, 4]}
        showHeader={false}
        componentNames={componentNames?.residentialData}
        handleChange={handleChange}
        values={values}
      />

      <Flex w="100%">
        <FormControl alignItems="center" mr="6">
          <FormLabel fontSize="sm">Cônjuge</FormLabel>
          <Switch onChange={() => setSpouse(!spouse)} isChecked={spouse} />
        </FormControl>
        <FormControl alignItems="center">
          <FormLabel fontSize="sm">Imóvel de fiança</FormLabel>
          <Switch
            onChange={() => setImmobileBail(!immobileBail)}
            isChecked={immobileBail}
          />
        </FormControl>
      </Flex>
      {spouse ? (
        <>
          <PersonalInputs
            fieldList={[1, 2, 3, 4, 5, 7, 9]}
            showHeader={true}
            headerTitle="Cônjuge"
            componentNames={componentNames?.spouse?.personalData}
            handleChange={handleChange}
            values={values}
          />
        </>
      ) : null}
      {immobileBail ? (
        <>
          <ResidentialInputs
            fieldList={[1, 2, 3, 4]}
            headerTitle="Imóvel de fiança"
            componentNames={componentNames?.propertyBail?.residentialData}
            handleChange={handleChange}
            values={values}
          />
          <MunicipalInputs
            fieldList={[1]}
            showHeader={false}
            componentNames={componentNames?.propertyBail?.municipalData}
            handleChange={handleChange}
            values={values}
          />
        </>
      ) : null}
    </Flex>
  );
};

export default GuarantorInputs;
