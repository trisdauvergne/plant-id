import { screen, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Footer from '../Footer';

describe('The Footer component', () => {
  beforeAll(() => {
    console.log('in the footer component'); 
  });

  it('should render the link to the Github pages', () => {
    render(<Footer />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });

  it('should navigate to Plant ID docs when link is clicked', () => {
    render(<Footer />);
    // const linkElement = screen.getByText(/Go to Plant ID Docs/i);
    // expect(linkElement.href).toBe('https://github.com/Plant-id/Plant-id-API/wiki');
    // userEvent.click(linkElement);
    // expect(window.location.href).toBe('https://github.com/Plant-id/Plant-id-API/wiki');
  });
})