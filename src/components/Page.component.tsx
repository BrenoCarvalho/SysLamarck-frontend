import { Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import SideNavBar from "./SideNavBar.component";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

const Header = ({
  showMenu,
  setShowMenu,
  title,
  menuGroup,
  rightButton = null,
}: {
  showMenu: any;
  setShowMenu: any;
  title: string;
  menuGroup: string;
  rightButton?: any;
}) => {
  return (
    <>
      <Flex
        mt="-10px"
        justifyContent="space-between"
        align="center"
        mb="3"
        ml={["2", "2", "0", "0"]}
        mr={["2", "2", "0", "0"]}
      >
        {menuGroup ? (
          <Text
            display="flex"
            fontWeight="semibold"
            fontSize="lg"
            gap="2.5"
            flexDirection="row"
          >
            {menuGroup} <Text fontWeight="normal">{menuGroup ? "/" : ""}</Text>
            <Text fontWeight="normal">{title}</Text>
          </Text>
        ) : (
          <Text fontWeight="semibold" fontSize="lg">
            {title}
          </Text>
        )}
        {rightButton}
        <IconButton
          display={["flex", "flex", "none", "none"]}
          aria-label="Menu"
          bgColor="transparent"
          _hover={{ bg: "transparent" }}
          _pressed={{ bg: "transparent" }}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          icon={
            <HiMenu className="text-2xl text-black group-hover:text-white" />
          }
        />
      </Flex>
      <Divider />
    </>
  );
};

const Page = ({
  children,
  title,
  menuGroup,
  hScreenSize = false,
  rightButton = null,
  ...props
}: any) => {
  const [showMenu, setShowMenu] = useState(
    window.innerWidth < 768 ? false : true
  );

  window.addEventListener("resize", (value) => {
    const target = value?.target as Window;
    target?.innerWidth > 768 ? setShowMenu(true) : setShowMenu(false);
  });

  return (
    <>
      <Flex
        w="100"
        minH="100vh"
        h={hScreenSize ? "100vh" : "100%"}
        bg="#f5f5f5"
      >
        {showMenu ? <SideNavBar /> : null}
        <Flex
          w="100%"
          h="100%"
          marginLeft={["0", "0", "230px", "230px"]}
          direction="column"
          p={["4", "4", "8", "8"]}
        >
          <Header
            menuGroup={menuGroup}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            title={title}
            rightButton={rightButton}
          />
          <Flex w="100%" h="100%" paddingY="6" {...props}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
