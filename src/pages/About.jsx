// import { Stack, Text } from '@chakra-ui/react';
// import React from 'react'

//  const About = () => {
//   return (
//     <Stack gap={6} p={10} maxW={'1000px'} m={'auto'}>
//       <Text fontSize={'lg'} fontWeight={'semibold'}>We are a youth-driven clothing brand that brings together the latest fashion trends with everyday comfort. Our mission is simple: to create stylish, high-quality pieces that let you express yourself while feeling completely at ease.

//         From modern designs to relaxed fits, every item in our collection is made to match the energy and lifestyle of today’s generation. Whether you’re heading out with friends, at work, or just chilling, we’ve got you covered with fashion that feels as good as it looks.</Text>
//     </Stack>
//   )
// }
// export default About;

import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Image,
  VStack,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import ono from '../assets/images/main.jpg'
import { Link } from "react-router";
// Usage: <AboutSection backgroundImage="/path/to/bg.jpg" />
export default function About({
  backgroundImage = "https://images.unsplash.com/photo-1520975911495-6c8d6a1b6f3a?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder",
  title = "About Our Brand",
  subtitle = "Modern style. Everyday comfort.",
  description = `We are a youth-driven clothing brand that combines the latest trends with effortless comfort. Each piece is crafted to help you feel confident and look fresh — whether you're out with friends, at work, or just chilling. Quality fabrics, clean silhouettes, and modern designs are at the heart of everything we make.`,
  ctaText = "Shop Now",
  onCta = () => (window.location.href = "/shop"),
}) {
  const isStacked = useBreakpointValue({ base: true, md: false });

  return (
    <Box as="section" position="relative" overflow="hidden" pt={{ base: 2, md: 0 }} px={{ base: 4, md: 0 }}>
      {/* Background image */}
      <Box
        position="absolute"
        inset={0}
        // backgroundImage={`url(${ono})`}
        backgroundSize="cover"
        backgroundPosition="center"
        filter="brightness(0.6)"
        zIndex={0}
      />

      {/* Overlay gradient for better contrast */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, rgba(0,0,0,0.25), rgba(0,0,0,0.45))"
        zIndex={1}
      />

      <Container maxW="6xl" zIndex={2} position="relative" py={{ base: 12, md: 24 }}>
        <HStack
          gap={8}
          alignItems="center"
          justifyContent="space-between"
          flexDirection={{ base: "column", md: "row" }}
        >
          <VStack
            alignItems="flex-start"
            gap={4}
            maxW={{ base: "unset", md: "100%" }}
            color="white"
          >
            <Heading as="h1" size={isStacked ? "lg" : "xl"} fontSize={'2xl'} fontWeight="700" >
              {title}
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="600"  opacity={0.9} textAlign={'start'} color={'#86df0e'}>
              {subtitle}
            </Text>

            <Text fontSize={{ base: "md", md: "lg" }} lineHeight="1.7" opacity={0.95} textAlign={'start'}>
              {description}
            </Text>

            
            <Button as={Link} to="/" mt={4} onClick={() => scrollTo(0, 0)} variant="outline" px={2} mr={'2'} bg="#86df0e" _hover={{ bg: 'lime.600' }} color="black" w={'45%'}>Shop Now</Button>
            
          </VStack>

          {/* Right side image or decorative card */}
          {/* <Box
            rounded="lg"
            bg="rgba(255,255,255,0.06)"
            p={4}
            boxShadow="md"
            minW={{ base: "80%", md: "360px" }}
            maxW={{ md: "420px" }}
            border={'1px solid #004750'}
          >
            <Image
              src={ono}
              alt="brand preview"
              objectFit="cover"
              w="100%"
              h={{ base: "200px", md: "320px" }}
              rounded="md"
              fallbackSrc="https://via.placeholder.com/420x320?text=Image"
            />

            <VStack align="stretch" mt={3} color="white" spacing={1}>
              <Text fontWeight="700" color="#86df0e">Designed for You</Text>
              <Text fontSize="sm" opacity={0.85}>
                Clean cuts · Comfortable fabrics · Lasting style
              </Text>
            </VStack>
          </Box> */}
        </HStack>
      </Container>
    </Box>
  );
}
