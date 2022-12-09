import { Box, Button, FormControl, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { useTranslation } from 'react-i18next';
import EditProfile from '../Modal/EditProfile';

const Profile = () => {
  /* TODO need to get user from userContext */
  const [showEditProfile, setShowEditProfile] = useState(false);

  const { t } = useTranslation();
  const onFormSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('onFormSubmitClick');
  };

  const onEditProfileClick = () => {
    console.log('EditProfile is clicked');
    setShowEditProfile(!showEditProfile);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box mb={6}>
          <Avatar name="Tamas Beszedics" size="xl" />
        </Box>
        <FormControl label="First name" mb={2}>
          <Input
            type="text"
            isReadOnly
            placeholder="Tamas"
            focusBorderColor="teal.600"
          />
        </FormControl>
        <FormControl label="Last name" mb={2}>
          <Input
            type="text"
            isReadOnly
            placeholder="Beszedics"
            focusBorderColor="teal.600"
          />
        </FormControl>
        <FormControl label="Email" mb={2}>
          <Input
            type="email"
            isReadOnly
            placeholder="admin@playgroundsearch.hu"
            focusBorderColor="teal.600"
          />
        </FormControl>
        <FormControl label="Username" mb={2}>
          <Input
            type="text"
            isReadOnly
            placeholder="beszedics"
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
      {showEditProfile && <EditProfile isOpen onClose={onEditProfileClick} />}
    </>
  );
};

export default Profile;
