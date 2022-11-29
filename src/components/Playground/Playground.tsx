import { Box, HStack, Image, Tag, Text } from '@chakra-ui/react';
import React from 'react';
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
  images,
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
          <SwiperSlide>
            <Image
              src="https://www.shutterstock.com/image-photo/colorful-playground-on-yard-park-600w-688397077.jpg"
              objectFit="cover"
              borderRadius={4}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://www.shutterstock.com/image-photo/bayrampasa-istanbul-turkey-02172021-topkapi-600w-1926306755.jpg"
              objectFit="cover"
              borderRadius={4}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://www.shutterstock.com/image-photo/lodzpoland-november-082020-leisure-recreation-600w-1849867888.jpg"
              objectFit="cover"
              borderRadius={4}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="https://www.shutterstock.com/image-photo/colorful-children-playground-activities-public-600w-480258316.jpg"
              objectFit="cover"
              borderRadius={4}
            />
          </SwiperSlide>
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
