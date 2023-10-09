import React from 'react';
import { EquipmentType } from '../../utils/types';
import { Box, HStack, Tag } from '@chakra-ui/react';

const Equipment = ({ equipments }: { equipments: EquipmentType[] }) => {
  return (
    <Box px={4}>
      <HStack spacing={2}>
        {equipments?.map(({ equipment }) => (
          <Tag key={equipment.id} fontWeight={700} textTransform="uppercase">
            {equipment.name}
          </Tag>
        ))}
      </HStack>
    </Box>
  );
};

export default Equipment;
