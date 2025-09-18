
import React from 'react'
import {
  Box,
  Button,
  Table,
  Text,
  Select,
  Dialog,
  Portal,
  CloseButton,
  Grid,
  Span,
  Stack
} from "@chakra-ui/react"
import DashboardTableSkeleton from "./DashboardTableSkeleton";
import { CiRead } from "react-icons/ci"
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import AlertDialog from "../Shared/AlertDialog";
import { useEffect, useState } from "react";
import { useDeleteDashboardOrdersMutation, useGetDashboardOrdersQuery, useUpdateDashboardOrdersMutation } from '@/app/services/orders';
import { selectNetwork } from '@/app/features/network';
import { useSelector } from 'react-redux';
const statusItems = [
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "canceled" },
];
const DashboardOrdersTable = () => {
  const {isOnline} = useSelector(selectNetwork)
  const [open, setOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const {
    isLoading,
    data,
    error,
    refetch,
  } = useGetDashboardOrdersQuery({ page: 1 });

  const [destroyOrder, { isLoading: isDestroying }] = useDeleteDashboardOrdersMutation()
    const [updateOrders, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateDashboardOrdersMutation()

  const [selectedOrderDocumentId, setSelectedOrderDocumentId] = useState(null);

  // useEffect(() => {
  //   console.log("Fetched orders:", data?.data);
  // }, [data]);

 

  const resData = data?.data

  const handleSubmit = () => {
    const updates = {
      OrderStatus: selectedOrder?.OrderStatus,
    };
    updateOrders({
      documentId: selectedOrderDocumentId,
      body: {
        data: {
          ...updates, // لو فيه صورة جديدة اربطها
        },
      },
    }).unwrap();

    console.log('✅ order updated successfully');

    setOpen(false);
  };

  const handleStatusChange = (status) => {
    setSelectedOrder((prev) => ({ ...prev, OrderStatus: status }));
  };


  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "#86df0e"; // أخضر
      case "shipped":
        return "#0b4f91"; // أزرق
      case "canceled":
        return "#8B0000"; // أحمر
      case "pending":
        return "#b59f05"; // أصفر
      default:
        return "transparent";
    }
  };
  if (isLoading || !isOnline) return <DashboardTableSkeleton />
  // if (error) return <Text>Error loading orders</Text>  

  return (
    <Box mx={'auto'} overflowX="auto" display={'flex'} minW="300px" py={2} flexDirection={'column'} justifyContent={'center'}  >
      <Table.Root size="sm" bg={'none'} maxW={'95%'}  mx={'auto'}>
        <Table.Header bg={'none'} >
          {

          }
          <Table.Row border={'1px solid #fff'} >
            <Table.ColumnHeader p={2} px={4} border={'2px solid #004750'} textAlign={'start'} >ID</Table.ColumnHeader>
            <Table.ColumnHeader p={2} px={4} border={'2px solid #004750'} textAlign={'center'} >Name</Table.ColumnHeader>
            <Table.ColumnHeader p={2} px={4} border={'2px solid #004750'} textAlign={'center'} >Phone</Table.ColumnHeader>
            <Table.ColumnHeader p={2} px={4} border={'2px solid #004750'} textAlign={'center'} >City</Table.ColumnHeader>
            <Table.ColumnHeader p={2} px={4} border={'2px solid #004750'} textAlign={'center'} >Address</Table.ColumnHeader>
            <Table.ColumnHeader p={2} px={4} border={'2px solid #004750'} textAlign={'center'} >Price</Table.ColumnHeader>
            <Table.ColumnHeader p={2} px={4} border={'2px solid #004750'} textAlign={'center'} >Payment</Table.ColumnHeader>
            <Table.ColumnHeader p={2} px={4} border={'2px solid #004750'} textAlign={'center'} >Postal Code</Table.ColumnHeader>
            <Table.ColumnHeader p={2} px={4} border={'2px solid #004750'} textAlign={'center'} >Status</Table.ColumnHeader>
            <Table.ColumnHeader p={2} px={4} border={'2px solid #004750'} textAlign={'center'} >Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body border={'1px solid #fff'}>
          {resData?.map((order, index) => (
            <React.Fragment key={index} >
              <Table.Row border={'1px solid #fff'} bg={ 'transparent'} >
                <Table.Cell p={3} px={4} border={'2px solid #004750'} >{order?.id}</Table.Cell>
                <Table.Cell p={3} px={4} border={'2px solid #004750'}  textAlign={'center'}>{order?.name}</Table.Cell>
                <Table.Cell p={3} px={4} border={'2px solid #004750'}  textAlign={'center'}>{order?.phone}</Table.Cell>
                <Table.Cell p={3} px={4} border={'2px solid #004750'}  textAlign={'center'}>{order?.city}</Table.Cell>
                <Table.Cell p={3} px={4} border={'2px solid #004750'}  textAlign={'center'}>{order?.address}</Table.Cell>
                <Table.Cell p={3} px={4} border={'2px solid #004750'}  textAlign={'center'}>{order?.total} LE</Table.Cell>
                <Table.Cell p={2} border={'2px solid #004750'}  textAlign={'center'}>{order?.paymentMethod}</Table.Cell>
                <Table.Cell p={2} border={'2px solid #004750'}  textAlign={'center'}>{order?.postalCode}</Table.Cell>
                <Table.Cell p={2} border={'2px solid #004750'} fontWeight={'semibold'} bg={getStatusColor(order?.OrderStatus)} textAlign={'center'}>{order?.OrderStatus}</Table.Cell>
                <Table.Cell p={2} textAlign="center" border={'2px solid #004750'}  >
                <Button size={'sm'} colorScheme={'purple'} m={1} 
                  onClick={() => {
                    setSelectedOrder(order)
                    setSelectedOrderDocumentId(order.documentId)
                    setDetailsOpen(true)
                  }}
                ><CiRead /></Button>
                {/* <Button size={'sm'} colorScheme={'blue'} m={1}><MdOutlineModeEdit /></Button> */}
                <Button size={'sm'} colorScheme='red'
                  m={1}
                  onClick={() => {
                    setSelectedOrderDocumentId(order.documentId);
                    setOpen(true);
                  }}
                >
                  <RiDeleteBin5Line />
                </Button>
              </Table.Cell>
            </Table.Row>
            </React.Fragment>
          ))}
        </Table.Body>
      </Table.Root>

      {/* ✅ Alert Dialog for Delete */}
      <AlertDialog
        open={open}
        close={(open) => setOpen(!open)}
        title="Confirm Deletion"
        description="Are you sure you want to delete this Order?"
        cancelText="Cancel"
        okText="Delete"
        isLoading={isDestroying}
        onOkHandler={async () => {
          if (selectedOrderDocumentId) {
            try {
              await destroyOrder(selectedOrderDocumentId).unwrap();
              refetch();
              setOpen(false);
            } catch (err) {
              console.error('Failed to delete:', err);
            }
          }
        }}
      />
      <Dialog.Root zIndex={99}
        placement={'center'}
        motionPreset="slide-in-bottom"
        open={detailsOpen} 
      >
        {/* <Dialog.Trigger asChild>
          <Button variant="outline">Open Dialog  </Button>
        </Dialog.Trigger> */}
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content p={4}>
              <Dialog.Header>
                {/* <Dialog.Title>Dialog Title</Dialog.Title> */}
              </Dialog.Header>
              
              <Dialog.Body pt={10} >
                {selectedOrder ? (
                  <>
                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                      <Box border={'1px solid #ffffffa8'} rounded={'sm'} p={2}><Text  fontWeight="normal" color={'#fff'} >ID :  <Span color={'#86df0e'}>{selectedOrder.id}</Span> </Text></Box>
                      <Box border={'1px solid #ffffffa8'} rounded={'sm'} p={2}><Text  fontWeight="normal" color={'#fff'} >Name : <Span color={'#86df0e'}>{selectedOrder.name}</Span></Text></Box>
                      <Box border={'1px solid #ffffffa8'} rounded={'sm'} p={2}><Text  fontWeight="normal" color={'#fff'} >Phone : <Span color={'#86df0e'}>{selectedOrder.phone}</Span></Text></Box>
                      <Box border={'1px solid #ffffffa8'} rounded={'sm'} p={2}><Text  fontWeight="normal" color={'#fff'} >City : <Span color={'#86df0e'}>{selectedOrder.city}</Span></Text></Box>
                      <Box border={'1px solid #ffffffa8'} rounded={'sm'} p={2}><Text  fontWeight="normal" color={'#fff'} >Address : <Span color={'#86df0e'}>{selectedOrder.address}</Span></Text></Box>
                      <Box border={'1px solid #ffffffa8'} rounded={'sm'} p={2}><Text  fontWeight="normal" color={'#fff'} >Total : <Span color={'#86df0e'}>{selectedOrder.total}</Span> LE</Text></Box>
                      <Box border={'1px solid #ffffffa8'} rounded={'sm'} p={2}><Text  fontWeight="normal" color={'#fff'} >Payment : <Span color={'#86df0e'}>{selectedOrder.paymentMethod}</Span></Text></Box>
                      <Box border={'1px solid #ffffffa8'} rounded={'sm'} p={2}><Text  fontWeight="normal" color={'#fff'} >Postal Code : <Span color={'#86df0e'}>{selectedOrder.postalCode}</Span></Text></Box>
                    </Grid>

                    {selectedOrder.cartItems?.length > 0 && (
                      <Box mt={4}>
                        <Text fontWeight="semibold">Products:</Text>
                        {selectedOrder.cartItems.map((p, i) => (
                          <Text key={i}>- {p.product} <Span color={'#86df0e'}>({p.quantity})</Span></Text>
                        ))}
                      </Box>
                    )}
                    <Stack gap={2} display={'flex'} my={4} direction={'column'}>
                      <Text fontWeight="semibold">Status:</Text>
                      <Stack gap={2} direction={'row'} flexWrap={'wrap'}>
                        {statusItems.map((status) => (
                          <Button 
                            w={'fit-content'}
                            px={2}
                            key={status.value}
                            bg={status.value === selectedOrder.OrderStatus ? "#86df0e" : "#ffffff1a"}
                            color={status.value === selectedOrder.OrderStatus ? "black" : "white"}
                            variant={status.value === selectedOrder.OrderStatus ? "solid" : "solid"}
                            onClick={() => handleStatusChange(status.value)}
                          >
                            { status.label }
                          </Button>
                          
                        ))}
                      </Stack>
                    </Stack>

                    {/* <Box mt={4}>
                      <Text fontWeight="bold" mb={2}>Change Status:</Text>
                      <Select.Root  size="sm" width="320px" >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger px={4}>
                            <Select.ValueText placeholder="Select Status" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner>
                            <Select.Content>
                              {
                                ['pending','processing','shipped','delivered'].map((status) => (
                                  <Select.Item item={status} key={status}>
                                    {status}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))
                              }
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </Box> */}
                  </>
                ) : (
                  <Text>No order selected</Text>
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button px={4} variant="outline" onClick={() => setDetailsOpen(false)}>Cancel</Button>
                </Dialog.ActionTrigger>
                <Button px={4} onClick={() => { handleSubmit(); setDetailsOpen(false); }}>Save</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild onClick={() => setDetailsOpen(false)}>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      
    </Box>
  )
}

export default DashboardOrdersTable

