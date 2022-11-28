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
  Text,
} from '@chakra-ui/react';
import React from 'react';
import Logo from '../Logo/Logo';
import { useTranslation } from 'react-i18next';

type RegistrationProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Registration = ({ isOpen, onClose }: RegistrationProps) => {
  const { t } = useTranslation();

  const onFormSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form is submitted');
    e.preventDefault();

    // TODO form validation, api call
  };
  const onLoginClick = () => {
    console.log('onLoginClicked');

    // TODO navigate to login modal
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus
        isCentered
        id="registration_modal"
      >
        <ModalOverlay data-testid="registration_overlay" />
        <ModalContent>
          <ModalHeader>
            <Logo />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="md" mb={5}>
              {t('registrationModal.headerText')}
            </Heading>
            <form onSubmit={onFormSubmitClick}>
              <FormControl label="First name" isRequired mb={2}>
                <FormLabel>{t('registrationModal.firstName')}</FormLabel>
                <Input type="text" focusBorderColor="teal.600" />
              </FormControl>
              <FormControl label="Last name" isRequired mb={2}>
                <FormLabel>{t('registrationModal.lastName')}</FormLabel>
                <Input type="text" focusBorderColor="teal.600" />
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
              <Button
                type="submit"
                colorScheme="teal"
                variant="solid"
                w="full"
                mt={3}
              >
                {t('registrationModal.registrationBtn')}
              </Button>
            </form>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            <Text>{t('registrationModal.loginText')}</Text>
            <Button
              colorScheme="teal"
              variant="link"
              ml={2}
              onClick={onLoginClick}
            >
              {t('registrationModal.loginBtn')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Registration;
