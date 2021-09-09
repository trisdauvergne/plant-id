import React from 'react'; 
import { screen, render } from '@testing-library/react';
import Form from '../Form';

describe('The form component', () => {
  it('should render the form element', () => {
    render(<Form />);
    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();
  });

  // it('should return data after the button is clicked', () => {
  //   render(<Form />);
  //   const buttonElement = screen.getByRole('button', { name: 'OK' });
  //   expect(buttonElement).toBeInTheDocument();
  // });
});