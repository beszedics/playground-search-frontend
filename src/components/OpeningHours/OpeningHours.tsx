import React from 'react';
import { Box, Icon, Text } from '@chakra-ui/react';
import { MdAccessTime } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

type OpeningHoursProps = {
  openingHours: string;
};

const OpeningHours = ({ openingHours }: OpeningHoursProps) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" alignItems="center" my={3}>
      <Icon as={MdAccessTime} w={6} h={6} color="teal.500" mr={1} />
      <Text color="#1B4965" fontSize="16px" fontWeight={400}>
        {openingHours !== null && openingHours !== ''
          ? openingHours
          : t('playgrounds.no_opening_hours')}
      </Text>
    </Box>
  );
};

export default OpeningHours;
