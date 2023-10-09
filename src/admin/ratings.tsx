import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin';
import React from 'react';

const ratingFilters = [
  <TextInput key="nemtudom" source="q" label="Search" alwaysOn />,
];

export const RatingList = () => (
  <List filters={ratingFilters}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <NumberField source="score" />
      <TextField source="comment" />
      <ReferenceField
        source="playground.id"
        label="Playground name"
        reference="playgrounds"
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        source="user.id"
        label="Username"
        reference="users"
        link="show"
      >
        <TextField source="username" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export const RatingShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <NumberField source="score" />
      <TextField source="comment" />
      <ReferenceField
        source="playground.id"
        reference="playgrounds"
        link="show"
        label="Playground name"
      >
        <TextField source="name" />
      </ReferenceField>
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
    </SimpleShowLayout>
  </Show>
);
