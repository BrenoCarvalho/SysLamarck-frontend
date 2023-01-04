import { useContext } from "react";
import Page from "../components/Page.component";
import { Context } from "../context/AuthContext";
import { Flex, Text } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";

const Home = () => {
  const { user } = useContext(Context);

  const date = new Date(user?.createdAt);

  return (
    <Page alignItems="center" title="Início">
      <Flex
        h="100%"
        direction={["column", "column", "column", "row"]}
        justifyContent="center"
        bg="#fff"
        p="12"
        borderRadius="lg"
        shadow="lg"
      >
        <Flex
          direction="column"
          justifyContent="center"
          textAlign="center"
          align="center"
          gap="3"
        >
          <BsFillPersonFill className="text-5xl group-hover:text-white" />
          <Flex direction="column">
            <Text fontWeight="bold">Nome</Text>
            <Text>{user?.fullName}</Text>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">Username</Text>
            <Text>{user?.username}</Text>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">E-mail</Text>
            <Text>{user?.email}</Text>
          </Flex>
          <Flex direction="column">
            <Text fontWeight="bold">Criado</Text>
            <Text>{date.toLocaleDateString()}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Page>
  );
};

export default Home;
