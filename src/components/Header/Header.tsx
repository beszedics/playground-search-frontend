import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { SearchIcon } from '@chakra-ui/icons';
import Logo from '../Logo/Logo';

const Header = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const handleSignUpClick = () => console.log('Sign up is clicked');
  const handleLoginClick = () => console.log('Login is clicked');

  return (
    <HStack
      bg="white"
      w="100%"
      minH="80px"
      p={4}
      color="black"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="sm"
      wrap="wrap"
    >
      <Box minW="200px">
        <Logo />
      </Box>
      <Box w="510px">
        <InputGroup>
          <Input
            type="text"
            placeholder="Search playground..."
            focusBorderColor="teal.600"
          />
          <InputRightElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<SearchIcon color="#9A9A9A" />}
          />
        </InputGroup>
      </Box>
      {isUserLoggedIn ? (
        <Box>
          <Avatar name="Test User" bg="teal.400" />
        </Box>
      ) : (
        <Stack spacing={4} direction="row" align="center">
          <Button colorScheme="teal" onClick={handleSignUpClick}>
            Sign up
          </Button>
          <Button colorScheme="teal" onClick={handleLoginClick}>
            Login
          </Button>
        </Stack>
      )}
    </HStack>
  );
};

export default Header;
