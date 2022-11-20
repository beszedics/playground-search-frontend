import {
  Button,
  FormControl,
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

type RegistrationProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Registration = ({ isOpen, onClose }: RegistrationProps) => {
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
              Create your account
            </Heading>
            <form onSubmit={onFormSubmitClick}>
              <FormControl label="First name" isRequired mb={2}>
                <Input
                  type="text"
                  placeholder="First name"
                  focusBorderColor="teal.600"
                />
              </FormControl>
              <FormControl label="Last name" isRequired mb={2}>
                <Input
                  type="text"
                  placeholder="Last name"
                  focusBorderColor="teal.600"
                />
              </FormControl>
              <FormControl label="Email" isRequired mb={2}>
                <Input
                  type="email"
                  placeholder="Email"
                  focusBorderColor="teal.600"
                />
              </FormControl>
              <FormControl label="Username" isRequired mb={2}>
                <Input
                  type="text"
                  placeholder="Username"
                  focusBorderColor="teal.600"
                />
              </FormControl>
              <FormControl label="Password" isRequired mb={2}>
                <Input
                  type="password"
                  placeholder="********"
                  focusBorderColor="teal.600"
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                variant="solid"
                w="full"
                mt={3}
              >
                Sign up
              </Button>
            </form>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            <Text>Already have an account?</Text>
            <Button
              colorScheme="teal"
              variant="link"
              ml={2}
              onClick={onLoginClick}
            >
              Log in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Registration;
