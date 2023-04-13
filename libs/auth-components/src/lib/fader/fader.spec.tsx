import { render } from '@testing-library/react';

import Fader from './fader';

describe('Fader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< Fader />);
    expect(baseElement).toBeTruthy();
  });
});
