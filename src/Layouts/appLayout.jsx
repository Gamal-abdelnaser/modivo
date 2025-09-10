import React from 'react'
import Navbar from './navbar';
import { Outlet } from 'react-router';
import CartDrawer from '@/components/cartDrawer';
import { Toaster } from '@/components/ui/toaster';
import { Flex, Stack } from '@chakra-ui/react';
import Footer from '@/pages/Footer';
import Questions from '@/pages/Q&a';
// import Simple from '@/pages/ProductDetails';

 const AppLayout = () => {
  
  return (
    <>
      <Toaster />
      <CartDrawer />
      <Navbar />
      <Flex  justifyContent={'center'} alignItems={'center'} px={4} py={6} minH={'100vh'}>
        <Outlet />
      </Flex>
      <Questions />
      <Footer />
      {/* <Simple/> */}

    </>
  )
}
export default AppLayout;