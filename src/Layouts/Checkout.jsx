
import visaCash from '../assets/images/payments/visacash.png'
import mobilCash from '../assets/images/payments/mobilcash.png'
import cashonDelevaey from '../assets/images/payments/COD.png'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, selectOrder } from "../app/features/orderSlice";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Image,
  Stack,
  Text,
  Textarea,
  VStack,
  Field ,
  Span,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { selectCart } from '@/app/features/cartSlice';
import { toaster } from '@/components/ui/toaster';
// ✅ Schema for validation
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3, "Too short"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Enter a valid phone number")
    .required("Phone is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string()
    .matches(/^[0-9]{4,10}$/, "Enter a valid postal code")
    .required("Postal Code is required"),
  notes: Yup.string().max(200, "Max 200 characters"),
});
// const icv = [FaPlus,FaMinus, FaShoppingCart,FaCreditCard,FaMobileAlt,FaBuilding,FaCheck]

const Checkout = () => {
    const [discountedTotalPrice, setDiscountedTotalPrice] = useState(0);
  const { cartProducts } = useSelector(selectCart);
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(selectOrder);
  const shipping = 80;

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





  // console.log('customerInfo', customerInfo);
  const paymentOptions = [
      {
        label: 'Credit/Debit Card',
        value: 'card',
        Icon: visaCash,
      
      },
      {
        label: 'Mobile Payment',
        value: 'mobil cash',
        Icon: mobilCash,
        
      },
      {
        label: 'Cash on Delivery',
        value: 'cash',
        Icon: cashonDelevaey,
        note: 'Cash on delivery',
      },
    ];
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
    paymentMethod: paymentMethod,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validatePhone = (phone) => /^\d{11}$/.test(phone);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // امسح الغلط أول ما يبدأ يكتب
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (!customerInfo[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "This field is required",
      }));
    }
  };

  let newErrors = {};
  const validate = () => {

    if (!customerInfo.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!validatePhone(customerInfo.phone)) {
      newErrors.phone = "Phone must be 11 digits";
    }
    if (!customerInfo.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!customerInfo.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!customerInfo.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    } else if (!/^[0-9]{4,10}$/.test(customerInfo.postalCode)) {
      newErrors.postalCode = "Postal Code must be 4-10 digits";
    }
    
    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // stop لو فيه أخطاء
    }
    if (!customerInfo.phone) {
      newErrors.phone = "Phone is required";
    }

    const orderData = {
      name: customerInfo.name,
      address: customerInfo.address,
      phone: customerInfo.phone,
      city: customerInfo.city,
      postalCode: customerInfo.postalCode,
      notes: customerInfo.notes,
      paymentMethod,
      cartItems: cartProducts.map((item) => ({
        product: item.title,
        price: item.price,
        quantity: item.quantity,
        size: item.selectedSize,
      })),
      total: discountedTotalPrice + shipping,
      OrderStatus: "pending"
    };

    dispatch(createOrder(orderData));
    console.log("Order submitted ✅:", orderData);
    toaster.create({
      placement: "top-end",
      overlap: true,
      description: "Order submitted successfully",
      type: "success",
      closable: true,
    });
    // reset form
    setCustomerInfo({
      name: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      notes: "",
      paymentMethod: paymentMethod,
    });
    setTouched({});
    dispatch({ type: 'cart/clearCart' });
    window.location.href = `/`; // Redirect to order confirmation page
  };



  cartProducts.length === 0 && (window.location.href = '/');

  return (
    <Box minH="100vh" bg="#09282e" py={8} px={4}>
      <Box maxW="1300px" mx="auto" as="form" onSubmit={handleSubmit}>
        {
          cartProducts.length === 0 ? (
            <Text fontSize={'lg'} color={'orange.200'} textAlign={'center'}>Your cart is empty</Text>
          ) : (
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
              {/* Order Summary */}
              <Box order={{ base: 2, lg: 2 }} maxH={'100vh'}>
            <Stack
              // bg="whiteAlpha.50"
              backdropFilter="blur(8px)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              borderRadius="2xl"
              p={8}
              gap={'4'}
              maxH={'100vh'}
            >
              <HStack mb={6} gap={1} color="#86df0e">
                <FaShoppingCart size={20}  />
                <Heading size="md" >
                  Order summary
                </Heading>
              </HStack>

              {cartProducts.length ? cartProducts.map((item) => (
                <ProductsSelected key={item.id} {...item} />
              )) : <Text fontSize={'lg'} color={'orange.200'} >No Products selected</Text>}
              <Stack gap={3} >

                <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'} >
                  <Text>Subtotal</Text>
                  <Text fontSize="sm" fontWeight="semibold" color="#" textAlign={'start'} alignItems={'center'}>
                    E£ {discountedTotalPrice.toFixed(2)}
                  </Text>
                </Flex>
                <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'} >
                  <Text>Shipping</Text>
                  <Text fontSize="sm" fontWeight="semibold" color="#" textAlign={'start'} alignItems={'center'}>
                    E£ {shipping}
                  </Text>
                </Flex>
                {/* <Divider borderColor="whiteAlpha.100" /> */}
                <Flex justify="space-between" pt={10}  fontSize="lg" fontWeight="bold" color="white">
                  <Text>Total</Text>
                  <Text color="#86df0e"><Span fontSize={'12px'} color={'#ffffffa8'}> EGP </Span> {discountedTotalPrice + shipping}.00</Text>
                </Flex>
              </Stack>
              
            </Stack>
          </Box>

          {/* Customer & Payment */}
          <Box order={{ base: 2, lg: 1 }}>
            {/* Customer Info */}
            <Box
              backdropFilter="blur(8px)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              borderRadius="2xl"
              p={6}
              mb={6}
            >
              <Heading size="xl" color="white" mb={6} textAlign={'start'}>
                Delivery
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: '1fr ' }} gap={4} mb={4}>

                <Field.Root required invalid>
                  <Input
                    w={'full'}
                    required
                    type="text"
                      name={'name'}
                      value={customerInfo['name']}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      bg="whiteAlpha.10"
                      borderColor={
                        touched['name'] && errors['name']
                          ? "red.400"
                          : touched['name'] && !errors['name']
                            ? "whiteAlpha.200"
                            : "whiteAlpha.200"
                      }
                      color="white"
                      placeholder={'Enter your name'}
                      _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: touched['name'] && errors['name'] ? "red.400" : "#86df0e"
                    }}
                      outline={'none'}
                      p={2}
                    />
                    {touched['name'] && errors['name'] ? (
                      <Text color="red.400" fontSize="sm" mt={1}>
                        {errors['name']}
                      </Text>
                    ) : null}
                    {/* <Field.ErrorText color="red.400">{errors.name}</Field.ErrorText> */}
                  </Field.Root>
              </Grid>

              {[
                // { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your.email@example.com' },
                { name: 'phone', label: 'Phone Number', type: 'number', placeholder: 'Phone Number' },
                { name: 'address', label: 'Address', type: 'text', placeholder: 'Address'},
                { name: 'city', label: 'City', type: 'text', placeholder: 'City' },
                { name: 'postalCode', label: 'Postal Code', type: 'number', placeholder: 'Postal Code ' },
              ].map((fild) => (
                <Field.Root key={fild.name} required mb={4} >
                  {/* <Field.Label color="gray.300" fontSize="sm">
                    {Field.label}
                  </Field.Label> */}
                  <Input
                  required
                    type={fild.type}
                    name={fild.name}
                    value={customerInfo[fild.name]}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                    bg="whiteAlpha.10"
                    borderColor={
                      touched[fild.name] && errors[fild.name]
                        ? "red.400"
                        : touched[fild.name] && !errors[fild.name]
                          ? "whiteAlpha.200"
                          : "whiteAlpha.200"
                    }
                    color="white"
                    placeholder={fild.placeholder}
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: touched[fild.name] && errors[fild.name] ? "red.400" : "#86df0e"
                    }}
                    outline="none"
                    p={3}
                  />
                  {touched[fild.name] && errors[fild.name] && (
                    <Text color="red.400" fontSize="sm" mt={1}>
                      {errors[fild.name]}
                    </Text>
                  )}
                </Field.Root>
              ))}

              <Field.Root mb={4}>
                {/* <Field.Label color="gray.300" fontSize="sm">
                  Order Notes (Optional)
                </Field.Label> */}
                <Textarea
                  rows={3}
                  value={customerInfo.notes}
                  name={'notes'}
                  onChange={handleInputChange}
                  bg="whiteAlpha.10"
                  borderColor="whiteAlpha.200"
                  color="white"
                  placeholder="Any special instructions for your order..."
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{ borderColor: "#86df0e" }}
                  outline={'none'}
                  p={2}
                />
              </Field.Root>
            </Box>

            {/* Payment Methods */}
            <Box
              bg="whiteAlpha.50"
              backdropFilter="blur(8px)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              borderRadius="2xl"
              p={6}
              mb={6}
            >
              <Text fontSize="lg" fontWeight="bold" color="white" mb={4}>
                Payment Method
              </Text>
              <VStack gap={3}>
                {paymentOptions.map((opt) => (
                  <Box
                    key={opt.value}
                    w="full"
                    p={4}
                    border="1px solid"
                    borderColor={paymentMethod === opt.value ? '#86df0e' : 'whiteAlpha.200'}
                    bg={paymentMethod === opt.value ? '#86df0e20' : 'rgba(255,255,255,0.05)'}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => setPaymentMethod(opt.value)}
                  >
                    <Flex align="center" gap={5}>
                      <Box {...(opt.value === 'cash' ? { maxW: '30px' } : { maxW: '50%' })}>
                        <Image src={opt.Icon} maxW={'full'}   alt={`Payment Method ${opt.label}`} />
                      </Box>
                      
                      {opt.note && (
                        <Text color="gray.100" fontSize="md" fontWeight={'bold'} >
                          {opt.note}
                        </Text>
                      )}
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Terms & Submit */}
           
            <Button
              type="submit"
              isFullWidth
              size="lg"
              fontWeight="bold"
              color="white"
              p={4}
              bg={ '#86df0e' }
              _hover={{ shadow: 'lg', transform: 'scale(1.02)' }}
              // _disabled={{ opacity: 0.5, cursor: 'not-allowed', loading: true }}
              disabled={loading}
              loading={loading}
              // onClick={handleCheckout}
            >
              {loading ? "Sending..." : "Submit Order"}
            </Button>
          </Box>
        </Grid>
          )}
      </Box>
    </Box>
  );
};

export default Checkout;

const ProductsSelected = ({ id, thumbnail, title ,price, quantity, selectedSize } ) => {
  const photo = thumbnail.url
  return (
    <>
      <Flex alignItems={'center'}  mb={0} gap={1}  w={'full'} p={0} borderRadius={'1px solid #fff'} >
        <Stack  w={'full'}   >
          <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'} >
            <Stack display={'flex'} flexDir={'row'} gap={3} alignItems={'center'}>
              <Box bg="whiteAlpha.50" 
                border={'1px solid #40575d'} rounded={'md'} overflow={'hidden'} w={'60px'} h={'70px'} position={'relative'}>
                <Image
                  src={`${photo}`}
                  alt={title}
                  // w={'full'}
                  posi
                  objectFit='contain'   
                  bg="whiteAlpha.50"
                  overflow={'hidden'}
                  />
              </Box>
              <Box textAlign={'start'}>
                <Text fontSize='sm' fontWeight="semibold" > {title} </Text>
                <Text fontSize='12px' fontWeight="normal" color={'#ffffffa8'} > Quantity : <Span color={'#86df0e'}>{quantity}</Span>  </Text>
                <Text fontSize='12px' fontWeight="normal" color={'#ffffffa8'} > Size : <Span color={'#86df0e'}>{selectedSize}</Span> </Text>
              </Box>
            </Stack>
            <Text fontSize="sm" fontWeight="semibold" color="#" textAlign={'start'} alignItems={'center'}>
              E£ {price.toFixed(2)}
            </Text>
            {/* <Text>{quantity}</Text> */}
          </Flex>
          
          
        </Stack>
      </Flex>
    </>
  )
} 