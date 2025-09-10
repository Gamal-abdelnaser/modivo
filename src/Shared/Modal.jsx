import React from 'react'
import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Portal,
} from "@chakra-ui/react"
// onOpenChange = {(e) => setOpen(e.open)
const CustomModal = ({ 
  isOpen ,
  setIsOpen,
  title, okTxt = 'Done',
  cancelTxt = 'Cancel', 
  children, 
  onOkClick,
  isLoading
}) => {
  return (
    <HStack wrap="wrap" gap="4">
      <Dialog.Root
        placement={'center'}
        motionPreset="slide-in-bottom"
        lazyMount open={isOpen} onOpenChange={(e) =>  setIsOpen(!e)}>
        {/* <Dialog.Trigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </Dialog.Trigger> */}
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content p={4}>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body >
                {children}
              </Dialog.Body>
              <Dialog.Footer py={4}>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" p={2}>{cancelTxt}</Button>
                </Dialog.ActionTrigger>
                <Button colorPalette={'blue'} p={2} onClick={onOkClick} loading={isLoading}>{okTxt}</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  )
}

export default CustomModal;