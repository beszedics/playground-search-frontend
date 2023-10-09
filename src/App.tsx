import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Header from './components/Header/Header';
import { UserProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './components/Main/Main';
import { UserLocationProvider } from './context/UserLocation';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './components/Error/Error';
import ReactAdmin from './admin/Admin';
import PlaygroundDetail from './components/PlaygroundDetail/PlaygroundDetail';

const AppHeader = () => {
  return (
    <>
      <UserLocationProvider>
        <UserProvider />
        <Header />
      </UserLocationProvider>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <AppHeader />
        <Main />
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: '/playgrounds/:playgroundId',
    element: (
      <>
        <AppHeader />
        <PlaygroundDetail />
      </>
    ),
  },
  {
    path: '/admin',
    element: <ReactAdmin />,
  },
  {
    path: '/admin/*',
    element: <ReactAdmin />,
  },
]);

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  );
};
