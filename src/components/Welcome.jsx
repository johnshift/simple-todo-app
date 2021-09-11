import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Heading, Center, VStack, Text, Button, Box,
} from '@chakra-ui/react';

import { setMsg, deleteMsg } from '../features/user';

import { useGetWelcomeMessageMutation } from '../services/user';

const Welcome = () => {
  const { username, welcomeMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [getMsg, { isLoading, isError }] = useGetWelcomeMessageMutation();

  return (
    <div>
      <Center>
        <VStack>
          <Heading size="4xl">Welcome!</Heading>
          <Text fontSize="2xl">
            Hello
            {' '}
            {username}
          </Text>

          {isError && <Text>Error fetching message!</Text>}
          {isLoading && <Text>Fetching message ...</Text>}
          {welcomeMessage && (
            <Text>
              message:
              {`  "${welcomeMessage}"`}
            </Text>
          )}

          <Box>
            <Button onClick={() => {
              getMsg(username).unwrap()
                .then(({ message }) => {
                  dispatch(setMsg(message));
                });
            }}
            >
              Get Custom Message
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                dispatch(deleteMsg());
              }}
            >
              Delete Msg
            </Button>
          </Box>
        </VStack>
      </Center>
    </div>
  );
};

export default Welcome;
