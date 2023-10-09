import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Avatar from '../Avatar/Avatar';
import Score from './Score';
import { UserType } from '../../utils/types';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

type RatingProps = {
  user: UserType;
  score: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

const Rating = ({
  user,
  score,
  comment,
  createdAt,
  updatedAt,
}: RatingProps) => {
  const { t } = useTranslation();

  const formattedCreatedAt = format(new Date(createdAt), 'yyyy.MM.dd HH:mm');

  return (
    <>
      <Box bg="#e6e6e699" minW="690px" maxW="690px" p={5} my={2}>
        <Box display="flex" alignItems="center" mb={4}>
          <>
            <Avatar name={user.firstName + ' ' + user.lastName} />
            <Text color="#1B4965" fontSize="20px" fontWeight={700} ml={2}>
              {user.firstName} {user.lastName}
            </Text>
            <Text color="#1B4965" fontSize="20px" mr="auto">
              &nbsp;{t('ratings.says')}
            </Text>
            <Score averageScore={score} />
          </>
        </Box>
        <Text fontSize="16px">{comment}</Text>
        <Text fontSize="16px" fontStyle="italic" mt={4}>
          {formattedCreatedAt}
        </Text>
      </Box>
    </>
  );
};

export default Rating;
