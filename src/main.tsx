import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import "@/index.css";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer } = createStandaloneToast();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    <ToastContainer />
  </React.StrictMode>
);
