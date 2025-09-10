import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react"

export default function Skelaton() {
  return (
    <Stack 
      gap="6" 
      borderRadius={'20px'}
      mx={'auto'} 
      alignItems={'center'}
      my={7} w="sm" maxW={'sm'}
      bg={'gray.600'}
       padding={'12'}
       
    >
      <SkeletonCircle  size="20" />
        <SkeletonText noOfLines={1} />
      <HStack width="full">
        <SkeletonText noOfLines={2} />
      </HStack>
    </Stack>
  )
}