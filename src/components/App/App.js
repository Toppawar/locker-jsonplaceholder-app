import React from "react";
import { ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";
import { SWRConfig } from "swr";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ErrorBoundary from "../ErrorBoundary";

// Views
import Posts from "../../views/posts";
import Post from "../../views/post";

import Header from "../Header";

import fetcher from "../../utils/fetcher";

import { ROUTES } from "../../constants/routes";
import { StaticsProvider } from "../StaticsProvider";
import Footer from "../Footer";

const theme = extendTheme({
  colors: {
    brand: {
      mainColor: "#043c54",
      mainColorWhite: "#5ec5f1",
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig
        value={{
          // 1 Hour
          refreshInterval: 1000 * 60 * 60,
          fetcher,
        }}
      >
        <StaticsProvider>
          <BrowserRouter>
            <Flex
              width="100%"
              height="100vh"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              flex="1"
            >
              <Header />
              <ErrorBoundary>
                <Routes>
                  <Route index path={ROUTES.HOME} element={<Posts />} />
                  <Route path={ROUTES.POST} element={<Post />} />
                </Routes>
              </ErrorBoundary>
              <Footer />
            </Flex>
          </BrowserRouter>
        </StaticsProvider>
      </SWRConfig>
    </ChakraProvider>
  );
};

export default App;
