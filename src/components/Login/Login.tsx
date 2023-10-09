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
import React, { Dispatch, SetStateAction, useContext } from 'react';
import Logo from '../Logo/Logo';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { UserContext } from '../../context/UserContext';

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
  setShowRegistrationModal: Dispatch<SetStateAction<boolean>>;
  setShowLoginModal: Dispatch<SetStateAction<boolean>>;
};

const LoginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required!'),
  password: Yup.string().required('Password is required!'),
});

const Login = ({
  isOpen,
  onClose,
  setShowRegistrationModal,
  setShowLoginModal,
}: LoginProps) => {
  const { setUser } = useContext(UserContext);
  const { t } = useTranslation();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const data = {
        username: values.username,
        password: values.password,
      };
      axios({
        url: '/auth/login',
        method: 'POST',
        data: data,
      })
        .then((res) => {
          if (res.data.error) {
            toast({
              title: t('loginModal.failedLogin'),
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
              title: t('loginModal.successfulLogin'),
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
            title: t('loginModal.failedLogin'),
            description: error.response.data.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top',
          });
        });
    },
  });

  const onSignUpClick = () => {
    setShowLoginModal(false);
    setShowRegistrationModal(true);
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
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                label="Username"
                mb={2}
                isInvalid={!!formik.errors.username && formik.touched.username}
              >
                <FormLabel htmlFor="username">
                  {t('loginModal.username')}
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
                  {t('loginModal.password')}
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
