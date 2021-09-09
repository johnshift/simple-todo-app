/* globals describe, test, expect, beforeEach */
import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import Login from './Login';

beforeEach(() => render(<Login />));

describe('login elements', () => {
  test('login title is visible', () => {
    expect(screen.getByTitle('Login')).toBeInTheDocument();
  });

  test('username field is visible', () => {
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
  });

  test('password field is visible', () => {
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('password field has type password', () => {
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
  });

  test('login button is visible', () => {
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('username error indicators', async () => {
    await fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'asdf' } });
    await fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // red border on input
    expect(screen.getByPlaceholderText('Username')).toHaveAttribute('aria-invalid', 'true');

    // // toast error
    expect(await screen.findByText(/Username not found/i)).toBeInTheDocument();
  });

  test('password error indicators', async () => {
    await fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johnshift' } });
    await fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'asdf' } });
    await fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // red border on input
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('aria-invalid', 'true');

    // toast error
    expect(await screen.findByText(/Incorrect password/i)).toBeInTheDocument();
  });

  test('on username error, typing dismisses indicator', async () => {
    // purposely submit error values
    await fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'asdf' } });
    await fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'asdf' } });
    await fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // // try to dismiss errors by changing username field
    await fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johnshift' } });

    // red border on input
    expect(screen.getByPlaceholderText('Username').getAttribute('aria-invalid')).toBeNull();
  });

  test('on password error, typing dismisses indicator', async () => {
    // purposely submit correct username, and incorrect password
    await fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johnshift' } });
    await fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'asdf' } });
    await fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // change password field
    await fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123123' } });

    // red border on input
    expect(screen.getByPlaceholderText('Password').getAttribute('aria-invalid')).toBeNull();
  });
});
