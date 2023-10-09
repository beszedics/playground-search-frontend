import React from 'react';
import Playground from '../Playground/Playground';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import { Box, CircularProgress, HStack } from '@chakra-ui/react';
import { PlaygroundType } from '../../utils/types';

const Main = () => {
  const playgroundsQuery = useQuery({
    queryKey: ['playgrounds'],
    queryFn: () =>
      axios({ url: '/playgrounds' }).then((response) => response.data),
  });

  const {
    data: playgroundsData,
    error: playgroundsError,
    isLoading: playgroundsIsLoading,
  } = playgroundsQuery;

  if (playgroundsIsLoading) {
    return (
      <CircularProgress
        color="teal.500"
        size={7}
        thickness={10}
        isIndeterminate
      />
    );
  }

  return (
    <Box p={4}>
      <HStack h="100%" spacing={4}>
        {playgroundsData?.map((playground: PlaygroundType) => {
          return (
            <Playground
              id={playground.id}
              key={playground.address}
              name={playground.name}
              address={playground.address}
              latitude={playground.latitude}
              longitude={playground.longitude}
              equipments={playground.equipments}
              averageRating={playground.averageRating}
              totalReviews={playground.totalReviews}
              openingHours={playground.openingHours}
            />
          );
        })}
      </HStack>
    </Box>
  );
};

export default Main;
