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

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Login = ({ isOpen, onClose }: LoginProps) => {
  const { t } = useTranslation();

  const onFormSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form is submitted');
    e.preventDefault();

    // TODO form validation, api call
  };

  const onSignUpClick = () => {
    console.log('onSignUpClicked');

    // TODO navigate to registration modal
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus
        isCentered
        id="login_modal"
      >
        <ModalOverlay data-testid="login_overlay" />
        <ModalContent>
          <ModalHeader>
            <Logo />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="md" mb={5}>
              {t('loginModal.headerText')}
            </Heading>
            <form onSubmit={onFormSubmitClick}>
              <FormControl label="Username" isRequired mb={2}>
                <FormLabel>{t('loginModal.username')}</FormLabel>
                <Input type="text" focusBorderColor="teal.600" />
              </FormControl>
              <FormControl label="Password" isRequired mb={2}>
                <FormLabel>{t('loginModal.password')}</FormLabel>
                <Input type="password" focusBorderColor="teal.600" />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                variant="solid"
                w="full"
                mt={3}
              >
                {t('loginModal.loginBtn')}
              </Button>
            </form>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            <Text>{t('loginModal.registrationText')}</Text>
            <Button
              colorScheme="teal"
              variant="link"
              ml={2}
              onClick={onSignUpClick}
            >
              {t('loginModal.registrationBtn')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;