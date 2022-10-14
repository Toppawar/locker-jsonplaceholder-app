import { useMemo } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  useTheme,
  useColorMode,
  Heading
} from "@chakra-ui/react";

import { VscJson } from "react-icons/vsc";
import ColorModeSwitcher from "./ColorModeSwitcher";

const Header = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const logoColor = useMemo(() => {
    return colorMode === "light"
      ? colors?.brand?.mainColor
      : colors?.brand?.mainColorWhite;
  }, [colorMode]);

  return (
    <Box width="full" bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex ml="5" justifyContent="center" alignItems="center">
          <VscJson
            color={logoColor}
            viewBox="0 0 16 16"
            style={{ height: "64px", width: "64px" }}
          />
          <Heading size="md" as="h2" ml="2">Prueba técnica frontend</Heading>
        </Flex>

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <ColorModeSwitcher />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
