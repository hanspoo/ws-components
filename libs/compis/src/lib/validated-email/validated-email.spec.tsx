import { render } from '@testing-library/react';

import ValidatedEmail from './validated-email';

describe('ValidatedEmail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ValidatedEmail />);
    expect(baseElement).toBeTruthy();
  });
});
