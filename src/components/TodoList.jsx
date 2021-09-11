/* eslint react/prop-types: 0 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Center, Flex,
  IconButton, Icon,
  Table, Thead, Tbody, Tr, Th, Td, Spinner,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';

import { deleteTodo, setTodos } from '../features/todo';

import { useGetAllTodosMutation, useDeleteTodoMutation } from '../services/todo';

import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';

const TodoList = () => {
  const { todoList } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const [getAllTodos, { isLoading, isError }] = useGetAllTodosMutation();
  const [deleteTodoApi] = useDeleteTodoMutation();

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

              <UpdateTodo
                todo={todo}
              />
              <IconButton
                size="xs"
                colorScheme="red"
                variant="solid"
                isRound
                icon={<Icon as={FaTimes} />}
                onClick={() => {
                  deleteTodoApi({ username: 'some_username', todoID: todo.id }).unwrap()
                    .then(() => {
                      dispatch(deleteTodo(todo));
                    });
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
        // change date format of todos into ISO String
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
