import {
  Box,
  CircularProgress,
  HStack,
  Image,
  Tag,
  Text,
} from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import Rating from '../Comment/Rating';
import { Icon } from '@chakra-ui/react';
import { TiLocationArrowOutline } from 'react-icons/ti';
import { MdAccessTime } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Playground.css';
import useQuery from '../../hooks/useQuery';
import { useTranslation } from 'react-i18next';

const URL = '/images';

const ErrorText = ({ children, ...props }: PropsWithChildren) => (
  <Text fontSize="lg" color="red.300" {...props}>
    {children}
  </Text>
);

type PlaygroundProps = {
  name: string;
  address: string;
  rating: number;
  openingHours: string;
  images?: string[];
  hasSwing?: boolean;
  hasSlide?: boolean;
  hasCarousel?: boolean;
  hasSandbox?: boolean;
  hasBalancingBridge?: boolean;
  hasTeeter?: boolean;
  hasRopePyramid?: boolean;
  hasSquirrelWheel?: boolean;
  hasHanging?: boolean;
  hasObstacleCourse?: boolean;
  hasRestHouse?: boolean;
};

const Playground = ({
  name,
  address,
  rating,
  openingHours,
  hasSwing,
  hasSlide,
  hasCarousel,
  hasSandbox,
  hasBalancingBridge,
  hasTeeter,
  hasRopePyramid,
  hasSquirrelWheel,
  hasHanging,
  hasObstacleCourse,
  hasRestHouse,
}: PlaygroundProps) => {
  const {
    data: imageUrls = [],
    isLoading: imagesLoading,
    error: fetchError,
  } = useQuery({ url: URL });

  const { t } = useTranslation();

  return (
    <Box p={4}>
      <Box>
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
        <Text color="#1B4965" fontSize="16px" fontWeight={400} ml={7}>
          {address}
        </Text>
        <Box ml={7} my={1}>
          <Rating playgroundRating={rating} />
        </Box>
      </Box>
      <Box display="flex" alignItems="center" my={3}>
        <Icon as={MdAccessTime} w={6} h={6} color="teal.500" mr={1} />
        <Text color="#1B4965" fontSize="16px" fontWeight={400}>
          {openingHours}
        </Text>
      </Box>
      {imagesLoading && (
        <CircularProgress
          color="teal.500"
          size={7}
          thickness={10}
          isIndeterminate
        />
      )}
      {fetchError && (
        <ErrorText>{t('playgrounds.failed_to_load_images')}</ErrorText>
      )}
      {!fetchError && imageUrls?.length === 0 && (
        <Text textAlign="left" fontSize="lg" color="gray.500">
          {t('playgrounds.no_images_found')}
        </Text>
      )}
      <Box maxW="600px">
        <Swiper
          slidesPerView={1}
          modules={[Autoplay, Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {imageUrls?.map((url) => (
            <SwiperSlide key={url}>
              <Image key={url} src={url} objectFit="cover" borderRadius={4} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <HStack spacing={2}>
        {hasSandbox && <Tag fontWeight={700}>SANDBOX</Tag>}
        {hasSwing && <Tag fontWeight={700}>SWING</Tag>}
        {hasTeeter && <Tag fontWeight={700}>TEETER</Tag>}
        {hasBalancingBridge && <Tag fontWeight={700}>BALANCING BRIDGE</Tag>}
      </HStack>
    </Box>
  );
};

export default Playground;
