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
import Registration from '../Registration/Registration';

const Header = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const onSignUpClick = () => {
    console.log('Sign up is clicked');
    setShowRegistrationModal(!showRegistrationModal);
  };

  const handleLoginClick = () => console.log('Login is clicked');

  return (
    <>
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
            <Button colorScheme="teal" onClick={onSignUpClick}>
              Sign up
            </Button>
            <Button colorScheme="teal" onClick={handleLoginClick}>
              Login
            </Button>
          </Stack>
        )}
      </HStack>
      {showRegistrationModal && <Registration isOpen onClose={onSignUpClick} />}
    </>
  );
};

export default Header;
