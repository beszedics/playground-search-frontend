import {
  Box,
  CircularProgress,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Icon } from '@chakra-ui/react';
import { TiLocationArrowOutline } from 'react-icons/ti';
import { MdAccessTime, MdFavoriteBorder } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Playground.css';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import { PlaygroundType } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import Equipment from '../Equipment/Equipment';
import Score from '../Rating/Score';

const PLAYGROUND_SEARCH_WEB_URI =
  process.env.REACT_APP_PLAYGROUND_SEARCH_WEB_URI;

const Playground = ({
  id,
  name,
  address,
  longitude,
  latitude,
  equipments,
  openingHours,
  averageRating,
  totalReviews,
}: PlaygroundType) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFavoriteToggleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event?.preventDefault();
      event.stopPropagation();
      console.log('onFavorite');
    },
    [],
  );

  const handleSocialIconClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const imagesQuery = useQuery({
    queryKey: ['images'],
    queryFn: () => axios({ url: '/images' }).then((response) => response.data),
  });

  const {
    data: imagesData,
    error: imagesError,
    isLoading: imagesIsLoading,
  } = imagesQuery;

  if (imagesIsLoading) {
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
    <Box
      id={String(id)}
      maxW={350}
      minH={500}
      maxH={600}
      cursor="pointer"
      borderWidth="1px"
      borderRadius={4}
      boxShadow="md"
      onClick={() => navigate(`playgrounds/${id}`)}
    >
      <Box>
        <Swiper
          slidesPerView={1}
          modules={[Autoplay, Navigation, Pagination]}
          pagination={{ clickable: true }}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {imagesData?.imageUrls.map((imageUrl: string) => {
            return (
              <SwiperSlide key={imageUrl} className="image-container">
                <Image src={imageUrl} objectFit="cover" borderRadius={4} />
                <IconButton
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  position="absolute"
                  top={2}
                  right={2}
                  variant="unstyled"
                  aria-label="favorite"
                  icon={<MdFavoriteBorder />}
                  className="favorite__icon"
                  onClick={(e) => onFavoriteToggleClick(e)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
      <Box p={4}>
        <Box>
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
              {name}
            </Text>
            <Stack direction="row">
              <FacebookShareButton
                url={String(PLAYGROUND_SEARCH_WEB_URI)}
                onClick={handleSocialIconClick}
              >
                <FacebookIcon size={24} round />
              </FacebookShareButton>
              <WhatsappShareButton
                url={String(PLAYGROUND_SEARCH_WEB_URI)}
                onClick={handleSocialIconClick}
              >
                <WhatsappIcon size={24} round />
              </WhatsappShareButton>
            </Stack>
          </Stack>
          <Text color="#1B4965" fontSize="16px" fontWeight={400} ml={7}>
            {address}
          </Text>
          <HStack ml={7} my={1} spacing={2}>
            <Score averageScore={averageRating} />
            {totalReviews && (
              <Text>{`${totalReviews} ${t('playgrounds.reviews')}`}</Text>
            )}
          </HStack>
        </Box>
        <Box display="flex" alignItems="center" my={3}>
          <Icon as={MdAccessTime} w={6} h={6} color="teal.500" mr={1} />
          <Text color="#1B4965" fontSize="16px" fontWeight={400}>
            {openingHours !== null
              ? openingHours
              : t('playgrounds.no_opening_hours')}
          </Text>
        </Box>
      </Box>
      {equipments && <Equipment equipments={equipments} />}
    </Box>
  );
};

export default Playground;
