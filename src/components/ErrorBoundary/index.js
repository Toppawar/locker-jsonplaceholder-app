import React from "react";

import { Button, Flex, Heading } from "@chakra-ui/react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error) {
    // You can also log the error to an error reporting service
    console.error(error);
    return { hasError: true };
    // throw new Error(error);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading>Oops, there is an error!</Heading>
          <Button
            onClick={() => {
              this.setState({ hasError: false });
            }}
          >
            Try again?
          </Button>
        </Flex>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
