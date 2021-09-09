import React from 'react';

import {
  Box, IconButton, useToast, Icon,
} from '@chakra-ui/react';
import { FaPowerOff } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/user';

const LogoutBtn = () => {
  const user = useSelector((state) => state.user.value);
  const isLoggedIn = user.username === 'johnshift';
  const dispatch = useDispatch();

  const toast = useToast();

  const logoutHandler = () => {
    dispatch(logout());
    toast({
      title: 'You have successfully logged out!',
      info: 'success',
    });
  };

  return (
    <div>
      {isLoggedIn && (
      <Box style={{ position: 'absolute', top: 5, right: 5 }}>
        <IconButton
          aria-label="Logout"
          icon={<Icon as={FaPowerOff} />}
          variant="outline"
          colorScheme="red"
          onClick={logoutHandler}
        />
      </Box>
      )}
    </div>
  );
};

export default LogoutBtn;
