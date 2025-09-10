import { networkMode } from '@/app/features/network';
import { toaster } from '@/components/ui/toaster';
import { Box } from '@chakra-ui/react';
import React, { Children, use, useEffect, useState } from 'react'
import { BsWifiOff } from 'react-icons/bs';
import { MdSignalWifiStatusbarConnectedNoInternet1 } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const InternetConnectionProvider = ({ children }) => {
  const dispatch = useDispatch();

  function closeToaster() {
    toaster.dismiss();
  }

  useEffect(() => {
    const handleOnline = () => {
      dispatch(networkMode(true))
      closeToaster();
      console.log(navigator.onLine);
      toaster.create({
        title: "You are back online",
        description: "You can continue shopping",
        type: 'success',
        closable: true,
      });
    };

    const handleOffline = () => {
      closeToaster();
      dispatch(networkMode(false))
      console.log(navigator.onLine);
      toaster.create({
        title: < >
          <BsWifiOff size={20} />You are offline
        </>,
        description: "Please check your internet connection",
        type: 'loading',
        closable: true,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    children
  )
}

export default InternetConnectionProvider;