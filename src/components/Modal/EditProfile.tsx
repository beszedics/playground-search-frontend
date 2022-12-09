import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import Logo from '../Logo/Logo';
import { useTranslation } from 'react-i18next';

type EditProfileProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EditProfile = ({ isOpen, onClose }: EditProfileProps) => {
  const { t } = useTranslation();

  const onFormSubmitClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus
      isCentered
      id="edit_profile_modal"
    >
      <form onSubmit={onFormSubmitClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Logo />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="md" mb={5}>
              {t('profile.editProfile')}
            </Heading>
            <FormControl label="First name" isRequired mb={2}>
              <FormLabel>{t('registrationModal.firstName')}</FormLabel>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                focusBorderColor="teal.600"
              />
            </FormControl>
            <FormControl label="Last name" isRequired mb={2}>
              <FormLabel>{t('registrationModal.lastName')}</FormLabel>
              <Input type="text" name="lastName" focusBorderColor="teal.600" />
            </FormControl>
            <FormControl label="Email" isRequired mb={2}>
              <FormLabel>{t('registrationModal.email')}</FormLabel>
              <Input type="email" focusBorderColor="teal.600" />
            </FormControl>
            <FormControl label="Username" isRequired mb={2}>
              <FormLabel>{t('registrationModal.username')}</FormLabel>
              <Input type="text" focusBorderColor="teal.600" />
            </FormControl>
            <FormControl label="Password" isRequired mb={2}>
              <FormLabel>{t('registrationModal.password')}</FormLabel>
              <Input type="password" focusBorderColor="teal.600" />
            </FormControl>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              onClick={onClose}
              colorScheme="teal"
              variant="outline"
              w="full"
              mt={3}
            >
              {t('profile.cancelBtn')}
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              variant="solid"
              w="full"
              mt={3}
            >
              {t('profile.saveBtn')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default EditProfile;
