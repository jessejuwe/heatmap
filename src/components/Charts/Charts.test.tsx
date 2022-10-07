import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Charts from './Charts';

// Testing Suite
describe('<Chart />', () => {
  // Test
  test(`renders 'Nice meeting you' if 'change text' button is clicked`, () => {
    // Arrange
    render(<Charts />);

    // Act
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // Assert
    const linkElement = screen.getByText('Nice meeting you', { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
});
