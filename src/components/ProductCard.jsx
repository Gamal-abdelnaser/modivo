// import { Heading } from 'lucide-react'
import { Box, Button, Card, Center, Heading, Image, Span, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router"
import { useColorMode, useColorModeValue } from "./ui/color-mode"

export default function ProductCard({product}) {
  // console.log(product);

  const url = product?.thumbnail?.url;
  const price = product.price;       // سعر المنتج
  const discount = product?.discount; // الخصم من Strapi (مثلا 15)
  // console.log(url);
  // console.log(price);
  // console.log(discount);

  // تحويل الخصم لنسبة
  const discountedPrice = price * (1 - discount / 100);
  return(
    <Card.Root maxW="sm" bg={'none'} border={'1px solid #004750'} scrollBehavior={'smooth'} overflow="hidden" as={Link} to={`/products/${product.id}`} onClick={() =>scrollTo(0,0)}>
      <Box h={'400px'} w={'100%'}  position="relative" overflow="hidden">
        <Image
          src={`${url}`} 
          alt="Green double couch with wooden legs"
          mx={'auto'}
          // maxH={'450px'}
          w={'100%'}
          maxW={'100%'}
          objectFit={'cover'}
        />
      </Box>
      <Card.Body px={4} py={2} color={'white'}>
        <Card.Title textStyle="xl" color={'white'}>{product.title}</Card.Title>
        
        <Text textStyle="lg"  fontWeight="medium" letterSpacing="tight"  mt="2">
          {discount > 0 && <Span mr={'3'} color={'#aaaaaf'} textDecoration="line-through" >{(price).toFixed(2)}LE</Span>} <Span color={'#86df0e'}>{ discountedPrice.toFixed(0) }.00 LE</Span> 
        </Text>
      </Card.Body>
    </Card.Root>

  )
}