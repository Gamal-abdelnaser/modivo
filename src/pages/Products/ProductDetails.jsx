
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  Heading,
  useBreakpointValue,
  Stack,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion.create(Box);

export const ProductDetailsa = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const isMobile = useBreakpointValue({ base: true, md: false });
  // const isMobile = false

  return (
    <Box mt="12" w="full" p={10}>
      <Flex
        direction={isMobile ? 'column' : 'row'}
        gap="8"
        w="full"
        align="start"
        justify="center"
      >
        {/* Vertical Tabs */}
        <VStack
          align="start"
          w={isMobile ? 'full' : '200px'}
          gap="2"
          borderLeft={isMobile ? 'none' : '1px solid'}
          borderColor="gray.700"
        >
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant="ghost"
              justifyContent="start"
              fontWeight="medium"
              fontSize="sm"
              w="full"
              color={activeTab === tab.id ? '#86df0e' : '#d8e8dd'}
              borderLeftWidth={activeTab === tab.id ? '1px' : '0px'}
              borderTop={"none"}
              borderRight={"none"}
              borderBottom={"none"}
              borderColor="#86df0e"
              _hover={{ color: '#86df0e' }}
              py="3"
              px="2"
              borderRadius="none"
              transition={'all 0.2s'}
              scrollBehavior={'smooth'}
              bg={'none'}
            >
              {tab.label}
            </Button>
          ))}
        </VStack>

        {/* Tab Content */}
        <Box flex="1" w="full" border={'1px solid #004750'} p={6} borderRadius={'sm'}>
          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <MotionBox
                key="description"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <List.Root gap="3">
                  {product.description?.map((detail, index) => (
                    <List.Item
                      key={index}
                      display="flex"
                      alignItems="center"
                      color="#d8e8dd"
                      fontSize={'sm'}
                      textAlign={'start'}
                    >
                      <Box w="1.5" h="1.5" bg="#86df0e" borderRadius="full" mr="4" />
                      {detail.text}
                    </List.Item>
                  ))}
                </List.Root>
              </MotionBox>
            )}

            {activeTab === 'details' && (
              <MotionBox
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <VStack align="start" gap="4"  borderRadius={'sm'}>
                  <Flex flexDir={'row'} w={'full'} h={'full'} >
                    <Stack display="flex" alignItems="start" color="#d8e8dd" border={'1px solid #004750'} w={'40%'} borderRight={'none'} p={4} h={'full'} fontSize={'sm'} borderRadius={'sm'} borderRightRadius={'none'}>
                      {/* <Box w="1.5" h="1.5" bg="#86df0e" borderRadius="full" mr="4" /> */}
                      Size
                    </Stack>
                    <Stack w={'60%'} textAlign={'start'} h={'full'} border={'1px solid #004750'} p={4} fontSize={'sm'} color="#d8e8dd" fontFamily={'mono'} borderRadius={'sm'} borderLeftRadius={'none'}>
                      S, M, L, XL
                    </Stack>
                  </Flex>
                </VStack>
              </MotionBox>
            )}

            {activeTab === 'reviews' && (
              <MotionBox
                key="reviews"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <VStack align="start" spacing="6">
                  <Flex w="full" justify="space-between" align="center">
                    {/* <Heading as="h3" size="md" color="white">
                      Customer Reviews
                    </Heading> */}
                    <HStack spacing="2">
                      <HStack spacing="1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating)
                                ? 'text-lime-400 fill-current'
                                : 'text-gray-600'
                              }`}
                          />
                        ))}
                      </HStack>
                      <Text fontSize="sm" color="gray.400">
                        {product.rating} out of 5 ({product.reviewCount} reviews)
                      </Text>
                    </HStack>
                  </Flex>
                </VStack>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </Flex>
    </Box>
  );
};
