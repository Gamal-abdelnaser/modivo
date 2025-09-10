'use client'

import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  Flex,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { BiMailSend } from 'react-icons/bi'
import { useColorModeValue } from '@/components/ui/color-mode'
import { name } from '@/utils/util'
import { Link } from 'react-router'

const Logo = (props) => {
  return (
    <>
      <Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'start'} color={'#86df0e'}>{name}</Text>
    </>
  )
}

const SocialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: <FaInstagram /> },
  { label: 'Twitter', href: 'https://www.twitter.com/', icon: <FaTwitter /> },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: <FaYoutube /> },
];

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'all 0.5s ease'}
      _hover={{
        color: '#86df0e',
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'xl'} mb={2}>
      {children}
    </Text>
  )
}
const Links = [
  { title: "Home", path: "/" },
  { title: "products", path: "/products" },
  // { title: "Dashboard", path: "/dashboard" },
  // { title: "Team", path: "/team" },
  { title: "About", path: "/about" },
];
const NavLink = ({ path, children }) => {
  return (
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={"md"}
      to={path}
      onClick={() => scrollTo(0, 0)}
      fontWeight={'semibold'}
      transition={'all 0.3s ease'}
      _hover={{
        color: '#86df0e',
      }}
      ml={{ base: 0, md:4  }}
    >
      {children}
    </Box>
  );
};


export default function Footer() {
  return (
    <chakra.header w="full" px={{ base: 2, sm: 4 }}  shadow="md"  >
      <Flex alignItems="center" maxW={'1300px'} justifyContent="space-between" mx="auto">
        <Box maxW={'1300px'} justifyItems={'center'} px={{ base: 2, sm: 4 }}    >
          <Stack w={'full'} alignContent={'center'} maxW={'1300px'}  >
            <Box
              p={{md:10,base:0}}
              
              color={useColorModeValue('gray.700', 'gray.200')}>
              <Container as={Stack} maxW={'1300px'} py={10} >
                <SimpleGrid
                  templateColumns={{ sm: '1fr ', md: ' 1fr  2fr ' }}
                  w={'full'}
                  gap={{ base: 10, sm: 20, md: 40 }}
                  justifyContent={'space-between'}
                  p={'10'}>
                  <Stack gap={6} >
                    <Box>
                      <Logo color={useColorModeValue('gray.700', 'white')} />
                    </Box>
                    <Text fontSize={'sm'} textAlign={'start'}>Our brand is all about modern youth fashion — bringing you the latest trends with a perfect mix of comfort and style. Every piece is designed to keep you looking fresh and feeling confident, wherever you go.</Text>
                    <Stack direction={'row'} gap={6}>
                      {
                        SocialLinks.map((item) => {
                          return (
                            <SocialButton key={item.label} label={item.label} href={item.href}>
                              {item.icon}
                            </SocialButton>
                          )
                        })
                      }
                    </Stack>
                  </Stack>
                  <Stack align={'flex-start'}>
                    <ListHeader fontSize={'20px'}>Links</ListHeader>
                    {Links.map((item) => (
                      <NavLink key={item.path} path={item.path}>
                        {item.title}
                      </NavLink>
                    ))}
                  </Stack>
                  
                  
                </SimpleGrid>
                <Text fontSize={'md'} fontWeight={'semibold'}>@ 2025 All rights reserved {name}</Text>
              </Container>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </chakra.header>
  )
}