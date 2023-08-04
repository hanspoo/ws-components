import type { Meta } from '@storybook/react';
import { UserDetail } from './user-detail';

const Story: Meta<typeof UserDetail> = {
  component: UserDetail,
  title: 'UserDetail',
};
export default Story;

export const Primary = {
  args: {},
};
