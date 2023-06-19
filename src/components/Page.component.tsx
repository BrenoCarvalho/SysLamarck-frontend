import { Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import SideNavBar from "./SideNavBar.component";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

const Header = ({
  showMenu,
  setShowMenu,
  title,
}: {
  showMenu: any;
  setShowMenu: any;
  title: string;
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
        <Text fontWeight="semibold" fontSize="lg">
          {title}
        </Text>
        <IconButton
          visibility={["visible", "visible", "hidden", "hidden"]}
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

const Page = ({ children, title, hScreenSize = false, ...props }: any) => {
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
          <Header showMenu={showMenu} setShowMenu={setShowMenu} title={title} />
          <Flex w="100%" h="100%" paddingY="6" {...props}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
