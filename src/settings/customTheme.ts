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
      mainBg: "#F3F4F6", // سفید-خاکستری نرم و مدرن
      secondaryBg: "#FFFFFF", // کاملاً تمیز برای کارت و دیالوگ
      primary: "#3A86FF", // آبی مدرن UI (CTA)
      secondary: "#6C727F", // خاکستری تایپوگرافی حرفه‌ای
      secondaryVariant: "#9AA0A9", // برای متن‌های کم‌اهمیت، لیبل‌ها
      text: "#1A1A1A", // مشکی خوانا
      accent: "#3A86FF",
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
