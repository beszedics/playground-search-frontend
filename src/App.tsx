import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Header from './components/Header/Header';
import Comment from './components/Comment/Comment';
import Playground from './components/Playground/Playground';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <Comment
      userName="Tamas Beszedics"
      playgroundRating={5}
      description="This playground is full of well-equipped equipment that’s why I give it five stars. We are looking forward to come back later."
      dateTime="Nov 28., 2022 at 23:18"
    />
    <Playground
      name="Rimini Játszótér"
      address="Budapest, Mária tér 6, 1011"
      rating={2}
      openingHours="7:00 - 22:00"
      hasSandbox
      hasSwing
      hasTeeter
      hasBalancingBridge
      hasRopePyramid
      hasSquirrelWheel
      hasHanging
      hasObstacleCourse
      hasRestHouse
      hasCarousel
      hasSlide
    />
  </ChakraProvider>
);
