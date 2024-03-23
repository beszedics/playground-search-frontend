import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Icon } from '@chakra-ui/react';
import { TiLocationArrowOutline } from 'react-icons/ti';
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
import { PlaygroundType } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import Equipment from '../Equipment/Equipment';
import Score from '../Rating/Score';
import OpeningHours from '../OpeningHours/OpeningHours';

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

  const handleSocialIconClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Box
      id={String(id)}
      maxW={350}
      minW={250}
      maxH={600}
      cursor="pointer"
      borderWidth="1px"
      borderRadius={4}
      boxShadow="md"
      onClick={() => navigate(`playgrounds/${id}`)}
    >
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
        <OpeningHours openingHours={openingHours} />
      </Box>
      {equipments && (
        <Box px={4} py={1}>
          <Equipment equipments={equipments} />
        </Box>
      )}
    </Box>
  );
};

export default Playground;
