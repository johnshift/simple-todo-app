import React, { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  Box, IconButton,
  Drawer, DrawerOverlay, Button,
  DrawerContent, DrawerCloseButton,
  DrawerHeader, DrawerBody, DrawerFooter,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();

  return (
    <>
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
            <Button colorScheme="red">Logout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
