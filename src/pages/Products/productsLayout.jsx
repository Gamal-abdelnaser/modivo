import { Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Products from './Products'
import { useSelector } from 'react-redux'
import { selectNetwork } from '@/app/features/network'
import Skelaton from '@/components/ProductCardSkelaton'

const ProductsLayout = () => {
   const {isOnline} = useSelector(selectNetwork)
  if (!isOnline) return <Flex w={'full'} alignItems={'center'} flexWrap={'wrap'} mt={20} mb={20} justifyContent={'center'}>
      {Array.from({ length: 6 }, (_, idx) => (
          <Skelaton key={idx}  />
        )
      )}
  </Flex>;
  return (
    <Stack w={'full'} alignItems={'center'} mt={20} mb={20}  >
      <Text fontSize={'4xl'} mt={4} mb={0} fontWeight={'bold'}>Our Products</Text>
      <Products />
    </Stack>
  )
}

export default ProductsLayout