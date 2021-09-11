import React, { useState } from 'react';

import {
  Box, IconButton, Icon, Center,
  useDisclosure, Button,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
  AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton,
  FormControl, Input,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';

import { FaPlus } from 'react-icons/fa';
import { addTodo } from '../features/todo';

const AddTodo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const dispatch = useDispatch();
  const [desc, setDesc] = useState('');

  return (
    <>
      <Box style={{ position: 'absolute', bottom: 30, right: 30 }}>
        <IconButton
          icon={<Icon as={FaPlus} />}
          colorScheme="purple"
          onClick={onOpen}
        />
      </Box>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Add Todo</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>

            <Center>
              <FormControl>
                <Input
                  placeholder="Description ..."
                  size="lg"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
              </FormControl>
            </Center>

          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="green"
              ml={3}
              onClick={() => {
                dispatch(addTodo(desc));
                onClose();
                setDesc('');
              }}
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddTodo;
