import { Link, useRouteError } from 'react-router-dom';
import React from 'react';
import { Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';

const Error = () => {
  const error: any = useRouteError();
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height={`calc(100vh - 80px)`}
      >
        <Heading as="h1" size="xl">
          {t('errors.something_went_wrong')}
        </Heading>
        <Text fontSize="lg" color="gray.600" my={2}>
          {t('errors.error_occurred', { errorMessage: error.error?.message })}
        </Text>
        <ChakraLink as={Link} to="/" color="teal.500">
          {t('button.go_home')}
        </ChakraLink>
      </Box>
    </>
  );
};

export default Error;
