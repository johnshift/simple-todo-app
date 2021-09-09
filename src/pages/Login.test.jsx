/* globals describe, test, expect, beforeEach */
import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

import store from '../store';

beforeEach(() => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>,
    { wrapper: BrowserRouter },
  );
});

describe('login page', () => {
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

  test('on login success, display toast', async () => {
    // hardcode credentials
    await fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johnshift' } });
    await fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'john123' } });
    await fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // should have no error indicators
    expect(screen.getByPlaceholderText('Username').getAttribute('aria-invalid')).toBeNull();
    expect(screen.getByPlaceholderText('Password').getAttribute('aria-invalid')).toBeNull();

    // should display success toast
    expect(await screen.findByText(/welcome johnshift!/i)).toBeInTheDocument();
  });

  test.todo('success login is redirected to "/"');
  test.todo('unauthorized access is redirected to "/login"');
  test.todo('logout successful');
  test.todo('logout is redirecrted to "/login"');
  test.todo('redirect to "/" if already logged in when accessing "/login"');
});
