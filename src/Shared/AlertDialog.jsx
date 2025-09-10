"use client"

import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react"
// import { useState } from "react"
// import Lorem from "react-lorem-ipsum"

export default function AlertDialog({
  open,
  close,
  title,
  description,
  cancelText = 'Cancel',
  okText = "Save",
  varient = 'solid',
  onOkHandler,
  isLoading
  }) {
  // const [open, setOpen] = useState(false)
  
  return (
    <Dialog.Root placement={'center'}  lazyMount open={open} onOpenChange={(e) => e.open } >
      <Dialog.Trigger >
        {/* <Button variant="outline" display={'none'}>Open</Button> */}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={'4'}>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text >{description} </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant={'outline'}  p={'4'} onClick={close}>{cancelText}</Button>
              </Dialog.ActionTrigger>
              <Button p={'4'} variant={varient} colorPalette={'red'} onClick={onOkHandler} isLoading={isLoading} >{okText}</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm"  onClick={close} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
