import React, { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  Box, IconButton,
  Drawer, DrawerOverlay, Button,
  DrawerContent, DrawerCloseButton,
  DrawerHeader, DrawerBody, DrawerFooter,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();

  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();

  const isLoggedIn = useSelector((state) => state.user.value.username === 'johnshift');

  const logoutHandler = () => {
    dispatch(logout());
    toast({
      title: 'You have successfully logged out',
      status: 'success',
    });
    history.push('/login');
    onClose();
  };

  return (
    <div>
      {isLoggedIn && (
      <div>
        <Box style={{ position: 'absolute', top: 5, right: 5 }}>
          <IconButton
            ref={btnRef}
            aria-label="Menu"
            icon={<HamburgerIcon />}
            variant="outline"
            onClick={onOpen}
          />
        </Box>

        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement="right"
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navigate here</DrawerHeader>

            <DrawerBody>
              <Link to="/" onClick={onClose}>Home</Link>
              <br />
              <Link to="/profile" onClick={onClose}>Profile</Link>
              <br />
              <Link to="/login" onClick={onClose}>Login</Link>
            </DrawerBody>

            <DrawerFooter>
              <Button colorScheme="red" onClick={logoutHandler}>Logout</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      )}
    </div>
  );
};

export default Navbar;
