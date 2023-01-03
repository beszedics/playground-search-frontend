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
  useToast,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import Logo from '../Logo/Logo';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { UserContext } from '../../context/UserContext';

type RegistrationProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegistrationValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Firstname is required!'),
  lastName: Yup.string().required('Lastname is required!'),
  email: Yup.string().email().required('Email is required!'),
  username: Yup.string().required('Username is required!'),
  password: Yup.string().required('Password is required!'),
});

const Registration = ({ isOpen, onClose }: RegistrationProps) => {
  const { setUser } = useContext(UserContext);
  const { t } = useTranslation();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    },
    validationSchema: RegistrationValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
      };
      axios({
        url: '/auth/registration',
        method: 'POST',
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
              id: res.data.user.id,
              firstName: res.data.user.firstName,
              lastName: res.data.user.lastName,
              email: res.data.user.email,
              username: res.data.user.username,
              status: true,
            });
            toast({
              title: t('registrationModal.successfulRegistration'),
              description: t('loginModal.welcome'),
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
            title: t('registrationModal.failedRegistration'),
            description: error.response.data.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top',
          });
        });
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                label="First name"
                mb={2}
                isInvalid={
                  !!formik.errors.firstName && formik.touched.firstName
                }
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
                <Input
                  id="password"
                  type="password"
                  focusBorderColor="teal.600"
                  {...formik.getFieldProps('password')}
                />
                {formik.errors.password && formik.touched.password ? (
                  <Text color="red.500" mt={1}>
                    {formik.errors.password}
                  </Text>
                ) : null}
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
