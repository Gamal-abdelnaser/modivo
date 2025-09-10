import { selectNetwork } from '@/app/features/network';
import ProductCard from '@/components/ProductCard';
import Skelaton from '@/components/ProductCardSkelaton';
import { Dooted } from '@/components/styledBoxes';
import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
const BestSeller = ({page = 3}) => {
  const { isOnline } = useSelector(selectNetwork)
  // /api/products ? populate = thumbnail & populate=categories & pagination[page]=${ page }& pagination[pageSize]=7
  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products?populate=thumbnail&populate=categories&pagination[pageSize]=${page}`
    );
    return data; // Ensure API structure is correct
  };
  const { isLoading, data } = useQuery({
    queryKey: ["BestSeller"],
    queryFn: getProductList
  });

    
  return (
    <Box maxW={'1300px'} justifyItems={'center'} px={{ base: 2, sm: 4 }} py={6} mt={20}  >
      <Stack w={'full'} alignContent={'center'} maxW={'1300px'}  position={'relative'} >
        <Text textStyle={{ md: '4xl', base: '2xl' }} fontWeight={'bold'} textAlign={'start'}  >Best Seller</Text>
        {
         (isLoading || !isOnline) ? <Flex w={'full'} alignItems={'center'} flexWrap={'wrap'} mt={20} mb={20} justifyContent={'center'}>
          {Array.from({ length: 3 }, (_, idx) => (
            <Skelaton key={idx} />
          )
          )}
        </Flex> :
        
        <Stack w={'full'}  alignContent={'center'} maxW={'1300px'} mt={10} position={'relative'}  p={4}>
          <Dooted />
          {/* <Grid templateColumns="repeat(auto-fill, minmax(150px, 2fr))" justifyItems={'center'}   gap={6}   > */}
          <div className=" box-container items-center  justify-items-center grid   w-full xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]  gap-[20px] px-[50px] py-0 justify-center">    

            {data?.data?.map((product) => ( 
              <ProductCard key={product.id} product={product} />
            ))}
            </div>
          {/* </Grid> */}
        </Stack>
        }
      </Stack>
    </Box>
  )
}

// <Stack w={'full'}  alignContent={'center'} maxW={'1300px'} mt={10} position={'relative'}>
//         <Dooted />

export default BestSeller;