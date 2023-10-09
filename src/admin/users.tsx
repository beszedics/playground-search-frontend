import {
  ArrayField,
  ArrayInput,
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EmailField,
  List,
  NumberField,
  NumberInput,
  Show,
  SimpleForm,
  SimpleFormIterator,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';
import React from 'react';

export const UserList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <EmailField source="email" />
      <TextField source="username" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <BooleanField source="isAdmin" label="Admin" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <EmailField source="email" />
      <TextField source="username" />
      <TextField source="password" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <BooleanField source="isAdmin" label="Admin" />
      <ArrayField source="ratings">
        <Datagrid>
          <TextField source="id" />
          <NumberField source="score" />
          <TextField source="comment" />
          <NumberField source="playground.id" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
        </Datagrid>
      </ArrayField>
      <TextField source="playgrounds" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="email" />
      <TextInput source="username" />
      <TextInput source="password" />
      <TextInput source="firstName" />
      <TextInput source="lastName" />
      <BooleanInput source="isAdmin" label="Admin" />
      <ArrayInput source="ratings">
        <SimpleFormIterator>
          <TextInput source="id" />
          <NumberInput source="score" />
          <TextInput source="comment" />
          <NumberInput source="playground.id" />
          <DateInput source="createdAt" />
          <DateInput source="updatedAt" />
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source="playgrounds" />
      <DateInput source="createdAt" disabled />
      <DateInput source="updatedAt" disabled />
    </SimpleForm>
  </Edit>
);
