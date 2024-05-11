import { render } from '@testing-library/react';

import NotebookComponent from './notebook-component';

describe('NotebookComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotebookComponent />);
    expect(baseElement).toBeTruthy();
  });
});
