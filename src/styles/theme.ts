import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        bg: "gray.800",
        color: "#fff",
        _hover: { backgroundColor: "gray.900" },
        _active: { transform: "scale(0.98)" },
      },
      defaultProps: {
        variant: "base",
      },
    },
    FormLabel: {
      baseStyle: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
      defaultProps: {
        variant: "base",
      },
    },
  },
});

export default theme;
