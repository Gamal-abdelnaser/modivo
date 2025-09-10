import React, { useEffect, useState } from 'react'
import { Box, Button, CloseButton, Drawer, Portal, Span, Stack, Text } from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { onCloseCartDrawerAction, onOpenCartDrawerAction, selectGlobal } from '@/app/features/globalSlice'
import CartDrawerItems from './cartDrawerItems'
import { clearCart, selectCart } from '@/app/features/cartSlice'
import { Link } from 'react-router'

const CartDrawer = () => {
  const [discountedTotalPrice, setDiscountedTotalPrice] = useState(0);
  const { isOpenCartDrawer  } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);
  // console.log(cartProducts);
  
  const dispatch = useDispatch();
  
  const onClose = () => dispatch(onCloseCartDrawerAction())

  useEffect(() => {
    let total = 0;
    let discountedTotal = 0;

    for (let i = 0; i < cartProducts.length; i++) {
      const itemTotal = cartProducts[i].price * cartProducts[i].quantity;
      total += itemTotal;
      discountedTotal += itemTotal * (1 - cartProducts[i].discount / 100);
    }

    setDiscountedTotalPrice(discountedTotal);
  }, [cartProducts]);

  
  return (
    <Drawer.Root 
      open={isOpenCartDrawer}
      onOpenChange={
        isOpenCartDrawer ? onClose : null
      }
      size={'sm'}
    >
      
      <Portal>
        <Drawer.Backdrop  />
        <Drawer.Positioner >
          <Drawer.Content p={4} bg="#09282e">
            <Drawer.Header>
              <Drawer.Title fontSize={'2xl'}>Your Shopping Cart</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body mt={8} p={2} gap={6}>
              <Stack gap='6'>

                {cartProducts.length ? cartProducts.map((item) => (
                  <CartDrawerItems key={item.id} {...item}  />
                )) : <Text fontSize={'lg'} color={'orange.200'} >Your cart is empty</Text>}
              </Stack>
            </Drawer.Body>
            
            <Drawer.Footer display={'flex'} flexDir={'column'} alignItems={'center'} w={'full'} color="#d8e8dd" p={2} gap={4} border={'1px solid #004750'}>
              {cartProducts.length > 0  &&
              <Box
                // onClick={handleAddToCartHandler}
                display={'flex'}
                _hover={{ bg: 'none' }}
                color="#d8e8dd"
                fontWeight="semibold"
                rounded="sm"
                w={'full'}
                textAlign={'center'}
                justifyContent={'space-between'}
                p={4}
                fontSize={'lg'}
                borderBottom={'1px solid #004750'}
                borderRadius={'none'}
              >
                <Span>Subtotal</Span> <Span>LE {discountedTotalPrice}.00 EGP</Span> 
              </Box>
              }
              {/* <Text fontSize={'12px'} w={'full'} p={4} textAlign={'center'}>Tax included. Shipping calculated at checkout.</Text> */}
              <Box display={'flex'} justifyContent={'center'} alignContent={'center'} w={'full'} >
                {
                  cartProducts.length > 0 ? (
                    <Button as={Link} to="/checkout" onClick={() => scrollTo(0, 0)} variant="outline"  px={2} mr={'2'} bg="#86df0e" _hover={{ bg: 'lime.600' }} color="black" w={'45%'}>checkout</Button>
                  ) : (
                      <Button as={Link} to="/products" onClick={isOpenCartDrawer ? onClose : null} variant="outline"  px={2} mr={'2'} bg="#86df0e" _hover={{ bg: 'lime.600' }} color="black" w={'45%'}>show Products</Button>
                  )
                }
                {/* <Button as={Link} to="/checkout" variant="outline"  px={2} mr={'2'} bg="#86df0e" _hover={{ bg: 'lime.600' }} color="black" w={'45%'}>checkout</Button> */}
                <Button variant="outline" onClick={() => dispatch(clearCart())} px={2} border={'1px solid #86df0e'} bg="#004750" _hover={{ bg: 'none' }} w={'45%'}>Clear All</Button>
              </Box>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" onClick={onClose} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default CartDrawer;