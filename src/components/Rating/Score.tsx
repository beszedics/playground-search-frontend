import { StarIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

type ScoreProps = {
  averageScore: number;
};

const Score = ({ averageScore }: ScoreProps) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" alignItems="center">
      {averageScore > 0 ? (
        Array(5)
          .fill('')
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < averageScore ? 'teal.500' : 'gray.300'}
            />
          ))
      ) : (
        <Text color="#1B4965" fontSize="16px">
          {t('ratings.no_rating')}
        </Text>
      )}
    </Box>
  );
};

export default Score;
