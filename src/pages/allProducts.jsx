import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import ProductsPage from './Products/Products'
import { name } from '@/utils/util'
import { Dooted } from '@/components/styledBoxes'
import { useSelector } from 'react-redux'
import { selectNetwork } from '@/app/features/network'
import Skelaton from '@/components/ProductCardSkelaton'

const AllProducts = () => {
  const { isOnline } = useSelector(selectNetwork)
  // if (!isOnline) return <Flex w={'full'} alignItems={'center'} flexWrap={'wrap'} mt={20} mb={20} justifyContent={'center'}>
  //   {Array.from({ length: 6 }, (_, idx) => (
  //     <Skelaton key={idx} />
  //   )
  //   )}
  // </Flex>;
  return (
    <Box maxW={'1300px'} justifyItems={'center'} px={{ base: 2, sm: 4 }} py={6} mt={20}  >
      <Stack w={'full'} alignContent={'center'} maxW={'1300px'} position={'relative'}>
        <Text textStyle={{ md: '4xl', base: '2xl' }} fontWeight={'bold'} fontFamily={'heading'} textAlign={'start'}  >Summer Collection</Text>
        <Text textStyle={{ md: 'xl', base: 'md' }} fontWeight={'normal'} textAlign={'start'}  >Discover the summer collection from {name}</Text>
        {
          (!isOnline) ? <Flex w={'full'} alignItems={'center'} flexWrap={'wrap'} mt={20} mb={20} justifyContent={'center'}>
            {Array.from({ length: 6 }, (_, idx) => (
              <Skelaton key={idx} />
            )
            )}
          </Flex> :<ProductsPage page={7} />
        }
        
      </Stack>
    </Box>
  )
}

export default AllProducts