import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

const queryClient = new QueryClient();

export const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AppRoutes />
      </ChakraProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
