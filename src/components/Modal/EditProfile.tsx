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
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import Logo from '../Logo/Logo';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/UserContext';
import axios from '../../api/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type EditProfileProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EditProfileValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Firstname is required!'),
  lastName: Yup.string().required('Lastname is required!'),
  email: Yup.string().email().required('Email is required!'),
  username: Yup.string().required('Username is required!'),
  password: Yup.string().required('Password is required!'),
});

const EditProfile = ({ isOpen, onClose }: EditProfileProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      username: user?.username,
      password: user?.password,
    },
    validationSchema: EditProfileValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const data = {
        id: user?.id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
      };
      axios({
        url: `/users/${user?.id}`,
        method: 'PUT',
        data: data,
      })
        .then((res) => {
          if (res.data.error) {
            toast({
              title: t('registrationModal.failedRegistration'),
              description: res.data.error,
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top',
            });
          } else {
            localStorage.setItem('token', res.data.token);
            setUser?.({
              firstName: res.data.updatedUser[1][0].firstName,
              lastName: res.data.updatedUser[1][0].lastName,
              email: res.data.updatedUser[1][0].email,
              username: res.data.updatedUser[1][0].username,
              status: true,
            });
            toast({
              title: t('editProfile.successfulEditProfile'),
              status: 'success',
              duration: 9000,
              isClosable: true,
              position: 'top',
            });
            onClose();
          }
        })
        .catch((error) => {
          toast({
            title: t('editProfile.failedEditProfile'),
            description: error.response.data.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top',
          });
        });
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
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
            <FormControl
              label="First name"
              mb={2}
              isInvalid={!!formik.errors.firstName && formik.touched.firstName}
            >
              <FormLabel htmlFor="firstName">
                {t('registrationModal.firstName')}
              </FormLabel>
              <Input
                id="firstName"
                type="text"
                focusBorderColor="teal.600"
                {...formik.getFieldProps('firstName')}
              />
              {formik.errors.firstName && formik.touched.firstName ? (
                <Text color="red.500" mt={1}>
                  {formik.errors.firstName}
                </Text>
              ) : null}
            </FormControl>
            <FormControl
              label="Last name"
              mb={2}
              isInvalid={!!formik.errors.lastName && formik.touched.lastName}
            >
              <FormLabel htmlFor="lastName">
                {t('registrationModal.lastName')}
              </FormLabel>
              <Input
                id="lastName"
                type="text"
                focusBorderColor="teal.600"
                {...formik.getFieldProps('lastName')}
              />
              {formik.errors.lastName && formik.touched.lastName ? (
                <Text color="red.500" mt={1}>
                  {formik.errors.lastName}
                </Text>
              ) : null}
            </FormControl>
            <FormControl
              label="Email"
              mb={2}
              isInvalid={!!formik.errors.email && formik.touched.email}
            >
              <FormLabel htmlFor="email">
                {t('registrationModal.email')}
              </FormLabel>
              <Input
                id="email"
                type="email"
                focusBorderColor="teal.600"
                {...formik.getFieldProps('email')}
              />
              {formik.errors.email && formik.touched.email ? (
                <Text color="red.500" mt={1}>
                  {formik.errors.email}
                </Text>
              ) : null}
            </FormControl>
            <FormControl
              label="Username"
              mb={2}
              isInvalid={!!formik.errors.username && formik.touched.username}
            >
              <FormLabel htmlFor="username">
                {t('registrationModal.username')}
              </FormLabel>
              <Input
                id="username"
                type="text"
                focusBorderColor="teal.600"
                {...formik.getFieldProps('username')}
              />
              {formik.errors.username && formik.touched.username ? (
                <Text color="red.500" mt={1}>
                  {formik.errors.username}
                </Text>
              ) : null}
            </FormControl>
            <FormControl
              label="Password"
              mb={2}
              isInvalid={!!formik.errors.password && formik.touched.password}
            >
              <FormLabel htmlFor="password">
                {t('registrationModal.password')}
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  focusBorderColor="teal.600"
                  pr="4.5rem"
                  {...formik.getFieldProps('password')}
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
              {formik.errors.password && formik.touched.password ? (
                <Text color="red.500" mt={1}>
                  {formik.errors.password}
                </Text>
              ) : null}
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
