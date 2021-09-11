/* eslint react/prop-types: 0 */
/* eslint-disable react/jsx-props-no-spreading */
import {
  IconButton, Icon, useDisclosure, Center, Button,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
  AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton,
  FormControl, Input, FormLabel, Spinner, useToast,

//   useColorMode,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

import moment from 'moment';

import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { useGetTodoMutation, useUpdateTodoMutation } from '../services/todo';

const UpdateTodo = ({ todo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [description, setDescription] = useState(todo.description);
  const [date, setDate] = useState(new Date());

  // this is unnecessary since we already have the todo object passed as props
  // this is only done for exercise and demo purposes of using rtq query to a backend
  const [getTodo, { isLoading, isError }] = useGetTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const toast = useToast();

  let body = (
    <>
      <Center>
        <FormControl>
          <FormLabel>Description:</FormLabel>
          <Input
            size="lg"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormControl>
      </Center>
      <br />
      <Center>
        <FormControl>
          <FormLabel>Due Date:</FormLabel>
          <SingleDatepicker
            name="date-input"
            date={date}
            onDateChange={setDate}
          />
        </FormControl>
      </Center>
    </>
  );
  if (isLoading) {
    body = <Center><Spinner size="xl" /></Center>;
  } else if (isError) {
    body = <Center><div>Error fetching data</div></Center>;
  }

  return (
    <>
      <IconButton
        mr={5}
        size="xs"
        colorScheme="green"
        variant="solid"
        isRound
        icon={<Icon as={FaEdit} />}
        onClick={() => {
          onOpen();
          getTodo({ username: 'alsdfjalsdfjkasf', todoID: todo.id }).unwrap()
            .then((res) => {
              setDescription(res.description);
              setDate(moment(res.targetDate).toDate());
            });
        }}
      />

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

            {body}

          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="green"
              ml={3}
              onClick={() => {
                updateTodo({
                  username: 'some_username',
                  todo: {
                    ...todo,
                    description,
                    targetDate: moment(date).toISOString(),
                  },
                }).unwrap()
                  .then((res) => {
                    onClose();
                    toast({
                      title: 'Update Successful!',
                      description: `New description: "${res.description}"`,
                      type: 'info',
                    });
                  });
              }}
            >
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UpdateTodo;
