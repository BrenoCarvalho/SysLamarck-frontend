import { Flex, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useState } from "react";
import MunicipalData from "./Basics/MunicipalData.component";
import PersonalData from "./Basics/PersonalData.component";
import ResidentialData from "./Basics/ResidentialData.component";

const Guarantor = () => {
  const [spouse, setSpouse] = useState(false);
  const [immobileBail, setImmobileBail] = useState(false);

  return (
    <Flex w="100%" h="100%" direction="column" gap="6">
      <PersonalData showHeader={false} />
      <ResidentialData fieldList={[1, 2, 3, 4]} showHeader={false} />

      <Flex w="100%">
        <FormControl alignItems="center" mr="6">
          <FormLabel fontSize="sm">Cônjugue</FormLabel>
          <Switch onChange={() => setSpouse(!spouse)} value={+spouse} />
        </FormControl>
        <FormControl alignItems="center">
          <FormLabel fontSize="sm">Imóvel de fiança</FormLabel>
          <Switch
            onChange={() => setImmobileBail(!immobileBail)}
            value={+immobileBail}
          />
        </FormControl>
      </Flex>
      {spouse ? (
        <>
          <PersonalData
            fieldList={[1, 2, 3, 4, 5, 7, 9]}
            showHeader={true}
            headerTitle="Cônjugue"
          />
        </>
      ) : null}
      {immobileBail ? (
        <>
          <ResidentialData
            fieldList={[1, 2, 3, 4]}
            headerTitle="Imóvel de fiança"
          />
          <MunicipalData fieldList={[1]} showHeader={false} />
        </>
      ) : null}
    </Flex>
  );
};

export default Guarantor;
