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
import React, { useEffect } from 'react';
import Logo from '../Logo/Logo';
import { useTranslation } from 'react-i18next';
import axios from '../../api/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUserLocation } from '../../context/UserLocation';

type NewPlaygroundProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNewPlaygroundValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    name: Yup.string().required(
      t('add_new_playground_modal.errors.name') || 'Name is required',
    ),
    address: Yup.string().required(
      t('add_new_playground_modal.errors.address') || 'Address is required',
    ),
    latitude: Yup.number().required(
      t('add_new_playground_modal.errors.latitude') || 'Latitude is required!',
    ),
    longitude: Yup.number().required(
      t('add_new_playground_modal.errors.longitude') ||
        'Longitude is required!',
    ),
    openingHours: Yup.string(),
  });
};

const NewPlayground = ({ isOpen, onClose }: NewPlaygroundProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { latitude, longitude } = useUserLocation();

  useEffect(() => {
    formik.setValues({
      name: '',
      address: '',
      latitude: latitude,
      longitude: longitude,
      openingHours: '',
    });
  }, [latitude, longitude]);

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      latitude: latitude,
      longitude: longitude,
      openingHours: '',
    },
    validationSchema: AddNewPlaygroundValidationSchema(),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        address: values.address,
        latitude: latitude,
        longitude: longitude,
        openingHours: values.openingHours,
      };
      axios({
        url: '/playgrounds',
        method: 'POST',
        data: data,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((res) => {
          if (res.data.error) {
            toast({
              title: t('add_new_playground_modal.errors.failed_add_playground'),
              description: res.data.errors,
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top',
            });
          } else {
            toast({
              title: t('add_new_playground_modal.success_add_playground'),
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
            title: t('add_new_playground_modal.errors.failed_add_playground'),
            description: error.response.data.errors,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top',
          });
        });
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus
      isCentered
      id="new_playground_modal"
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
              {t('add_new_playground_modal.title')}
            </Heading>
            <FormControl
              label="Playground name"
              mb={2}
              isInvalid={!!formik.errors.name && formik.touched.name}
              isRequired
            >
              <FormLabel htmlFor="name">
                {t('add_new_playground_modal.name')}
              </FormLabel>
              <Input
                id="name"
                type="text"
                focusBorderColor="teal.600"
                {...formik.getFieldProps('name')}
              />
              {formik.errors.name && formik.touched.name ? (
                <Text color="red.500" mt={1}>
                  {formik.errors.name}
                </Text>
              ) : null}
            </FormControl>
            <FormControl
              label="Playground address"
              mb={2}
              isInvalid={!!formik.errors.address && formik.touched.address}
              isRequired
            >
              <FormLabel htmlFor="address">
                {t('add_new_playground_modal.address')}
              </FormLabel>
              <Input
                id="address"
                type="text"
                focusBorderColor="teal.600"
                {...formik.getFieldProps('address')}
              />
              {formik.errors.address && formik.touched.address ? (
                <Text color="red.500" mt={1}>
                  {formik.errors.address}
                </Text>
              ) : null}
            </FormControl>
            <FormControl label="Playground opening hours" mb={2}>
              <FormLabel htmlFor="openingHours">
                {t('add_new_playground_modal.openingHours')}
              </FormLabel>
              <Input
                id="openingHours"
                type="text"
                focusBorderColor="teal.600"
                {...formik.getFieldProps('openingHours')}
              />
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
              {t('button.cancel')}
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              variant="solid"
              w="full"
              mt={3}
            >
              {t('button.add')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default NewPlayground;
