// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
// // import { ProductImage } from '../types/prouct';


// export const ProductGallery = ({ product }) => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);
//   console.log(product);
//   console.log(product?.Images);

//   const images = product?.Images || [];
//   const nextImage = () => {
//     setSelectedImage((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row gap-4">
//       {/* Thumbnail Gallery */}
//       <div className="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto max-h-96">
//         {images.map((image, index) => (
//           <button
//             key={image.id}
//             onClick={() => setSelectedImage(index)}
//             className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${selectedImage === index
//                 ? 'border-cyan-400 shadow-lg shadow-cyan-400/20'
//                 : 'border-gray-600 hover:border-gray-500'
//               }`}
//           >
//             <img
//               src={`${import.meta.env.VITE_SERVER_URL}${image?.url}`}
//               alt={image.alt}
//               className="w-full h-full object-cover"
//             />
//           </button>
//         ))}
//       </div>

//       {/* Main Image */}
//       <div className="order-1 lg:order-2 relative flex-1 max-w-2xl mx-auto">
//         <div className="relative aspect-square bg-gray-800 rounded-xl overflow-hidden group">
//           <img
//              src={`${import.meta.env.VITE_SERVER_URL}${images[selectedImage]?.url}`}
//             alt={images[selectedImage]?.alt}
//             className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
//               }`}
//             onClick={() => setIsZoomed(!isZoomed)}
//           />

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevImage}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>

//           <button
//             onClick={nextImage}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>

//           {/* Zoom Icon */}
//           <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//             <ZoomIn className="w-5 h-5" />
//           </div>
//         </div>

//         {/* Image Counter */}
//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
//           {selectedImage + 1} / {images.length}
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';

export const ProductGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = product?.Images || [];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Stack direction={{ base: 'column', lg: 'row' }} gap={8} w="full">
      {/* Thumbnail Gallery */}
      <Flex
        order={{ base: 2, lg: 1 }}
        direction={{ base: 'row', lg: 'column' }}
        gap={2}
        overflowX={{ base: 'auto', lg: 'hidden' }}
        overflowY={{ base: 'hidden', lg: 'auto' }}
        // maxH="24rem"
      >
        {images.map((image, index) => (
          <Button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            p={0}
            minW="5rem"
            minH="7rem"
            flexShrink={0}
            overflow="hidden"
            rounded="lg"
            borderWidth="2px"
            borderColor={
              selectedImage === index ? '#86df0e' : 'gray.600'
            }
            boxShadow={
              selectedImage === index
                ? '0 0 10px '
                : 'none'
            }
            _hover={{
              transform: 'scale(1.05)',
              borderColor:
                selectedImage === index ? '#86df0e' : '#86df0e',
            }}
            transition="all 0.2s"
          >
            <Image
              src={`${image?.url}`}
              alt={image.alt}
              objectFit="cover"
              w="100%"
              h="100%"
            />
          </Button>
        ))}
      </Flex>

      {/* Main Image */}
      <Box
        order={{ base: 1, lg: 2 }}
        flex="1"
        mx="auto"
        position="relative"
      >
        <Box
          position="relative"
          rounded="xl" border={'1px solid #fff'}
          overflow="hidden"
          role="group"
        >
          <Image
            src={`${images[selectedImage]?.url}`}
            alt={images[selectedImage]?.alt}
            objectFit="cover"
            w="full"
            h="full"
            transition="transform 0.3s"
            transform={isZoomed ? 'scale(1.5)' : 'scale(1)'}
            cursor={isZoomed ? 'zoom-out' : 'zoom-in'}
            onClick={() => setIsZoomed(!isZoomed)}
          />

          {/* Navigation Arrows */}
          <IconButton
            onClick={prevImage}
            aria-label="Previous image"
            position="absolute"
            top="50%"
            left="1rem"
            transform="translateY(-50%)"
            bg="blackAlpha.600"
            _hover={{ bg: 'blackAlpha.800' }}
            color="Black"
            rounded="full"
            opacity={0}
            _groupHover={{ opacity: 1 }}
            transition="all 0.2s"
          ><IoIosArrowBack /></IconButton>

          <IconButton
            as={Button}
            onClick={nextImage}
            aria-label="Next image"
            position="absolute"
            top="50%"
            right="1rem"
            transform="translateY(-50%)"
            bg="blackAlpha.600"
            _hover={{ bg: 'blackAlpha.800' }}
            color="white"
            rounded="full"
            opacity={0}
            _groupHover={{ opacity: 1 }}
            transition="all 0.2s"
          ><ChevronRight /></IconButton>

          {/* Zoom Icon */}
          <Box
            position="absolute"
            top="1rem"
            right="1rem"
            bg="blackAlpha.600"
            color="white"
            p={2}
            rounded="full"
            opacity={0}
            _groupHover={{ opacity: 1 }}
            transition="opacity 0.2s"
          >
            <ZoomIn size={20} />
          </Box>
        </Box>

        {/* Image Counter */}
        <Box
          position="absolute"
          bottom="1rem"
          left="50%"
          transform="translateX(-50%)"
          bg="blackAlpha.700"
          color="white"
          px={3}
          py={1}
          rounded="full"
          fontSize="sm"
        >
          {selectedImage + 1} / {images.length}
        </Box>
      </Box>
    </Stack>
  );
};
