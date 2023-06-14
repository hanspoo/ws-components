import type { Meta } from '@storybook/react';
import { UsersList } from './users-list';

const Story: Meta<typeof UsersList> = {
  component: UsersList,
  title: 'UsersList',
};
export default Story;

const usuarios = [
  {
    "id": 1,
    "nombre": "Admin",
    "email": "admin@starter.com",
    "esAdmin": false
  },
  {
    "id": 2,
    "nombre": "Hans Poo",
    "email": "hanspoo@gmail.com",
    "esAdmin": true
  }
]


export const Primary = {
  args: { usuarios },
};
