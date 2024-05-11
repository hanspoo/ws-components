import { render } from '@testing-library/react';

import CrearNota from './crear-nota';

describe('CrearNota', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CrearNota />);
    expect(baseElement).toBeTruthy();
  });
});
