import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Providers from "@/providers/providers";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./settings/customTheme";
import { QueryClient } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={customTheme}>
      <Providers />
    </ChakraProvider>
  </StrictMode>
);
export const queryClient = new QueryClient();
