import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Center, Flex,
  IconButton, Icon,
  Table, Thead, Tbody, Tr, Th, Td,
  useDisclosure, Button,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
  AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton,
  FormControl, Input, Spinner,
} from '@chakra-ui/react';
import { FaTimes, FaPlus } from 'react-icons/fa';

import { addTodo, deleteTodo, setTodos } from '../features/todo';

import { useGetAllTodosMutation } from '../services/todo';

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
const TodoList = () => {
  const { todoList } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const [getAllTodos, { isLoading, isError }] = useGetAllTodosMutation();

  let todosRendered = (
    <Table colorScheme="purple" size="lg">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Description</Th>
          <Th>Done</Th>
          <Th>Target Date</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {todoList.map((todo) => (
          <Tr key={todo.id}>
            <Td>{todo.id}</Td>
            <Td>{todo.description}</Td>
            <Td>{todo.isDone.toString()}</Td>
            <Td>{todo.targetDate}</Td>
            <Td>
              <IconButton
                size="xs"
                colorScheme="red"
                variant="solid"
                isRound
                icon={<Icon as={FaTimes} />}
                onClick={() => {
                  dispatch(deleteTodo(todo));
                }}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
  if (isLoading) {
    todosRendered = <Spinner size="xl" />;
  } else if (isError) {
    todosRendered = <div>Error fetching data</div>;
  }

  React.useEffect(() => {
    getAllTodos('some_username').unwrap()
      .then((todos) => {
        dispatch(setTodos(todos));
      });
  }, []);

  return (
    <>
      <AddTodo />
      <Flex align="center" justify="center" h="100vh">
        <Center>
          <Box
            boxShadow="md"
            rounded="lg"
          >
            {todosRendered}
          </Box>
        </Center>
      </Flex>
    </>
  );
};

export default TodoList;
