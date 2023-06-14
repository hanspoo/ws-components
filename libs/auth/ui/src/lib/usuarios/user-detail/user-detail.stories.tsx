import type { Meta } from '@storybook/react';
import { UserDetail } from './user-detail';

const Story: Meta<typeof UserDetail> = {
  component: UserDetail,
  title: 'UserDetail',
};
export default Story;

const usuario = { "id": "ff4a0d0b-65d5-488d-b102-6fbf0eb43207", "nombre": "Admin", "email": "admin@starter.com", "esAdmin": true }

export const Primary = {
  args: { usuario },
};
