import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';
import React from 'react';

export const RatingList = () => (
  <List>
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
