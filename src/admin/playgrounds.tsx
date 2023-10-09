import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';
import React from 'react';

const playgroundFilters = [
  <TextInput key="nemtudom" source="q" label="Search" alwaysOn />,
  <ReferenceInput
    key="nemtudom2"
    source="userId"
    label="User"
    reference="users"
  />,
];

export const PlaygroundList = () => (
  <List filters={playgroundFilters}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="address" />
      <NumberField source="latitude" />
      <NumberField source="longitude" />
      <TextField source="openingHours" />
      <NumberField source="averageRating" />
      <NumberField source="totalReviews" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export const PlaygroundShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="address" />
      <NumberField source="latitude" />
      <NumberField source="longitude" />
      <TextField source="openingHours" />
      <NumberField source="averageRating" />
      <NumberField source="totalReviews" />
      <ArrayField source="equipments">
        <Datagrid>
          <ReferenceField
            source="equipment.id"
            reference="equipments"
            link="show"
            label="Equipment"
          >
            <TextField source="name" />
          </ReferenceField>
        </Datagrid>
      </ArrayField>
      <ArrayField source="ratings">
        <Datagrid>
          <TextField source="id" />
          <NumberField source="score" />
          <TextField source="comment" />
          <ReferenceField
            source="user.id"
            reference="users"
            link="show"
            label="Username"
          >
            <TextField source="username" />
          </ReferenceField>
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
        </Datagrid>
      </ArrayField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);

export const PlaygroundEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="address" />
      <NumberInput source="latitude" />
      <NumberInput source="longitude" />
      <TextInput source="openingHours" />
      <TextInput source="ratings" />
      <NumberInput source="averageRating" disabled />
      <DateInput source="createdAt" disabled />
      <DateInput source="updatedAt" disabled />
      <TextInput source="equipments" />
    </SimpleForm>
  </Edit>
);
