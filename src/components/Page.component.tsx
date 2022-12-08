import { Divider, Flex, Text } from "@chakra-ui/react";
import SideNavBar from "./SideNavBar.component";

function Page({ children, title, ...props }: any): JSX.Element {
  return (
    <>
      <Flex w="100%" minH="100vh" h="100%" bg="#f5f5f5">
        <SideNavBar />
        <Flex w="100%" h="100%" marginLeft="230px" direction="column" p="8">
          <Text fontWeight="semibold" fontSize="lg" mb="4">
            {title}
          </Text>
          <Divider />
          <Flex w="100%" h="100%" {...props} paddingY="6">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Page;
