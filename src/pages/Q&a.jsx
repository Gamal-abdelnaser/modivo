import { Accordion, Avatar, Badge, Box, HStack, Image, Stack } from "@chakra-ui/react";
import { FaLightbulb } from "react-icons/fa";
import { LuTrophy } from "react-icons/lu";
import idea from '../assets/images/ideaLight.png';
import { useColorMode } from "@/components/ui/color-mode";




const items = [
  {
    question: "What if have received a wrong item or an item is missing ?",
    answer: 'We urge our customers to check items as soon as they are received to make sure they are in good condition and exactly what you ordered. If you find anything wrong with the product, please contact us immediately.',
    image: <FaLightbulb />,
    topRated: true,
  },
  {
    question: "What if i entered the incorrect shipping address ?",
    answer: 'Please, contact us as soon as possible with your question, order number, and updated shipping address. If your order has not yet shipped, we will gladly update your shipping information.',
    image: <FaLightbulb />,
    topRated: false,
  },
  {
    question: "how much is the shipping cost ?",
    answer: 'Shipping rates can vary depending on your region and are calculated at checkout. Here are the full details of our Shipping Policy.',
    image: <FaLightbulb />,
    topRated: false,
  },
  {
    question: "How long does delivery take ?",
    answer: 'We deliver our products to all regions throughout Egypt, with the exception of some governorates. Delivery within 3 to 7 working days (excluding any public holidays).The following are the shipping fees to all cities in Egypt Shipping Policy.',
    image: <FaLightbulb />,
    topRated: false,
  },
  {
    question: "How can I place an order?",
    answer: 'Simply browse our products, add your favorite items to the cart, and proceed to checkout.',
    image: <FaLightbulb />,
    topRated: false,
  },
  {
    question: "Can I return or exchange an item?",
    answer: 'Yes, you can return or exchange items within 14 days, as long as they are unused and in original packaging.',
    image: <FaLightbulb />,
    topRated: false,
  },
  {
    question: "What payment methods do you accept?",
    answer: 'We accept cash on delivery, credit/debit cards, and online payment methods.',
    image: <FaLightbulb />,
    topRated: false,
  },
]

 const Questions = () => {
  
  return (
    <Stack w={'100%'} mx={'auto'} >
      <Box w={'full'} maxW={'1300px'} mx={'auto'}  justifyItems={'center'} px={{ base: 2, sm: 4 }} py={6} mt={20} >
        <Stack w={'full'}  alignContent={'center'} maxW={'1300px'}  px={{md:20 , base: 2}}  >
          <Accordion.Root variant={'enclosed'} collapsible defaultValue={["b"]} border={'none'} spaceY={4}>
            {items.map((item, index) => (
              <Accordion.Item variant={'enclosed'} key={index} m={2} p={2} value={item.question} bg={'none'} border={'1px solid #004750'}>
                <Accordion.ItemTrigger bg={'none'}>
                  
                    <Image src={idea} w={{md:'50px',base:'30px'}} />
                  <HStack flex="1" fontSize={{md:'md',base:'sm'}} fontWeight={'bold'} >
                    {item.question}{" "}
                    
                  </HStack>
                  <Accordion.ItemIndicator color={'#86df0e'}  />
                </Accordion.ItemTrigger >
                <Accordion.ItemContent pl={{base:12,md:16}} bg={'none'} >
                  <Accordion.ItemBody textAlign={'start'} color={'#d8e8dd'} fontSize={{ md: 'md', base: 'xsm' }} >{item.answer}</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>

        </Stack>
      </Box>  
    </Stack>
  )
}


export default  Questions;