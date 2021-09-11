import React from 'react';

import {
  Box, IconButton, useToast, Icon, useDisclosure, Button,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
  AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton,
} from '@chakra-ui/react';
import { FaPowerOff } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/user';

const LogoutBtn = () => {
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.username === 'johnshift';
  const dispatch = useDispatch();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const logoutHandler = () => {
    dispatch(logout());
    onClose();
    toast({
      title: 'You have successfully logged out!',
      info: 'success',
    });
  };

  return (
    <div>
      {isLoggedIn && (
      <Box style={{ position: 'absolute', top: 30, right: 30 }}>
        <IconButton
          aria-label="Logout"
          icon={<Icon as={FaPowerOff} />}
          variant="outline"
          colorScheme="red"
          isRound
          onClick={onOpen}
        />
      </Box>
      )}

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Logout</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to logout?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>No</Button>
            <Button colorScheme="red" ml={3} onClick={logoutHandler}>Yes</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LogoutBtn;
