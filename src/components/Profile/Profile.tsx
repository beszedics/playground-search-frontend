import {
  Box,
  Button,
  FormControl,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { useTranslation } from 'react-i18next';
import EditProfile from '../Modal/EditProfile';
import { useUser } from '../../context/UserContext';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import Playground from '../Playground/Playground';
import { PlaygroundWrapper } from '../../utils/types';

const Profile = () => {
  const { user } = useUser();
  const [showEditProfile, setShowEditProfile] = useState(false);

  const { t } = useTranslation();

  const userQuery = useQuery({
    queryKey: ['userData'],
    queryFn: () =>
      axios({ url: `/users/${user?.id}` }).then((response) => response.data),
  });

  const onEditProfileClick = () => {
    setShowEditProfile(!showEditProfile);
  };

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = userQuery;

  return (
    <SimpleGrid columns={[1, null, 2]} p={4}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxW="700px"
      >
        <Box mb={6}>
          <Avatar name={`${user?.firstName} ${user?.lastName}`} size="xl" />
        </Box>
        <FormControl label="First name" mb={2}>
          <Input
            type="text"
            isReadOnly
            placeholder={user?.firstName}
            focusBorderColor="teal.600"
          />
        </FormControl>
        <FormControl label="Last name" mb={2}>
          <Input
            type="text"
            isReadOnly
            placeholder={user?.lastName}
            focusBorderColor="teal.600"
          />
        </FormControl>
        <FormControl label="Email" mb={2}>
          <Input
            type="email"
            isReadOnly
            placeholder={user?.email}
            focusBorderColor="teal.600"
          />
        </FormControl>
        <FormControl label="Username" mb={2}>
          <Input
            type="text"
            isReadOnly
            placeholder={user?.username}
            focusBorderColor="teal.600"
          />
        </FormControl>
        <FormControl label="Password" mb={2}>
          <Input
            type="password"
            isReadOnly
            placeholder="**********"
            focusBorderColor="teal.600"
          />
        </FormControl>
        <Button
          onClick={onEditProfileClick}
          type="button"
          colorScheme="teal"
          variant="solid"
          w="full"
          mt={3}
        >
          {t('profile.editProfile')}
        </Button>
      </Box>
      <Box>
        {userData && userData.playgrounds.length ? (
          userData.playgrounds.map((playground: PlaygroundWrapper) => (
            <Playground
              key={playground.playground.id}
              id={playground.playground.id}
              name={playground.playground.name}
              address={playground.playground.address}
              longitude={playground.playground.longitude}
              latitude={playground.playground.latitude}
              openingHours={playground.playground.openingHours}
              isPublished={playground.playground.isPublished}
              equipments={playground.playground.equipments}
              averageRating={playground.playground.averageRating}
            />
          ))
        ) : (
          <Text
            display="flex"
            alignItems="center"
            color="#1B4965"
            fontSize="20px"
            fontWeight={700}
          >
            {t('profile.noFavorite')}
          </Text>
        )}
      </Box>
      {showEditProfile && <EditProfile isOpen onClose={onEditProfileClick} />}
    </SimpleGrid>
  );
};

export default Profile;
