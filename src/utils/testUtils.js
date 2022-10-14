import React from "react";
import { render } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";

/**
 * customRender is a utility function
 * that allows us to render our components with ChakraProvider Theme
 */

const AllProviders = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: AllProviders, ...options });
};

export { customRender as render };
