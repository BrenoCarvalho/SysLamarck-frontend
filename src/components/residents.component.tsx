import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  Flex,
  Divider,
  Button,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import InputMask from "react-input-mask";
import { FaTrash } from "react-icons/fa";

const Input = ({ title, placeholder = title, ...props }: any) => {
  return (
    <FormControl w="100%">
      <FormLabel
        fontSize="sm"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {title}
      </FormLabel>
      <ChakraInput as={InputMask} placeholder={placeholder} {...props} />
    </FormControl>
  );
};

const AddResident = ({ residents, setResidents }: any) => {
  const [fullName, setFullName] = useState<string>();
  const [rg, setRg] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [contact1, setContact1] = useState<string>();

  const fields = [
    <Input
      title="Nome completo"
      onChange={(value: any) => setFullName(value?.target?.value)}
      value={fullName}
    />,
    <Input
      title="RG"
      onChange={(value: any) => setRg(value?.target?.value)}
      value={rg}
    />,
    <Input
      title="CPF / CNPJ"
      onChange={(value: any) => setCpf(value?.target?.value)}
      mask={
        cpf
          ? cpf?.length <= 14
            ? "***.***.***-*****"
            : "**.***.***/****-**"
          : null
      }
      value={cpf}
      maskChar={null}
    />,
    <Input
      title="Contato 1"
      value={contact1}
      onChange={(value: any) => setContact1(value?.target?.value)}
      mask={
        contact1
          ? contact1?.length <= 12
            ? "** ****-*****"
            : "** *****-****"
          : null
      }
      maskChar={null}
    />,
  ];

  const fieldList = [1, 2, 3, 4];

  return (
    <Flex direction="column">
      <Flex gap={6} direction="column">
        {fieldList.map((value: number, index: number) => {
          return index % 2 === 0 ? (
            <Flex gap="6">
              {fields[fieldList[index] - 1]}
              {fields[fieldList[index + 1] - 1]}
            </Flex>
          ) : null;
        })}
      </Flex>

      <Button
        w="100%"
        bg="gray.800"
        color="#fff"
        _hover={{ backgroundColor: "gray.900" }}
        onClick={() => {
          setResidents([...residents, { fullName, rg, cpf, contact1 }]);
          setFullName("");
          setRg("");
          setCpf("");
          setContact1("");
        }}
        mt="7"
      >
        Adicionar morador
      </Button>
    </Flex>
  );
};

const ListResidents = ({ residents, setResidents }: any) => {
  return (
    <Flex gap="2.5" direction="column">
      {residents.map((resident: any) => (
        <Flex
          w="100%"
          shadow="sm"
          border="1px"
          borderColor="gray.200"
          borderRadius="8"
          fontSize="sm"
          justifyContent="space-between"
          align="center"
        >
          <Flex padding="3" gap="1" ml="1" direction="column">
            <Flex gap="1">
              <Text fontWeight="bold">Nome:</Text> {resident?.fullName}
            </Flex>
            <Flex gap="1">
              <Text fontWeight="bold">RG:</Text> {resident?.rg}
            </Flex>
            <Flex gap="1">
              <Text fontWeight="bold">CPF:</Text> {resident?.cpf}
            </Flex>
            <Flex gap="1">
              <Text fontWeight="bold">Contato1:</Text> {resident?.contact1}
            </Flex>
          </Flex>

          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<FaTrash />}
            color="#000"
            backgroundColor="#fff"
            _hover={{ backgroundColor: "#fff", color: "red.600" }}
            fontSize="xl"
            mr="3"
            onClick={() => {
              const newResidents = residents;
              newResidents.splice(residents?.indexOf(resident), 1);

              setResidents([...newResidents]);
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

const Residents = ({ residents, setResidents }: any) => {
  console.log(residents);

  return (
    <FormControl>
      <FormLabel>Moradores</FormLabel>
      <Divider mb="6" mt="4" />

      <Flex direction="column" gap={residents?.length ? "7" : "0"}>
        <ListResidents residents={residents} setResidents={setResidents} />
        <AddResident residents={residents} setResidents={setResidents} />
      </Flex>
    </FormControl>
  );
};

export default Residents;
