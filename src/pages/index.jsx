import { Box, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import main from '../assets/images/main.jpg';
import Partners from './partners';
import ProductsPage from './Products/Products';
import BestSeller from './bestSeler';
import AllProducts from './allProducts';
import Footer from './Footer';
import Question from './Q&a';
import Questions from './Q&a';

const HomePage = () => {
  return (
    <Stack w={'100%'} maxW={'1300px'}  >
      {/* <h3 className=' text-[black] font-bold' >Home page</h3> */}
      <Main />
      {/* <Partners /> */}
      <BestSeller />
      <AllProducts />
    </Stack>
  )
}
export default HomePage;

export function Main() {
  return (
    <Stack w={'100%'} mt={'100px'} px={{ base: 2, sm: 4 }} py={4} justifyContent={'center'} alignItems={'center'} maxW={'1300px'} mx={'auto'} >
      <Image
        src={main}
        alt="Description of the image"
        objectFit="cover"
        borderRadius={'30px'}
      />
    </Stack>
  )
}