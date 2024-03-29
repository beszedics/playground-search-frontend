import React, { useState } from 'react';
import Playground from '../Playground/Playground';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { PlaygroundType } from '../../utils/types';
import { useTranslation } from 'react-i18next';
import NewPlayground from '../Modal/NewPlayground';
import { useUser } from '../../context/UserContext';
import { useSearch } from '../../context/SearchContext';
import Map from '../Map/Map';

const Main = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { user } = useUser();
  const { searchItem } = useSearch();
  const [showAddNewPlaygroundModal, setShowAddNewPlaygroundModal] =
    useState(false);

  const playgroundsQuery = useQuery({
    queryKey: ['playgrounds'],
    queryFn: () =>
      axios({ url: '/playgrounds' }).then((response) => response.data),
  });

  const {
    data: playgroundsData,
    error: playgroundsError,
    isLoading: playgroundsIsLoading,
  } = playgroundsQuery;

  const onAddNewPlaygroundClick = () => {
    if (!user) {
      toast({
        title: t('add_new_playground_modal.errors.login_to_add_new_playground'),
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    setShowAddNewPlaygroundModal(!showAddNewPlaygroundModal);
  };

  const isPublishedPlaygrounds = Array.isArray(playgroundsData)
    ? playgroundsData.filter(
        (playground: PlaygroundType) => playground.isPublished,
      )
    : [];

  const filteredPlaygrounds = Array.isArray(isPublishedPlaygrounds)
    ? isPublishedPlaygrounds.filter((playground: PlaygroundType) => {
        const { name, address } = playground;
        const searchValue = searchItem.toLowerCase();
        return (
          name.toLowerCase().includes(searchValue) ||
          address.toLowerCase().includes(searchValue)
        );
      })
    : [];

  const availablePlaygrounds = filteredPlaygrounds?.length;

  return (
    <SimpleGrid columns={[1, null, 2]}>
      <Box p={4} overflowY="auto">
        {playgroundsIsLoading && (
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

        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Text
            display="flex"
            alignItems="center"
            color="#1B4965"
            fontSize="20px"
            fontWeight={700}
          >
            {availablePlaygrounds > 0
              ? t('playgrounds.number_of_available_playgrounds', {
                  sumOfAvailablePlaygrounds: availablePlaygrounds,
                })
              : t('playgrounds.no_playgrounds')}
          </Text>
          <Button
            onClick={onAddNewPlaygroundClick}
            colorScheme="teal"
            variant="solid"
          >
            {t('button.add_playground')}
          </Button>
        </Stack>
        <SimpleGrid columns={2} spacing={4}>
          {filteredPlaygrounds && Array.isArray(filteredPlaygrounds) ? (
            filteredPlaygrounds?.map((playground: PlaygroundType) => (
              <Playground
                id={playground.id}
                key={playground.address}
                name={playground.name}
                address={playground.address}
                latitude={playground.latitude}
                longitude={playground.longitude}
                equipments={playground.equipments}
                averageRating={playground.averageRating}
                totalReviews={playground.totalReviews}
                openingHours={playground.openingHours}
                isPublished={playground.isPublished}
              />
            ))
          ) : (
            <Text>{t('playgrounds.no_playgrounds')}</Text>
          )}
        </SimpleGrid>
      </Box>
      {playgroundsData && playgroundsData.length > 0 && (
        <Box p="4">
          <Map playgrounds={isPublishedPlaygrounds} />
        </Box>
      )}
      {showAddNewPlaygroundModal && (
        <NewPlayground isOpen onClose={onAddNewPlaygroundClick} />
      )}
    </SimpleGrid>
  );
};

export default Main;
