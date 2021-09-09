/* globals describe, test, beforeEach */

import React from 'react';

import {
  render,
} from '@testing-library/react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import store from '../store';

beforeEach(() => {
  render(
    <Provider store={store}>
      <LogoutBtn />
    </Provider>,
    { wrapper: BrowserRouter },
  );
});

describe('logout component', () => {
  test.todo('logout shows modal confirmation');
  test.todo('logout shows success toast');
  test.todo('logout redirects to "/login"');
  test.todo('verify logout by navigating to "/", should redirect to "/login"');
});
