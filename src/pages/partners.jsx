import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import pay1 from '../assets/images/payments/ahly.png'
import pay2 from '../assets/images/payments/mastercard2.png'
import pay3 from '../assets/images/payments/meza.png'
import pay4 from '../assets/images/payments/value.webp'
import pay5 from '../assets/images/payments/visa2.png'

const partners = [pay1, pay2, pay3, pay4, pay5]

export const Partners = () => {
  return (
    <Stack w={'full'} mx={'auto'}    py={6} >
      <Stack w={'100%'} mx={'auto'} mt={10} px={4} py={6} >
      <Box w='full' display={'flex'} flexDir={'row'} justifyContent={'center'} alignItems={'center'} p={4}>
        <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight={'bold'}>Our Partners</Text>
      </Box>
        <Flex  display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDir={'row'}  w={'100%'}  >
      {
        partners?.map((partner, idx) => (
          <Image key={idx} src={partner} maxW={{ base: '60px',sm:'80', md: '150px' }} alt={`Partner ${idx + 1}`}  />
        ))}
      </Flex>
      </Stack>
    </Stack>
  )
}
export default Partners;

