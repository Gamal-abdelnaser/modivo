import { Box, Button, Flex, IconButton, Image, Span, Stack, Text } from '@chakra-ui/react'
import { Minus } from 'lucide-react'
import React from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { updateCartQuantity, removeFromCart } from '@/app/features/cartSlice';

const CartDrawerItems = ({ id, thumbnail, title, discount, price, quantity, selectedSize }) => {
  const photo = thumbnail.url
  // console.log(photo);
  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(updateCartQuantity({ id, selectedSize, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(updateCartQuantity({ id, selectedSize, quantity: quantity - 1 }));
    }
  };

 // الخصم من Strapi (مثلا 15)
  // console.log(price);
  // console.log(discount);

  // تحويل الخصم لنسبة
  const discountedPrice = price * (1 - discount / 100);
  return (
    <>
      <Flex alignItems={'center'}  mb={0} gap={3}  w={'full'} p={0}  >
        <Box h={'150px'} w={'full'}   flex={1}>

          <Image
            src={`${photo}`}
            alt={title}
            w='full'
            h='full'
            objectFit='cover'
            // mr={2}
            // flex={1}
            rounded={'md'}
            />
        </Box>
        <Flex flexDir={'column'} flex={3} >
          <Stack color="#d8e8dd">
            <Text fontSize='sm' fontWeight="semibold" > {title} </Text>
            <Text fontSize='sm' fontWeight="semibold" > {selectedSize} </Text>
            {/* <Text fontSize='sm' fontWeight='bold' >Price : <Span color={'#86df0e'}>{price} LE</Span>  </Text> */}
            <Text fontSize="sm" fontWeight="semibold" color="#86df0e" textAlign={'start'} alignItems={'center'}>
              {discount > 0 &&<Span mr={'3'} textDecoration="line-through" fontSize={'sm'} color={'#d8e8dd8c'}>LE {price.toFixed(2)} </Span>} LE {discountedPrice.toFixed(2)} </Text>
            {/* <Text fontSize='sm' fontWeight='bold'>Quantity : {quantity} </Text> */}
            <Box display={'flex'} alignItems={'center'} gap={4} color="#d8e8dd">
              {/* <Text color="#d8e8dd" fontWeight="medium" mb={3} textAlign={'start'} fontSize="sm">Quantity</Text> */}
              <Flex align="center" gap={0}  bg={'#014751'} w={'fit-content'} py={1}>
                <Button
                  aria-label="Decrease"
                  onClick={handleDecrement}
                  isDisabled={quantity <= 1}
                  w="15px"
                  h="15px"
                  color="white"
                  rounded="lg"
                  // _hover={{ bg: 'gray.700' }}
                  _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                  bg='none'
                ><FiMinus size={'sm'} bg='none' /></Button>
                <Text w="20px" textAlign="center"  fontWeight="medium">
                  {quantity}
                </Text>
                <Button 
                  aria-label="Increase"
                  onClick={handleIncrement}
                  // isDisabled={quantity >= product.stock}
                  w="15px"
                  h="15px"
                  bg={'none'}
                  color="white"
                  rounded="lg"
                  // _hover={{ bg: 'gray.700' }}
                  _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                ><FiPlus fontSize={'2px'} /></Button>
              </Flex>
              
            </Box>
        </Stack>
      
        <Button
                mt={3}
                flex={2}
                w='full'
                px={1} py={2}
                variant='outline'
                colorPalette={'red'}
                color="#d8e8dd"
                size='xsm'
                // _hover={{color:'red.200'}}
                fontSize={'10px'}
                onClick={() => dispatch(removeFromCart(id))}
                // border={'none'}
                bg={'red.600'}
              >
                {/* <RiDeleteBin5Line size={'10px'} />  */}
                Remove
              </Button>
      </Flex>
      </Flex>
    </>
  )
}

export default CartDrawerItems