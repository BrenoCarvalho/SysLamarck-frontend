import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Context } from "../context/AuthContext";

const Login = () => {
  const { handleLogin } = useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    } else {
      const response = await handleLogin({ username, password });

      if (response?.status === 401) {
        setError("Usuário ou senha inválidos");
      }
    }
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      bg="#f1f2f5"
      justifyContent="center"
      alignItems="center"
      direction="column"
      gap="2"
    >
      <Flex
        w="360px"
        h="auto"
        bg="white"
        shadow="sm"
        borderRadius="lg"
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap="4"
        padding="8"
      >
        <Text fontSize="26px" textAlign={"center"} fontWeight="bold">
          Acesse a plataforma SysLamarck
        </Text>
        <Input
          placeholder="Usuário"
          value={username}
          onChange={(e) => [setUsername(e.target.value), setError("")]}
        />
        <Input
          placeholder="Senha"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
          type="password"
        />
        <Button
          w="100%"
          bg="gray.800"
          color="#fff"
          _hover={{ backgroundColor: "gray.900" }}
          onClick={submit}
        >
          Logar
        </Button>
        <Text color="red.500" fontWeight="semibold">
          {error}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;
