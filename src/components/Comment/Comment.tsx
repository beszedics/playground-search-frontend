import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Avatar from '../Avatar/Avatar';
import Rating from './Rating';

type CommentProps = {
  userName: string;
  playgroundRating: number;
  description: string;
  dateTime: string;
};

const Comment = ({
  userName,
  playgroundRating,
  description,
  dateTime,
}: CommentProps) => {
  return (
    <>
      <Box bg="#e6e6e699" minW="690px" maxW="690px" p={5}>
        <Box display="flex" alignItems="center" mb={4}>
          <>
            <Avatar name="Tamas Beszedics" />
            <Text color="#1B4965" fontSize="20px" fontWeight={700} ml={2}>
              {userName}
            </Text>
            <Text color="#1B4965" fontSize="20px" mr="auto">
              &nbsp;says
            </Text>
            <Rating playgroundRating={playgroundRating} />
          </>
        </Box>
        <Text fontSize="16px">{description}</Text>
        <Text fontSize="16px" fontStyle="italic" mt={4}>
          {dateTime}
        </Text>
      </Box>
    </>
  );
};

export default Comment;
