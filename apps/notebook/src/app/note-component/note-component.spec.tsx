import { render } from '@testing-library/react';

import NoteComponent from './note-component';

describe('NoteComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NoteComponent />);
    expect(baseElement).toBeTruthy();
  });
});
