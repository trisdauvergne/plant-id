import { screen, render } from '@testing-library/react';
import Form from '../Form';

describe('The form component', () => {
  it('should render the form element', () => {
    render(<Form />);
    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();
  });
});