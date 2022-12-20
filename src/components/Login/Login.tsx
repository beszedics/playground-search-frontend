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
import { useFormik } from 'formik';
import * as Yup from 'yup';

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required!'),
  password: Yup.string().required('Password is required!'),
});

const Login = ({ isOpen, onClose }: LoginProps) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));

      // TODO api call and navigate based on response

      actions.resetForm();
    },
  });

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
