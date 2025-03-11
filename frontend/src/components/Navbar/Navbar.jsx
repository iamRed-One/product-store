import { Button, Container, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { LuMoon, LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useColorMode, useColorModeValue } from "../ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1148px"}>
      <Flex
        h={16}
        py={2}
        gap={3}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"to-r"}
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button
              bg={useColorModeValue("gray.300", "gray.700")}
              variant={"ghost"}
            >
              <Icon
                fontSize={20}
                color={useColorModeValue("gray.700", "white")}
              >
                <CiSquarePlus />
              </Icon>
            </Button>
          </Link>
          <Button
            onClick={toggleColorMode}
            bg={useColorModeValue("gray.300", "gray.700")}
            variant={"ghost"}
          >
            {colorMode === "light" ? <LuMoon /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
