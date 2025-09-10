import DashboardOrdersTable from '@/components/dashboardOrdersTable'
import { Box, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const DashboardOrders = () => {
  return (
    <Box w={'full'}>
      <Text fontSize={'4xl'} my={2}  fontWeight={'bold'} textAlign={'start'}>Orders</Text>
      <DashboardOrdersTable />
    </Box>
  )
}

export default DashboardOrders