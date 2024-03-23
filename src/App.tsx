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
import { SearchProvider } from './context/SearchContext';
import Profile from './components/Profile/Profile';

const AppHeader = () => {
  return (
    <>
      <Header />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <UserLocationProvider>
          <AppHeader />
          <Main />
        </UserLocationProvider>
      </>
    ),
    errorElement: <Error />,
  },
  {
    path: '/profile',
    element: (
      <>
        <UserLocationProvider>
          <AppHeader />
          <Profile />
        </UserLocationProvider>
      </>
    ),
  },
  {
    path: '/playgrounds/:playgroundId',
    element: (
      <>
        <UserLocationProvider>
          <AppHeader />
          <PlaygroundDetail />
        </UserLocationProvider>
      </>
    ),
    errorElement: <Error />,
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
        <UserProvider>
          <SearchProvider>
            <RouterProvider router={router} />
          </SearchProvider>
        </UserProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
