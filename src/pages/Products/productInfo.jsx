

import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Span,
  Stack,
  Text,
  // Divider,
  // useToast,
} from '@chakra-ui/react';
import { Star, Minus, Plus, Heart, HelpCircle } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { addToCart } from '@/app/features/cartSlice';
import { useDispatch } from 'react-redux';
import { IoMdStarOutline } from 'react-icons/io';
import { RiQuestionLine } from 'react-icons/ri';

const variants = [
  { size: "S", available: true },
  { size: "M", available: true },
  { size: "L", available: true },
  { size: "XL", available: false },
];

export const ProductInfo = ({ product }) => {
  // console.log(product);
  
  const [selectedSize, setSelectedSize] = useState(
    variants.find(v => v.available)?.size || 'S'
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const incrementQuantity = () => {
    if (quantity < product.stock) setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };



  const handleBuyNow = () => {
    console.log('Buy now:', { product: product.id, size: selectedSize, quantity });
  };
  const dispatch = useDispatch();

  const handleAddToCartHandler = () => {
    dispatch(addToCart({
      ...product,
      quantity,
      selectedSize,
    }));

    // Reset UI quantity after adding to cart
    setQuantity(1);
  };

  // console.log(product);
  const price = product.price;       // سعر المنتج
  const discount = product?.discount; // الخصم من Strapi (مثلا 15)
  // console.log(price);
  // console.log(discount);

  // تحويل الخصم لنسبة
  const discountedPrice = price * (1 - discount / 100);
  // console.log(discountedPrice);
  
  return (
    <Stack gap={6}>
      {/* Title & Rating */}
      <Stack gap={6}>
        <Text fontSize="3xl" fontWeight="bold" color="#d8e8dd"  textAlign={'start'}>
          {product.title}
        </Text>

        <Flex align="center" gap={2} >
          <Flex>
            {[...Array(5)].map((_, i) => (<IoMdStarOutline
              key={i}
              size={20}
              className={
                i < Math.floor(product.rating)
                    ? 'text-lime-400 fill-current'
                    : i < product.rating
                      ? 'text-lime-400 fill-current opacity-50'
                      : 'text-gray-600'
                }
              />
            ))}
          </Flex>
          <Text fontSize="sm" color="#585858">
            {product.rating}
          </Text>
        </Flex>

        <Text fontSize="2xl" fontWeight="semibold" color="#86df0e" textAlign={'start'} alignItems={'center'}>
          LE {discountedPrice.toFixed(0)}.00 {discount > 0 && <Span mr={'3'}  textDecoration="line-through" fontSize={'lg'} color={'#d8e8dd8c'}>{product.price.toFixed(0)}.00</Span>}
          {discount > 0 && <Span fontSize={'10px'} fontFamily={'heading'} px={'3'} color={'#000'} fontWeight={'bold'} borderRadius={'10px'} bg={'#fff'}>{discount}% Off</Span>}
        </Text>
        
      </Stack>

      {/* Price */}
      

      {/* Stock Status */}
      <Flex align="center" textAlign={'start'} >
        {/* <Box bg="lime.400" borderRadius="full" /> */}
        <Text color="#d8e8dd" fontSize="sm" fontWeight="medium" textAlign={'start'}>
          Low stock: {product.stock} left
        </Text>
      </Flex>

      {/* <Divider borderColor="gray.700" /> */}

      {/* Size Selection */}
      <Box>
        <Flex justify="space-between" align="center" mb={3} color="#d8e8dd" >
          <Text color="#d8e8dd" fontWeight="medium" fontSize={'sm'}>Size: <Span color={'white'}>{selectedSize}</Span></Text>
          <Button variant="link"  fontSize="xsm" _hover={{ color: '#86df0e' }} textDecoration={'ActiveBorder'}>
            Find your size
          </Button>
        </Flex>
        <Flex gap={2}>
          {variants.map((variant) => (
            <Button
              key={variant.size}
              onClick={() => variant.available && setSelectedSize(variant.size)}
              px={2}
              py={2}
              fontWeight="medium"
              rounded="sm"
              fontSize="sm"
              border="1px solid #d8e8dd1a"
              borderColor={
                selectedSize === variant.size
                  ? '#86df0e'
                  : variant.available ? 'gray.600' : 'gray.700'
              }
              color={
                selectedSize === variant.size
                  ? '#d8e8dd'
                  : variant.available ? 'gray.300' : 'gray.600'
              }
              bg={selectedSize === variant.size ? '#004750' : 'transparent'}
              cursor={variant.available ? 'pointer' : 'not-allowed'}
              _hover={
                variant.available && selectedSize !== variant.size
                  ? { borderColor: 'gray.500' }
                  : {}
              }
            >
              {variant.size}
            </Button>
          ))}
        </Flex>
      </Box>

      {/* Quantity */}
      <Box>
        <Text color="#d8e8dd" fontWeight="medium" mb={3} textAlign={'start'} fontSize="sm">Quantity</Text>
        <Flex align="center" gap={1} mb={2} bg={'#014751'} w={'fit-content'} py={0}>
          <IconButton
          icon={<Minus size={16} />}
            aria-label="Decrease"
            onClick={decrementQuantity}
            isDisabled={quantity <= 1}
            w="30px"
            h="30px"
            color="white"
            rounded="lg"
            _hover={{ color: '#86df0e' }}
            _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
            bg='none'
          ><FiMinus size={16} /></IconButton>
          <Text w="30px" textAlign="center" color="white" fontWeight="medium">
            {quantity}
          </Text>
          <IconButton 
            aria-label="Increase"
            onClick={incrementQuantity}
            isDisabled={quantity >= product.stock}
            w="30px"
            h="30px"
            bg={'none'}
            color="white"
            rounded="lg"
            _hover={{ color: '#86df0e' }}
            _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
          ><FiPlus size={16} /></IconButton>
        </Flex>
      </Box>

      {/* Action Buttons */}
      <Stack gap={3}>
        <Flex gap={3}>
          <Button
            onClick={handleAddToCartHandler}
            flex="1"
            bg="#004750"
            border={'1px solid #86df0e'}
            _hover={{ bg: 'none' }}
            color="#d8e8dd"
            fontWeight="semibold"
            py={3}
            px={6}
            rounded="sm"
            colo
          >
            Add to cart -  {(discountedPrice * quantity).toFixed(2)}
          </Button>
          <IconButton
            onClick={() => setIsWishlisted(!isWishlisted)}
            aria-label="Wishlist"
            border="1px solid"
            borderColor={isWishlisted ? 'red.500' : 'gray.600'}
            color={isWishlisted ? 'red.500' : 'gray.400'}
            bg={isWishlisted ? 'red.500Alpha.100' : 'transparent'}
            rounded="lg"
            _hover={{
              borderColor: isWishlisted ? 'red.500' : 'gray.500',
            }}
          ><Heart className={isWishlisted ? 'fill-current' : ''} /></IconButton>
        </Flex>

        {/* <Button
          onClick={handleBuyNow}
          w="full"
          bg="#86df0e"
          _hover={{ bg: 'lime.600' }}
          color="black"
          fontWeight="bold"
          py={3}
          px={6}
          rounded="sm"
        >
          BUY IT NOW
        </Button> */}
      </Stack>

      {/* Ask a Question */}
      <Button
        variant="ghost"
        leftIcon={<HelpCircle size={20} />}
        color="gray.400"
        _hover={{ color: '#86df0e' }}
        w="fit-content"
        px={0}
        bg={'none'}
      >
        <RiQuestionLine  size={20}/>
        Ask a question
      </Button>
    </Stack>
  );
};
