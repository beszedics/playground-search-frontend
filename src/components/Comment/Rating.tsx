import { StarIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';

type RatingProps = {
  playgroundRating: number;
};

const Rating = ({ playgroundRating }: RatingProps) => {
  return (
    <Box display="flex" alignItems="center">
      {playgroundRating > 0 ? (
        Array(5)
          .fill('')
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < playgroundRating ? 'teal.500' : 'gray.300'}
            />
          ))
      ) : (
        <Text color="#1B4965" fontSize="16px">
          No rating
        </Text>
      )}
    </Box>
  );
};

export default Rating;
