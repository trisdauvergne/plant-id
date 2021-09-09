import { render, screen } from '@testing-library/react';
import Header from '../Header'

describe('The Header component', () => {
  beforeAll(() => {
    console.log('in the header component'); 
  });

  it('should render the header component', () => {
    render(<Header />);
    const headerElement = screen.getByText(/plant id app/i);
    expect(headerElement).toBeInTheDocument();
  });
})