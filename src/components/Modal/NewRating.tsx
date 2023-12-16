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
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Logo from '../Logo/Logo';
import { useTranslation } from 'react-i18next';
import axios from '../../api/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type NewRatingProps = {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
  playgroundId?: string;
};

const AddNewRatingValidationSchema = () => {
  const { t } = useTranslation();

  return Yup.object().shape({
    score: Yup.string().required(
      t('add_new_rating_modal.errors.score') || 'Score is required',
    ),
  });
};

const NewRating = ({
  isOpen,
  onClose,
  userId,
  playgroundId,
}: NewRatingProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [showTooltip, setShowTooltip] = React.useState(false);

  useEffect(() => {
    formik.setValues({
      score: 5,
      comment: '',
      userId: userId,
      playgroundId: playgroundId,
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      score: 5,
      comment: '',
      userId: userId,
      playgroundId: playgroundId,
    },
    validationSchema: AddNewRatingValidationSchema(),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);
      const data = {
        score: values.score,
        comment: values.comment,
        userId: values.userId,
        playgroundId: Number(values.playgroundId),
      };
      axios({
        url: '/ratings',
        method: 'POST',
        data: data,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((res) => {
          if (res.data.error) {
            toast({
              title: t('add_new_rating_modal.errors.failed_add_playground'),
              description: res.data.errors,
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top',
            });
          } else {
            toast({
              title: t('add_new_rating_modal.success_add_playground'),
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
            title: t('add_new_rating_modal.errors.failed_add_playground'),
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
      id="new_rating_modal"
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
              {t('add_new_rating_modal.title')}
            </Heading>
            <FormControl
              label="Score"
              mb={2}
              isInvalid={!!formik.errors.score && formik.touched.score}
              isRequired
            >
              <FormLabel htmlFor="score">
                {t('add_new_rating_modal.score')}
              </FormLabel>
              <Slider
                defaultValue={formik.values.score}
                min={1}
                max={5}
                step={1}
                id="score"
                colorScheme="teal"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                mb={2}
                {...formik.getFieldProps('score')}
                onChange={(value) => formik.setFieldValue('score', value)}
              >
                <SliderMark value={1} mt="2" ml="-1" fontSize="sm">
                  1
                </SliderMark>
                <SliderMark value={2} mt="2" ml="-1" fontSize="sm">
                  2
                </SliderMark>
                <SliderMark value={3} mt="2" ml="-1" fontSize="sm">
                  3
                </SliderMark>
                <SliderMark value={4} mt="2" ml="-1" fontSize="sm">
                  4
                </SliderMark>
                <SliderMark value={5} mt="2" ml="-1" fontSize="sm">
                  5
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="teal.500"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={formik.values.score}
                >
                  <SliderThumb />
                </Tooltip>
              </Slider>
              {formik.errors.score && formik.touched.score ? (
                <Text color="red.500" mt={1}>
                  {formik.errors.score}
                </Text>
              ) : null}
            </FormControl>
            <FormControl label="Comment">
              <FormLabel htmlFor="comment">
                {t('add_new_rating_modal.comment')}
              </FormLabel>
              <Input
                as={Textarea}
                id="comment"
                type="text"
                focusBorderColor="teal.600"
                {...formik.getFieldProps('comment')}
              />
              {formik.errors.comment && formik.touched.comment ? (
                <Text color="red.500" mt={1}>
                  {formik.errors.comment}
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
            >
              {t('button.cancel')}
            </Button>
            <Button type="submit" colorScheme="teal" variant="solid" w="full">
              {t('button.add')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default NewRating;
