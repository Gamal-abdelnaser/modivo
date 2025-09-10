'use client'

import { useColorModeValue } from '@/components/ui/color-mode'
import {
  Flex,
  Box,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Field,
  StackSeparator,
  Group,
} from '@chakra-ui/react'
import { useState } from 'react'
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { Form, Navigate, Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '@/app/features/loginSlice';
import { Toaster, toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';

export default function Login({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to={'/'} replace />

  const dispatch = useDispatch()
  const {loading , data , error} = useSelector((state) => state.login);
  // const [isloading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    identifier: "",
    password: ""
  });
  const [isidentifier, setIsidentifier] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandeler = e => {
    const {name , value} = e.target;
    setUser({ ...user, [name]: value })
  }
  const submitHandeler = (e) => {
    e.preventDefault();

    const identifierEmpty = !user.identifier;
    const passwordEmpty = !user.password;

    // Set error states
    setIsidentifier(identifierEmpty);
    setIsPassword(passwordEmpty);

    // If either is missing, stop
    if (identifierEmpty || passwordEmpty) {
      return;
    }


    // All valid, proceed
    console.log(user);
    dispatch(userLogin(user))
    setUser({ identifier: '', password: '' });
  };



  useEffect(() => {   
   
    if (error) {
      toaster.create({
        title: error?.message || "password or email is wrong",
        description: "please check your email and password",
        type: "error",
        duration: 2000,        
      });
      return;
    }
    
     else if (data) {
      toaster.success({
        title: "login success",
        description: "Welcome to our application",
        type: "success",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
        
      })
      return;
    }
    
  }, [loading, error, data]);

  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    // bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack p={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack gap={4} align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <span color={'blue.400'}>features</span> ✌️
          </Text>
        </Stack>
        <Box
          as={'form'}
          onSubmit={submitHandeler}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          
          <Stack gap={4}  >
            <Toaster />
            <Field.Root id="identifier" invalid={isidentifier}  borderRadius={'7px'}>
              <Field.Label>Email address</Field.Label>
              <Input
                border={isidentifier ? '1px solid red' : '1px solid #27272a'} 
                p={2} 
                type="email" 
                // variant="outline"
                placeholder="me@example.com"
                name='identifier' 
                value={user.identifier} 
                onChange={onChangeHandeler} borderRadius={'7px'}/>
              {isidentifier ? <Field.ErrorText>identifier Is required</Field.ErrorText>: null }
            </Field.Root>
            <Field.Root id="password" invalid={isPassword}>
              <Field.Label>Password</Field.Label>
              <Group attached w="full" border={isPassword ? '1px solid red' : '1px solid #27272a'} maxW="sm" borderRadius={'7px'}>
                <Input
                  p={2}
                  type={showPassword ? 'text' : 'password'}
                  flex="1" 
                  variant="none" 
                  name='password'
                  value={user.password}
                  onChange={onChangeHandeler}
                />
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}
                  outline={'none'}
                  bg={'none'}
                >
                  {showPassword ? <FaEye /> : <IoIosEyeOff />}

                </Button>

              </Group>
              {isPassword && <Field.ErrorText>Password is required</Field.ErrorText>}            </Field.Root>
            <Stack gap={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                {/* <Checkbox>Remember me</Checkbox> */}
                <Checkbox.Root>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Remember me</Checkbox.Label>
                </Checkbox.Root>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={isidentifier || isPassword ? "red.500" : 'blue.400'}
                color={'white'}
                _hover={{
                  bg:  isidentifier || isPassword ? "red.600" : 'blue.600',
                }}
                type='submit'
                loading={loading}
                
                
              >
                Sign in
              </Button>
              
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}