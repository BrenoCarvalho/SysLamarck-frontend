import { Divider, Flex, Text } from "@chakra-ui/react";
import SideNavBar from "./SideNavBar.component";

const Page = ({ children, title, hScreenSize = false, ...props }: any) => {
  return (
    <>
      <Flex
        w="100"
        minH="100vh"
        h={hScreenSize ? "100vh" : "100%"}
        bg="#f5f5f5"
      >
        <SideNavBar />
        <Flex w="100%" h="100%" marginLeft="230px" direction="column" p="8">
          <Text fontWeight="semibold" fontSize="lg" mb="4">
            {title}
          </Text>
          <Divider />
          <Flex w="100%" h="100%" paddingY="6" {...props}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
