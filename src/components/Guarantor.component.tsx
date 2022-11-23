import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
} from "@chakra-ui/react";

const Guarantor = ({
  spouse,
  setSpouse,
  immobileBail,
  setImmobileBail,
}: any) => {
  return (
    <>
      {/* Row 2 */}
      <Flex mt="6" w="100%">
        <FormControl w="100%">
          <FormLabel fontSize="sm">Nome completo</FormLabel>
          <Input placeholder="Digite seu nome" />
        </FormControl>
      </Flex>
      {/* Row 3 */}
      <Flex mt="6">
        <FormControl w="50%" mr="6">
          <FormLabel fontSize="sm">Nacionalidade</FormLabel>
          <Input placeholder="Digite seu nome" />
        </FormControl>
        <FormControl w="50%">
          <FormLabel
            fontSize="sm"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            Data de Nascimento
          </FormLabel>
          <Input placeholder="Select Date and Time" size="md" type="date" />
        </FormControl>
      </Flex>
      {/* Row 4 */}
      <Flex mt="6">
        <FormControl w="50%" mr="6">
          <FormLabel fontSize="sm">Telefone</FormLabel>
          <Input placeholder="Telefone" />
        </FormControl>
        <FormControl w="50%">
          <FormLabel fontSize="sm">Celular</FormLabel>
          <Input placeholder="Celular 1" />
        </FormControl>
      </Flex>
      {/* Row 5 */}
      <Flex mt="6">
        <FormControl w="50%" mr="6">
          <FormLabel fontSize="sm">E-mail</FormLabel>
          <Input placeholder="Email" />
        </FormControl>
        <FormControl w="50%">
          <FormLabel fontSize="sm">RG / IE</FormLabel>
          <Input placeholder="RG" />
        </FormControl>
      </Flex>
      {/* Row 6 */}
      <Flex mt="6">
        <FormControl w="50%" mr="6">
          <FormLabel fontSize="sm">CPF / CNPJ</FormLabel>
          <Input placeholder="CPF / CNPJ" />
        </FormControl>
        <FormControl w="50%">
          <FormLabel fontSize="sm">Profissão</FormLabel>
          <Input placeholder="Profissão" />
        </FormControl>
      </Flex>
      {/* Row 7 */}
      <Flex mt="6">
        <FormControl w="50%" mr="6">
          <FormLabel fontSize="sm">Empresa</FormLabel>
          <Input placeholder="Empresa" />
        </FormControl>
        <FormControl w="50%">
          <FormLabel fontSize="sm">Telefone da empresa</FormLabel>
          <Input placeholder="Telefone da empresa" />
        </FormControl>
      </Flex>
      {/* Row 8 */}
      <Flex mt="6">
        <FormControl w="50%" mr="6">
          <FormLabel fontSize="sm">CEP</FormLabel>
          <Input placeholder="CEP" />
        </FormControl>
        <FormControl w="50%">
          <FormLabel fontSize="sm">Bairro</FormLabel>
          <Input placeholder="Bairro" />
        </FormControl>
      </Flex>
      {/* Row 9 */}
      <Flex mt="6">
        <FormControl w="100%">
          <FormLabel fontSize="sm">Logradouro</FormLabel>
          <Input placeholder="Logradouro" />
        </FormControl>
      </Flex>
      {/* Row 10 */}
      <Flex mt="6">
        <FormControl w="50%" mr="6">
          <FormLabel fontSize="sm">Estado</FormLabel>
          <Input placeholder="Estado" />
        </FormControl>
        <FormControl w="50%">
          <FormLabel fontSize="sm">Cidade</FormLabel>
          <Input placeholder="Cidade" />
        </FormControl>
      </Flex>
      {/* Row 11 */}
      <Flex mt="6">
        <FormControl w="50%" mr="6">
          <FormLabel fontSize="sm">Renda</FormLabel>
          <Input placeholder="R$" />
        </FormControl>
        <FormControl w="50%">
          <FormLabel fontSize="sm">Estado Civil</FormLabel>
          <Input placeholder="Estado Civil" />
        </FormControl>
      </Flex>
      {/* Row 12 */}
      <Flex mt="6" w="100%">
        <FormControl alignItems="center" mr="6">
          <FormLabel fontSize="sm">Cônjugue</FormLabel>
          <Switch
            size="lg"
            onChange={() => setSpouse(!spouse)}
            value={+spouse}
          />
        </FormControl>
        <FormControl alignItems="center">
          <FormLabel fontSize="sm">Imóvel de fiança</FormLabel>
          <Switch
            size="lg"
            onChange={() => setImmobileBail(!immobileBail)}
            value={+immobileBail}
          />
        </FormControl>
      </Flex>
      {spouse ? (
        <>
          {/* Section Conjugue */}
          <Text mt="8">Cônjugue</Text>
          <Divider mb="6" mt="4" />
          {/* Row 1 */}
          <Flex w="100%">
            <FormControl w="100%">
              <FormLabel fontSize="sm">Nome completo</FormLabel>
              <Input placeholder="Digite seu nome" />
            </FormControl>
          </Flex>
          {/* Row 2 */}
          <Flex mt="6" w="100%">
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">RG</FormLabel>
              <Input placeholder="RG" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel fontSize="sm">CPF</FormLabel>
              <Input placeholder="CPF" />
            </FormControl>
          </Flex>
          {/* Row 3 */}
          <Flex mt="6" w="100%">
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">Telefone</FormLabel>
              <Input placeholder="Telefone" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel fontSize="sm">Profissão</FormLabel>
              <Input placeholder="Profissão" />
            </FormControl>
          </Flex>
          {/* Row 4 */}
          <Flex mt="6" w="100%">
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">Empresa</FormLabel>
              <Input placeholder="Empresa" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel fontSize="sm">Renda</FormLabel>
              <Input placeholder="R$" />
            </FormControl>
          </Flex>
        </>
      ) : null}
      {immobileBail ? (
        <>
          {/* Section Conjugue */}
          <Text mt="8">Imóvel de fiança</Text>
          <Divider mb="6" mt="4" />
          {/* Row 1 */}
          <Flex w="100%">
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">Número da matricula</FormLabel>
              <Input placeholder="Nº" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel fontSize="sm">Número do livro</FormLabel>
              <Input placeholder="Nº" />
            </FormControl>
          </Flex>
          {/* Row 2 */}
          <Flex mt="6" w="100%">
            <FormControl w="100%">
              <FormLabel fontSize="sm">Logradouro</FormLabel>
              <Input placeholder="Logradouro" />
            </FormControl>
          </Flex>
          {/* Row 3 */}
          <Flex mt="6" w="100%">
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">CEP</FormLabel>
              <Input placeholder="CEP" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel fontSize="sm">Bairro</FormLabel>
              <Input placeholder="Bairro" />
            </FormControl>
          </Flex>
          {/* Row 4 */}
          <Flex mt="6" w="100%">
            <FormControl w="100%" mr="6">
              <FormLabel fontSize="sm">Cidade</FormLabel>
              <Input placeholder="Cidade" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel fontSize="sm">Estado</FormLabel>
              <Input placeholder="Estado" />
            </FormControl>
          </Flex>
        </>
      ) : null}
    </>
  );
};

export default Guarantor;
