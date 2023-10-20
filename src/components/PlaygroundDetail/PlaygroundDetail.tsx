import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Flex, Text } from '@chakra-ui/react';
import Playground from '../Playground/Playground';
import { RatingType } from '../../utils/types';
import Rating from '../Rating/Rating';
import { useTranslation } from 'react-i18next';

const PlaygroundDetail = () => {
  const { playgroundId } = useParams();
  const { t } = useTranslation();

  const playgroundDetailQuery = useQuery({
    queryKey: ['playgrounds'],
    queryFn: () =>
      axios({ url: `/playgrounds/${playgroundId}` }).then(
        (response) => response.data,
      ),
  });

  const {
    data: playgroundDetailData,
    error: playgroundDetailError,
    isLoading: playgroundDetailIsLoading,
  } = playgroundDetailQuery;

  return (
    <Flex>
      {playgroundDetailIsLoading && (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100vh"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          background="rgba(255, 255, 255, 0.7)"
          zIndex="999"
        >
          <CircularProgress
            color="teal.500"
            size={12}
            thickness={10}
            isIndeterminate
          />
        </Flex>
      )}
      <Box flex="1" p="4">
        <Playground
          id={playgroundDetailData.id}
          name={playgroundDetailData.name}
          address={playgroundDetailData.address}
          latitude={playgroundDetailData.latitude}
          longitude={playgroundDetailData.longitude}
          openingHours={playgroundDetailData.openingHours}
          isPublished={playgroundDetailData.isPublished}
          ratings={playgroundDetailData.ratings}
          equipments={playgroundDetailData.equipments}
          averageRating={playgroundDetailData.averageRating}
          totalReviews={playgroundDetailData.totalReviews}
        />
      </Box>
      <Box flex="1" p="4">
        <Text
          display="flex"
          alignItems="center"
          color="#1B4965"
          fontSize="20px"
          fontWeight={700}
        >
          {playgroundDetailData.ratings?.length
            ? t('playgrounds.number_of_ratings', {
                sumOfComment: playgroundDetailData.ratings?.length,
              })
            : t('playgrounds.no_ratings')}
        </Text>
        {playgroundDetailData.ratings?.map((rating: RatingType) => {
          return (
            <Rating
              key={rating.comment}
              user={rating.user}
              score={rating.score}
              comment={rating.comment}
              createdAt={rating.createdAt}
              updatedAt={rating.updatedAt}
            />
          );
        })}
      </Box>
    </Flex>
  );
};

export default PlaygroundDetail;
