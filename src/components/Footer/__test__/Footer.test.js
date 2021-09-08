import { screen, render } from '@testing-library/react';
import Footer from '../Footer';

describe('The Footer component', () => {
  it('should render the link to the Github pages', () => {
    render(<Footer />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  })
})