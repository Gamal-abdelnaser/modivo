import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
// import { Product } from '../types/product';

import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
// import { ProductDetails } from './ProductDetailsAlt';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useColorMode } from '@/components/ui/color-mode';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Flex, Stack } from '@chakra-ui/react';
import { ProductDetailsa } from './ProductDetails';
import Skelaton from '@/components/ProductCardSkelaton';
import { selectNetwork } from '@/app/features/network';




export const ProductPage = ( ) => {
  const { isOnline } = useSelector(selectNetwork)
  const dispatch = useDispatch();
    const params = useParams();
    let id = params.productId
  
  
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
  
    const getProductList = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/products?filters[id][$eq]=${id}&populate=thumbnail&populate=Images&populate=description&populate=categories&fields=price,title,stock,rating,discount`
      );
      return data;
    };
    
    const { isLoading, data,error } = useQuery({
      queryKey: ["products", id],
      queryFn: getProductList
    });
    let resData = data?.data[0]
    // console.log(resData);
    // console.log(resData?.Images);

    const { title } = resData || {};

    useEffect(() => {
      document.title = `product Store | Product ${title} Page`;
    }, [title]);

 if (!isOnline) return <Flex w={'full'} alignItems={'center'} flexWrap={'wrap'} mt={20} mb={20} justifyContent={'center'}>
       {Array.from({ length: 6 }, (_, idx) => (
           <Skelaton key={idx}  />
         )
       )}
   </Flex>;


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <span className="text-white text-lg">Loading product...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {error || 'Product not found'}
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Stack  minH={'100vh'}  w={'full'} mt={14} maxW={'1400px'} >
      <Stack  mx={'auto'}  w={'full'} minH={'100vh'} maxW={'1400px'}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery product={resData} />
          </div>

          {/* Product Information */}
          <div>
            <ProductInfo product={resData} />
          </div>
        </div>

        {/* Product Details */}
        <ProductDetailsa product={resData} />
      </Stack>
    </Stack>
  );
};