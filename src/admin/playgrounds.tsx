import {
  ArrayField,
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';
import React from 'react';

export const PlaygroundList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="address" />
      <NumberField source="latitude" />
      <NumberField source="longitude" />
      <TextField source="openingHours" />
      <NumberField source="averageRating" />
      <NumberField source="totalReviews" />
      <BooleanField source="isPublished" label="Published" />
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
      <BooleanField source="isPublished" label="Published" />
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
      <NumberInput source="averageRating" disabled />
      <NumberInput source="totalReviews" disabled />
      <BooleanInput source="isPublished" label="Published" />
      <TextInput source="ratings" />
      <DateInput source="createdAt" disabled />
      <DateInput source="updatedAt" disabled />
      <TextInput source="equipments" />
    </SimpleForm>
  </Edit>
);
