import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useToast,
} from '@chakra-ui/react';
import React, { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SearchIcon } from '@chakra-ui/icons';
import Logo from '../Logo/Logo';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = useCallback(() => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === 'EN' ? 'HU' : 'EN';
    i18n.changeLanguage(newLanguage);
  }, []);

  const onSignUpClick = () => {
    setShowRegistrationModal(!showRegistrationModal);
  };

  const onLoginClick = () => {
    setShowLoginModal(!showLoginModal);
  };

  const onLogoutClick = () => {
    localStorage.removeItem('token');
    setUser?.({ status: false });
    toast({
      title: t('loginModal.successfulLogout'),
      description: t('loginModal.bye'),
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <>
      <HStack
        bg="white"
        w="100%"
        minH="80px"
        p={4}
        color="black"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="sm"
        wrap="wrap"
      >
        <Box minW="200px" onClick={() => navigate('/')} cursor="pointer">
          <Logo />
        </Box>
        <Box w="500px">
          <InputGroup>
            <Input
              type="text"
              placeholder={String(t('header.search_playground'))}
              focusBorderColor="teal.600"
            />
            <InputRightElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<SearchIcon color="#9A9A9A" />}
            />
          </InputGroup>
        </Box>
        <HStack>
          <Button onClick={changeLanguage}>
            {i18n.language === 'EN' ? 'HU' : 'EN'}
          </Button>
          <Button as={Link} to="/admin">
            {t('button.admin')}
          </Button>
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar
                  name={`${user.firstName} ${user.lastName}`}
                  bg="teal.400"
                />
              </MenuButton>
              <MenuList>
                <MenuItem>{t('header.profile')}</MenuItem>
                <MenuDivider />
                <MenuItem onClick={onLogoutClick}>
                  {t('header.logout')}
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Stack spacing={2} direction="row" align="center">
              <Button colorScheme="teal" onClick={onSignUpClick}>
                {t('header.signUp')}
              </Button>
              <Button colorScheme="teal" onClick={onLoginClick}>
                {t('header.login')}
              </Button>
            </Stack>
          )}
        </HStack>
      </HStack>
      {showRegistrationModal && (
        <Registration
          isOpen
          onClose={onSignUpClick}
          setShowLoginModal={setShowLoginModal}
          setShowRegistrationModal={setShowRegistrationModal}
        />
      )}
      {showLoginModal && (
        <Login
          isOpen
          onClose={onLoginClick}
          setShowRegistrationModal={setShowRegistrationModal}
          setShowLoginModal={setShowLoginModal}
        />
      )}
    </>
  );
};

export default Header;
