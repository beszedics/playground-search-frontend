import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useId, useState } from 'react';
import axios from '../../api/axios';
import { TiLocationArrowOutline } from 'react-icons/ti';
import { MdFavoriteBorder } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { RatingType } from '../../utils/types';
import Rating from '../Rating/Rating';
import { useTranslation } from 'react-i18next';
import NewRating from '../Modal/NewRating';
import OpeningHours from '../OpeningHours/OpeningHours';
import Equipment from '../Equipment/Equipment';
import Score from '../Rating/Score';
import { SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper';

const PlaygroundDetail = () => {
  const { playgroundId } = useParams();
  const { t } = useTranslation();
  const [showAddNewRatingModal, setShowAddNewRatingModal] = useState(false);

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

  const onNewRatingClick = () => {
    setShowAddNewRatingModal(!showAddNewRatingModal);
  };

  const onFavoriteToggleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event?.preventDefault();
      event.stopPropagation();
      console.log(event);
    },
    [],
  );

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
        {playgroundDetailData && (
          <>
            <Stack direction="row" justifyContent="space-between">
              <Text
                display="flex"
                alignItems="center"
                color="#1B4965"
                fontSize="20px"
                fontWeight={700}
              >
                <Icon
                  as={TiLocationArrowOutline}
                  w={6}
                  h={6}
                  color="teal.500"
                  mr={1}
                />
                {playgroundDetailData.name}
              </Text>
              <>
                <Tooltip
                  label={String(t('tooltip.add_to_favorite'))}
                  aria-label={String(t('tooltip.add_to_favorite'))}
                >
                  <IconButton
                    size="lg"
                    aria-label="favorite"
                    colorScheme="teal"
                    variant="outline"
                    fontSize="25px"
                    icon={<MdFavoriteBorder />}
                    onClick={(e) => onFavoriteToggleClick(e)}
                  />
                </Tooltip>
              </>
            </Stack>
            <Text color="#1B4965" fontSize="16px" fontWeight={400} ml={7}>
              {playgroundDetailData.address}
            </Text>
            <OpeningHours openingHours={playgroundDetailData.openingHours} />
            <HStack my={1} spacing={2}>
              <Score averageScore={playgroundDetailData.averageRating} />
              {playgroundDetailData.totalReviews && (
                <Text>{`${playgroundDetailData.totalReviews} ${t(
                  'playgrounds.reviews',
                )}`}</Text>
              )}
            </HStack>
            {playgroundDetailData?.equipments &&
              Array.isArray(playgroundDetailData.equipments) && (
                <>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    mt={6}
                    mb={2}
                  >
                    <Text color="#1B4965" fontSize="18px" fontWeight={700}>
                      {t('playgrounds.equipments')}
                    </Text>
                    <Button onClick={onNewRatingClick} colorScheme="teal">
                      {t('button.add_equipment')}
                    </Button>
                  </Stack>
                  <Equipment equipments={playgroundDetailData.equipments} />
                </>
              )}
          </>
        )}
      </Box>
      <Box flex="1" p="4">
        <Stack direction="row" justifyContent="space-between">
          <Text
            display="flex"
            alignItems="center"
            color="#1B4965"
            fontSize="20px"
            fontWeight={700}
          >
            {playgroundDetailData?.ratings?.length
              ? t('playgrounds.number_of_ratings', {
                  sumOfComment: playgroundDetailData?.ratings?.length,
                })
              : t('playgrounds.no_rating')}
          </Text>
          <Button onClick={onNewRatingClick} colorScheme="teal" variant="solid">
            {t('button.add_rating')}
          </Button>
        </Stack>
        <Box>
          {playgroundDetailData?.ratings?.map((rating: RatingType) => {
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
      </Box>
      {showAddNewRatingModal && (
        <NewRating
          isOpen
          onClose={onNewRatingClick}
          userId={1}
          playgroundId={playgroundId}
        />
      )}
    </Flex>
  );
};

export default PlaygroundDetail;
