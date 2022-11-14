import { Flex } from "@chakra-ui/react";
import SideNavBar from "./SideNavBar.component";

function Page({ children, title, ...props }: any): JSX.Element {
  return (
    <>
      <Flex w="100%" h="100vh" bg="#f1f2f5">
        <SideNavBar />
        <Flex w="100%" h="100%" marginLeft="230px" {...props}>
          {children}
        </Flex>
      </Flex>
    </>
  );
}

export default Page;
