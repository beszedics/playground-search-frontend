import React from 'react';
import { Admin, AppBar, Resource, TitlePortal } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { UserEdit, UserList, UserShow } from './users';
import { PlaygroundEdit, PlaygroundList, PlaygroundShow } from './playgrounds';
import { RatingList, RatingShow } from './ratings';
import { EquipmentEdit, EquipmentList, EquipmentShow } from './equipments';
import PeopleIcon from '@mui/icons-material/People';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import HandymanIcon from '@mui/icons-material/Handyman';
import { useNavigate } from 'react-router-dom';
import { Layout as RaLayout } from 'react-admin';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const CustomAppBar = (props: any) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoHomeClick = () => {
    navigate('/');
  };

  return (
    <AppBar {...props} sx={{ backgroundColor: '#319795' }}>
      <TitlePortal />
      <Button onClick={handleGoHomeClick} mr={2}>
        {t('button.leave_admin')}
      </Button>
    </AppBar>
  );
};

const Layout = (props: any) => <RaLayout {...props} appBar={CustomAppBar} />;

const ReactAdmin = () => {
  return (
    <Admin
      dataProvider={simpleRestProvider('http://localhost:8080/api/v1')}
      basename="/admin"
      layout={Layout}
    >
      <Resource
        name="users"
        list={UserList}
        show={UserShow}
        edit={UserEdit}
        icon={PeopleIcon}
      />
      <Resource
        name="playgrounds"
        list={PlaygroundList}
        show={PlaygroundShow}
        edit={PlaygroundEdit}
        icon={PlaceIcon}
      />
      <Resource
        name="ratings"
        list={RatingList}
        show={RatingShow}
        icon={StarIcon}
      />
      <Resource
        name="equipments"
        list={EquipmentList}
        show={EquipmentShow}
        edit={EquipmentEdit}
        icon={HandymanIcon}
      />
    </Admin>
  );
};

export default ReactAdmin;
