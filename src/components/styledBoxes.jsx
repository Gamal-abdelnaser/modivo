import { Box } from "@chakra-ui/react"

export const Dooted = () => {

  return (<div>
    {
      [0, 10, 20, 30, 40, 50,60,70].map((item) => {
        return <Box position={'absolute'} key={`top-${item}`} content={`"''"`} boxSize={'5px'} top={0} right={`${item}px`} bg={'#86df0e'} borderRadius={'full'} ></Box>
      })
    }
    {
      [0, 10, 20, 30, 40, 50, 60, 70].map((item) => {
        return <Box position={'absolute'} key={`right-${item}`} content={`"''"`} boxSize={'5px'} top={`${item}px`} right={0} bg={'#86df0e'} borderRadius={'full'} ></Box>
      })
    }
    {
      [0, 10, 20, 30, 40, 50, 60, 70].map((item) => {
        return <Box position={'absolute'} key={`left-${item}`} content={`"''"`} boxSize={'5px'} bottom={`${item}px`} left={'0px'} bg={'#86df0e'} borderRadius={'full'} ></Box>
      })
    }
    {
      [0, 10, 20, 30, 40, 50, 60, 70].map((item) => {
        return <Box position={'absolute'} key={`bottom-${item}`} content={`"''"`} boxSize={'5px'} bottom={'0px'} left={`${item}px`} bg={'#86df0e'} borderRadius={'full'} ></Box>
      })
    }
  </div>)

}