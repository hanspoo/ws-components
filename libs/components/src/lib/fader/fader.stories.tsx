import { ComponentMeta } from '@storybook/react';
import { Fader } from './fader';

export default {
  component: Fader,
  title: 'Fader',
} as ComponentMeta<typeof Fader>;


export const Primary = () => <Fader>Hello world 1</Fader>
export const Secondary = () => <Fader>Hello world 2</Fader>
