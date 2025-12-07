import { extendTheme } from "@chakra-ui/react";
import { color } from "framer-motion";
import { baseStyle } from "node_modules/@chakra-ui/react/dist/types/avatar/avatar";

export const customTheme = extendTheme({
  direction: "rtl",
  fonts: {
    heading: "'IranYekan', sans-serif",
    body: "'IranYekan', sans-serif",
    table: "'IranYekan', sans-serif", // اگه بخواهی اختصاصی برا جدول
  },
  colors: {
    amir: {
      mainBg: "#d5dadf",
      secondaryBg: "#e7eaefff",
      primary: "#3FBD6E",
      secondary: "#6E7685",
      secondaryVariant: "#777b82",
      common: "#1A1A1A",
      accent: "#3FBD6E",
    },
  },
  components: {
    HStack: { defaultProps: { spacing: 0, margin: 0 } },
    VStack: { defaultProps: { spacing: 0, margin: 0 } },
    Stack: { defaultProps: { spacing: 0, margin: 0 } },
    Button: {
      variants: {
        solid: {
          _active: {
            bg: "#3FBD6E(206, 4, 206, 0.33)",
            borderColor: "#3FBD6E(206, 4, 206, 0.33)",
          },
          _hover: {
            bg: "#3FBD6E(206, 4, 206, 0.33)",
            borderColor: "#3FBD6E(206, 4, 206, 0.33)",
          },
        },
      },
      baseStyle: {
        borderRadius: "8px",
      },
    },
  },
});
