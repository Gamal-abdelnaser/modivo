
import { useColorModeValue } from '@/components/ui/color-mode'

'use client'

// import { useColorModeValue } from '@/components/ui/color-mode'
import {
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Icon,
  Text,
  Menu,
  Button,
  Portal,
  CloseButton,
  Drawer,
  Stack,
  IconButton,
  DrawerContent,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiChevronDown,
  FiMenu,
  FiBell,
} from 'react-icons/fi'
import { BsGrid3X3GapFill } from 'react-icons/bs'
import { Link, Outlet } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import { name } from '@/utils/util'
import CookieService from '@/services/CookieService'

const LinkItems = [
  { name: 'Home', icon: <FiHome />, to: '/dashboard' },
  { name: 'Products', icon: <FiTrendingUp />, to: '/dashboard/products' },
  { name: 'Orders', icon: <FiTrendingUp />, to: '/dashboard/orders' },
]

const NavItem = ({ icon, children, to, ...rest }) => {
  return (
    <Box
      as={RouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
          >
            {icon}
          </Icon>
        )}
        {children}
      </Flex>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={'#09282e'}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text as={Link} to="/" fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {name}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to} onClick={onClose}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const MobileNav = ({ onOpen }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={'#09282e'}
      borderBottomWidth="1px"
      borderBottomColor={'#004750'}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={ onOpen}
        variant="outline"
        aria-label="open menu"
      >
        <FiMenu />
      </IconButton>

      <Text
        as={Link} to="/"
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {name}
      </Text>

      {/* <HStack spacing={{ base: '0', md: '6' }}> */}
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="notifications"
        >
          <FiBell /> */}
        {/* </IconButton> */}
        {/* <Flex alignItems={'center'}>
          <Menu.Root>
            <Menu.Trigger bg={'none'} asChild>
              <Button py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar.Root size="sm" rounded={'full'}>
                    <Avatar.Image
                      rounded={'full'}
                      src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    />
                    <Avatar.Fallback name="Justina Clark" />
                  </Avatar.Root>
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">Justina Clark</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  bg={useColorModeValue('white', 'gray.900')}
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
                  <Menu.Item>Profile</Menu.Item>
                  <Menu.Item>Settings</Menu.Item>
                  <Menu.Item>Billing</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item>Sign out</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex> */}
      {/* </HStack> */}
    </Flex>
  )
}
const isAuthenticated = !!CookieService.get("jwt"); // لو فيه jwt يبقى Authenticated

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false)
  !isAuthenticated && (window.location.href = '/login');
  return (
    <>
      {/* {
        isAuthenticated ? */}

      <Box minH="100vh" h={'auto'} bg={'#09282e'}>

          <SidebarContent onClose={() => setIsOpen(false)} display={{ base: 'none', md: 'block' }} />
          <Drawer.Root
            open={isOpen}
            placement="left"
            onClose={() => setIsOpen(false)}
          >
            {/* <Drawer.Overlay /> */}
            <Drawer.Body>
              <DrawerContent>
                <SidebarContent onClose={() => setIsOpen(false)} />
              </DrawerContent>
            </Drawer.Body>
            {/* <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger> */}
          </Drawer.Root>
          <MobileNav onOpen={() => setIsOpen(true)} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            <Outlet />
          </Box>

        </Box> 
        {/* :
         <Stack w={'full'}  h={'100vh'} justifyContent={'center'} alignItems={'center'} gap={4}>

          <Text alignItems={'center'} textAlign={'center'} fontSize={'2xl'}>
            Please 
              <Button as={Link} to="/login" variant="outline" mx={2} px={'15px'} border={'1px solid #86df0e'} bg="#004750" _hover={{ bg: 'none' }} py={0} h={'35px'} fontSize={'xl'} >login</Button>

             to access the dashboard.</Text>
         </Stack> 
      } */}
    </>
  )
}

export default DashboardLayout