// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
import {rest} from 'msw'
import {setupServer} from 'msw/node'

// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import Form from '../Form';

describe('The form component', () => {
  beforeAll(() => {
    console.log('in the form component'); 
  });

  it('should render the form element', () => {
    render(<Form />);
    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();
  });

  it('should return data after the button is clicked', async () => {
    // Arrange
    // Act
    // Assert
  });
});