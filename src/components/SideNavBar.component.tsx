import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { cloneElement, useState } from "react";
import { AiOutlineHome, AiOutlineIdcard, AiOutlineTeam } from "react-icons/ai";
import { BiDollarCircle, BiSearch, BiShow, BiTransfer } from "react-icons/bi";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropleft } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import {
  MdCallMade,
  MdCallReceived,
  MdOutlineLogout,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdPersonOutline,
} from "react-icons/md";
import { useContext } from "react";
import { Context } from "../context/AuthContext";

const Group = ({ name, icon, children }: any) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Flex
        onClick={() => setOpen(!isOpen)}
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        _hover={{ bg: "gray.900", shadow: "lg" }}
        p="2"
        pl="4"
        rounded="md"
        cursor="pointer"
        m="auto"
        mb={"2"}
        className="group"
        shadow="md"
        bg={isOpen ? "gray.900" : ""}
      >
        <Flex gap="3.5">
          {cloneElement(icon, {
            className: isOpen
              ? `text-2xl text-gray-600 text-white`
              : `text-2xl text-gray-600 group-hover:text-white`,
          })}
          <Text
            color={isOpen ? "#fff" : "gray.800"}
            fontWeight="semibold"
            className="group-hover:text-white"
          >
            {name}
          </Text>
        </Flex>
        {isOpen ? (
          <IoMdArrowDropleft className="text-white" />
        ) : (
          <IoMdArrowDropdown
            className={isOpen ? "text-white" : "group-hover:text-white"}
          />
        )}
      </Flex>
      {isOpen && children}
      {isOpen && <Flex w="100%" h="8px" />}
    </>
  );
};

interface itemInterface {
  href: string;
  name: string;
  icon: JSX.Element;
  isGroupItem?: boolean;
}

const Item = ({ href, name, icon, isGroupItem = false }: itemInterface) => {
  return (
    <Link to={href}>
      <Flex
        w="100%"
        justify="start"
        alignItems="center"
        gap="3.5"
        _hover={{ bg: "gray.900", shadow: "lg" }}
        p="2"
        pl={isGroupItem ? "8" : "4"}
        rounded="md"
        cursor="pointer"
        m="auto"
        mb="2"
        className="group"
      >
        {cloneElement(icon, {
          className: `text-2xl text-gray-600 group-hover:text-white`,
        })}
        <Text
          color="gray.800"
          fontWeight="semibold"
          className="group-hover:text-white"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {name}
        </Text>
      </Flex>
    </Link>
  );
};

const SideNavBar = () => {
  const { handleLogout } = useContext(Context);

  return (
    <Flex
      p="6"
      w="230px"
      h="100vh"
      position="fixed"
      bg="white"
      zIndex="overlay"
      boxShadow="lg"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "0px",
        },
        "&::-webkit-scrollbar-track": {
          width: "0px",
        },
      }}
    >
      <Flex direction="column" justify="start" alignItems="center" w="100%">
        {/* title */}
        <Link to="/">
          <Text
            align="center"
            cursor="pointer"
            fontWeight="bold"
            color="#6f374e"
            pb="4"
            className="border-b border-gray-100 w-full"
          >
            SysLamarck
          </Text>
        </Link>
        {/* pages */}
        <Flex
          w="100%"
          direction="column"
          my="4"
          pb="4"
          className="border-b border-gray-100"
        >
          <Group name="Cadastro" icon={<AiOutlineIdcard />}>
            <Item
              href="/cadastro/locador"
              name="Locador"
              icon={<MdPersonOutline />}
              isGroupItem={true}
            />
            <Item
              href="/cadastro/imovel"
              name="Imóvel"
              icon={<AiOutlineHome />}
              isGroupItem={true}
            />
            <Item
              href="/cadastro/locatario"
              name="Locatário"
              icon={<AiOutlineTeam />}
              isGroupItem={true}
            />
            <Item
              href="/cadastro/usuario"
              name="Usuário"
              icon={<RiUserSettingsLine />}
              isGroupItem={true}
            />
          </Group>

          <Group name="Consultas" icon={<BiSearch />}>
            <Item
              href="/consulta/locador"
              name="Locador"
              icon={<MdPersonOutline />}
              isGroupItem={true}
            />
            <Item
              href="/consulta/imovel"
              name="Imóvel"
              icon={<AiOutlineHome />}
              isGroupItem={true}
            />
            <Item
              href="/consulta/locatario"
              name="Locatário"
              icon={<AiOutlineTeam />}
              isGroupItem={true}
            />
            <Item
              href="/consulta/usuario"
              name="Usuário"
              icon={<RiUserSettingsLine />}
              isGroupItem={true}
            />
          </Group>
          <Item
            href="/relatorios"
            icon={<TbReportSearch />}
            name="Relatórios"
          />
          <Group name="Caixa" icon={<BiDollarCircle />}>
            <Item
              href="/caixa/movimentacao"
              icon={<BiTransfer />}
              name="Geral"
              isGroupItem={true}
            />
            <Item
              href="/caixa/aluguel/recebimento"
              icon={<MdCallReceived />}
              name="Recebimento"
              isGroupItem={true}
            />
            <Item
              href="/caixa/aluguel/repasse"
              icon={<MdCallMade />}
              name="Repasse"
              isGroupItem={true}
            />
            <Item
              href="/caixa/visualizar"
              icon={<BiShow />}
              name="Visualizar"
              isGroupItem={true}
            />
          </Group>
        </Flex>
        {/* settings */}
        <Flex
          w="100%"
          direction="column"
          my="4"
          pb="4"
          className=" border-b border-gray-100"
        >
          <Item
            href="/settings"
            icon={<MdOutlineSettings />}
            name="Configurações"
            isGroupItem={false}
          />

          <Item href="/more" icon={<MdOutlineMoreHoriz />} name="Mais" />
        </Flex>
        {/* logout */}
        <Flex
          my="2"
          w="100%"
          direction="column"
          gap="2"
          justifyContent="center"
        >
          <Flex
            w="100%"
            onClick={handleLogout}
            mb="2"
            justify="start"
            alignItems="center"
            gap="4"
            p="2"
            pl="5"
            rounded="md"
            cursor="pointer"
            _hover={{ shadow: "lg", m: "auto" }}
            className="border border-gray-200  hover:bg-gray-900 group"
          >
            <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
            <Text
              color="gray.800"
              fontWeight="semibold"
              className="group-hover:text-white"
            >
              Sair
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideNavBar;
