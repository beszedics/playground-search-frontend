import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  ReferenceField,
  Show,
  SimpleForm,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TextInput,
} from 'react-admin';
import React from 'react';

export const EquipmentList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <ArrayField source="playgrounds">
        <SingleFieldList>
          <ChipField source="playground.id" />
        </SingleFieldList>
      </ArrayField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export const EquipmentShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <ArrayField source="playgrounds">
        <Datagrid>
          <ReferenceField
            source="playground.id"
            reference="playgrounds"
            link="show"
            label="Playground name"
          >
            <TextField source="name" />
          </ReferenceField>
        </Datagrid>
      </ArrayField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);

export const EquipmentEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="playgrounds" />
      <DateInput source="createdAt" disabled />
      <DateInput source="updatedAt" disabled />
    </SimpleForm>
  </Edit>
);
