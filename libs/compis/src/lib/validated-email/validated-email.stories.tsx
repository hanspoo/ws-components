import type { Meta } from '@storybook/react';
import { ValidatedEmail } from './validated-email';

const Story: Meta<typeof ValidatedEmail> = {
  component: ValidatedEmail,
  title: 'ValidatedEmail',
};
export default Story;

export const Primary = {
  args: {},
};
