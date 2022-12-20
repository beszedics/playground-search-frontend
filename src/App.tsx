import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Comment from './components/Comment/Comment';
import Header from './components/Header/Header';
import { UserProvider } from './context/UserContext';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Header />
        <Comment
          userName="Tamas Beszedics"
          playgroundRating={5}
          description="This playground is full of well-equipped equipment that’s why I give it five stars. We are looking forward to come back later."
          dateTime="Nov 28., 2022 at 23:18"
        />
      </UserProvider>
    </ChakraProvider>
  );
};
