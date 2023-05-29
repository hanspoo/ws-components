import type { Meta } from '@storybook/react';
import { PublicDecorator } from './public-decorator';

const Story: Meta<typeof PublicDecorator> = {
  component: PublicDecorator,
  title: 'PublicDecorator',
};
export default Story;

export const Primary = {
  args: {},
};
