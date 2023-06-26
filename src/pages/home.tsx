import { useContext } from "react";
import Page from "../components/Page.component";
import { AuthContext } from "../context/AuthContext";
import { Divider, Flex, Text } from "@chakra-ui/react";

const Home = () => {
  const { user } = useContext(AuthContext);

  const date = new Date(user?.createdAt);

  return (
    <Page alignItems="center" title="SysLamarck">
      <Flex
        w="100%"
        h="82vh"
        direction={["column"]}
        justifyContent="center"
        bg="#fff"
        p="12"
        borderRadius="lg"
        shadow="lg"
        backgroundImage={"url('background.jpg')"}
        bgPosition="right bottom"
        bgRepeat="no-repeat"
        bgSize={["cover", "cover", "contain", "contain"]}
      >
        <Flex
          direction="column"
          justifyContent="left"
          textAlign="left"
          align="left"
          gap="3"
        >
          <Text fontWeight="bold" fontSize="19px">
            Perfil
          </Text>
          <Divider w="100%" marginBottom="5px" />
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
            <Text>{date.toLocaleDateString("pt-BR") ?? "Indefinido"}</Text>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="100%"
          p="0"
          justifyContent={["center", "center", "left", "left"]}
        >
          <Flex
            marginLeft={["-10px", "-10px", "0px", "0px"]}
            w={["90%", "70%", "45%", "25%"]}
            maxW="300px"
            bgImage="url('logo.png')"
            bgPosition={["bottom"]}
            bgRepeat="no-repeat"
            bgSize="contain"
          ></Flex>
        </Flex>
      </Flex>
    </Page>
  );
};

export default Home;
