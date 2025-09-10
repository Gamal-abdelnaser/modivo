import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  CloseButton,
  Drawer,
  Flex,
  Heading,
  HStack,
  IconButton,
  List,
  Menu,
  Portal,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "@/app/features/cartSlice";
import { onCloseCartDrawerAction, onOpenCartDrawerAction } from "@/app/features/globalSlice";
import CookieService from "@/services/CookieService";
import { name } from "@/utils/util";
import mainPhoto from "../assets/images/gamal.jpg";

// ------------------------- Links
const Links = [
  { title: "Home", path: "/" },
  { title: "products", path: "/products" },
  { title: "About", path: "/about" },
];

// ------------------------- Components

const NavLink = ({ path, children }) => (
  <Box
    as={Link}
    to={path}
    rounded="md"
    fontWeight="semibold"
    color="#d8e8dd"
    bg="none"
    _hover={{ color: "#86df0e" }}
    transition="all .5s"
    onClick={() => { window.scrollTo(0, 0); }}
  >
    {children}
  </Box>
);

const DesktopNav = () => (
  <HStack spacing={1} mr={1} display={{ base: "none", md: "inline-flex" }}>
    {Links.map((item) => (
      <NavLink key={item.path} path={item.path}>
        <Text mx={2}>{item.title}</Text>
      </NavLink>
    ))}
  </HStack>
);

const MobileNav = ({ mobileNav, bg }) => {
  const [openMenu , setOpenMenu] = useState(false);
  const token = CookieService.get("jwt");
  const dispatch = useDispatch();
  const onClose = () => dispatch(onCloseCartDrawerAction());

  const logoutHandler = () => {
    CookieService.remove("jwt");
    window.location.reload();
  };

  return (
    <Stack p={0} m={0}>
      <Drawer.Root p={0} m={0} placement="start" open={openMenu} onOpenChange={(e) => setOpenMenu(e.openMenu)}>
        {/* <Drawer.Trigger asChild> */}
          <Button variant="outline" onClick={() => setOpenMenu(true)} size="lg" bg="none" border="none" _hover={{ color: "#86df0e" }} transition="all .5s">
            <FontAwesomeIcon icon={faBars} />
          </Button>
        {/* </Drawer.Trigger> */}

        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content p={4} bg="#09282e">
              <Drawer.Context>
                {(store) => (
                  <Drawer.Body p={2} pt={10}>
                    {Links.map((item) => (
                      <NavLink key={item.path} path={item.path} >
                        <Text borderBottom="1px solid #004750" py={4} onClick={() => setOpenMenu(false)}>
                          {item.title}
                        </Text>
                      </NavLink>
                    ))}
                  </Drawer.Body>
                )}
              </Drawer.Context>

              <Drawer.Footer alignItems="end" justifyContent="start" mb={8}>
                {!token && (
                  <Button
                    as={Link}
                    to="/login"
                    px={8}
                    py={0}
                    rounded="md"
                    border="1px solid #86df0e"
                    bg="#004750"
                    color="#d8e8dd"
                    _hover={{ textDecoration: "none", color: "black", bg: "#eeee" }}
                    fontWeight="semibold"
                    fontFamily="heading"
                  >
                    Login
                  </Button>
                )}
              </Drawer.Footer>

              <Drawer.CloseTrigger asChild>
                <CloseButton size="lg" bg="none" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Stack>
  );
};

const Acount = ({ logout }) => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button bg="none" size="sm" cursor="pointer">
        <Avatar.Root boxSize="30px">
          <Avatar.Fallback name={name} />
          <Avatar.Image src={mainPhoto} />
        </Avatar.Root>
      </Button>
    </Menu.Trigger>

    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Stack mx="60px" my={3} gap="20px">
            <Center>
              <Avatar.Root variant="outline" size="2xl">
                <Avatar.Fallback name={name} />
                <Avatar.Image src={mainPhoto} />
              </Avatar.Root>
            </Center>
            <Center>
              <Text fontSize="md" fontWeight="bold">
                {'Gamal'}
              </Text>
            </Center>
          </Stack>

          <Menu.Separator />
          <Stack my={2}>
            <Menu.Item as={Link} to="/dashboard"  _hover={{ bg: "#A0AEC0", color: "black" }} fontWeight="semibold" pl="10px" py="1.5" cursor="pointer">
              Your Dashboard
            </Menu.Item>
            {/* <Menu.Item _hover={{ bg: "#A0AEC0", color: "black" }} fontWeight="semibold" pl="10px" py="1.5" cursor="pointer">
              Account Settings
            </Menu.Item> */}
            <Menu.Item onClick={logout} _hover={{ bg: "#A0AEC0", color: "black" }} fontWeight="semibold" pl="10px" py="1.5" cursor="pointer">
              Logout
            </Menu.Item>
          </Stack>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector(selectCart);
  const token = CookieService.get("jwt");
  const mobileNav = useDisclosure();
  const onOpen = () => dispatch(onOpenCartDrawerAction());
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("white", "black");

  const logoutHandler = () => {
    CookieService.remove("jwt");
    window.location.reload();
  };

  return (
    <chakra.header
      position="fixed"
      bg="#09282e"
      w="full"
      px={{ base: 2, sm: 4 }}
      py={4}
      shadow="sm"
      zIndex={1000}
    >
      <Flex alignItems="center" maxW="1300px" justifyContent="space-between" mx="auto">
        <Flex gap={20}>
          <Heading as={Link} to="/" fontSize={{ md: "4xl", base: "2xl" }} fontWeight="bold" ml={2} color="#86df0e">
            {name}
          </Heading>
          <DesktopNav />
        </Flex>

        <HStack alignItems="center" gap={{ md: 3, base: 0 }}>
          <Box display={{ base: "inline-flex", md: "none" }} zIndex="1000">
            <IconButton
              aria-label="Open menu"
              fontSize={{ md: "20px", base: "13px" }}
              onClick={mobileNav.onToggle}
              variant="ghost"
              color={colorMode === "light" ? "black" : "white"}
              bg="none"
            />
            <MobileNav mobileNav={mobileNav} bg={bg} />
          </Box>

          <Stack
            position="relative"
            cursor="pointer"
            px={2}
            fontSize={{ md: "20px", base: "15px" }}
            onClick={onOpen}
            mr={3}
            _hover={{ color: "#86df0e" }}
            transition="all .5s"
          >
            <FaShoppingCart />
            <chakra.span
              position="absolute"
              top={{ md: "-6px", base: "-10px" }}
              right={{ md: "-6px", base: "-6px" }}
              fontSize={{ base: "10px", md: "12px" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="full"
              boxSize="18px"
              bg="#86df0e"
            >
              <chakra.span color="white" fontWeight="semibold" fontSize={{ md: "13px", base: "8px" }}>
                {cartProducts.length}
              </chakra.span>
            </chakra.span>
          </Stack>

          {!token ? (
            <Button
              as={Link}
              to="/login"
              px={8}
              py={0}
              rounded="md"
              border="1px solid #86df0e"
              bg="#004750"
              color="#d8e8dd"
              fontWeight="semibold"
              fontFamily="heading"
              _hover={{ textDecoration: "none", color: "black", bg: "#eeee" }}
              display={{base:'none',md:'inline-flex'}}
            >
              Login
            </Button>
          ) : (
            <Acount logout={logoutHandler} />
          )}
        </HStack>
      </Flex>
    </chakra.header>
  );
};

export default Navbar;
