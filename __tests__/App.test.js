import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

describe('Wallet App', () => {
  it('muestra la pantalla de login', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    expect(getByText('LOGIN')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('permite llenar los campos de login', () => {
    const { getByPlaceholderText } = render(<App />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, '1234');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('1234');
  });
});

