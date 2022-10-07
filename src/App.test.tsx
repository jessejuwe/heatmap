import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Testing Suite
describe('<App />', () => {
  // Test
  test('renders HeatMap Chart', () => {
    // Arrange
    render(<App />);

    // Act

    // Assert
    const linkElement = screen.getByText(/HeatMap Chart/i, { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
});
