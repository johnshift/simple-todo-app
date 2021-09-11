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

  let msg = (
    <Text>
      message:
      {`  "${welcomeMessage}"`}
    </Text>
  );
  if (isLoading) {
    msg = <Text>Fetching message ...</Text>;
  } else if (isError) {
    msg = <Text>Error fetching message</Text>;
  }

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

          {msg}

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
