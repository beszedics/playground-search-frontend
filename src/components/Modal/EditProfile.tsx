import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import Logo from '../Logo/Logo';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/UserContext';
import axios from '../../api/axios';

type EditProfileProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EditProfile = ({ isOpen, onClose }: EditProfileProps) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useContext(UserContext);

  const id = user?.id;
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.username);
  const [password, setPassword] = useState('');

  const onFormSubmitClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = { firstName, lastName, email, username, password };
    console.log(data);
    axios.put(`/auth/users/${id}`, data);
    onClose();
    console.log('lefutottam');
  };

  const onShowPasswordClick = () => {
    setShowPassword(!showPassword);
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
                value={firstName}
                focusBorderColor="teal.600"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </FormControl>
            <FormControl label="Last name" isRequired mb={2}>
              <FormLabel>{t('registrationModal.lastName')}</FormLabel>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                focusBorderColor="teal.600"
                onChange={(event) => setLastName(event.target.value)}
              />
            </FormControl>
            <FormControl label="Email" isRequired mb={2}>
              <FormLabel>{t('registrationModal.email')}</FormLabel>
              <Input
                type="email"
                id="email"
                value={email}
                focusBorderColor="teal.600"
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
            <FormControl label="Username" isRequired mb={2}>
              <FormLabel>{t('registrationModal.username')}</FormLabel>
              <Input
                type="text"
                id="username"
                value={username}
                focusBorderColor="teal.600"
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormControl>
            <FormControl label="Password" isRequired mb={2}>
              <FormLabel>{t('registrationModal.password')}</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  focusBorderColor="teal.600"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    color="teal.600"
                    h="1.75rem"
                    size="sm"
                    onClick={onShowPasswordClick}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
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
