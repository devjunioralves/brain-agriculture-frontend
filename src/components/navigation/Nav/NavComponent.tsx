import {
  Box,
  Flex,
  useDisclosure,
  Image,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import NavIconsComponent from "../Nav/NavIcons/NavIconsComponent";

export default function NavComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box boxShadow="lg" bg={"#24434b"} px={4}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link to="/">
                <Image w={170} src="" />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            ></HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4}>
            <Stack as={"nav"} spacing={4}>
              <NavIconsComponent />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
