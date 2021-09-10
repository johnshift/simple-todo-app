import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Center, Flex,
  Table, Thead, Tbody, Tr, Th, Td,
} from '@chakra-ui/react';

const TodoList = () => {
  const todoList = useSelector((state) => state.todo.value.todoList);
  return (
    <Flex align="center" justify="center" h="100vh">
      <Center>
        <Box
          boxShadow="md"
          rounded="lg"
          // w={[300, 500]}
        >
          <Table variant="striped" colorScheme="purple" size="lg">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Description</Th>
                <Th>Done</Th>
                <Th>Target Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {todoList.map((todo) => (
                <Tr key={todo.id}>
                  <Td>{todo.id}</Td>
                  <Td>{todo.description}</Td>
                  <Td>{todo.done.toString()}</Td>
                  <Td>{todo.due.toString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
    </Flex>
  );
};

export default TodoList;
