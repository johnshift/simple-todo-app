import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Heading, Center, VStack, Text, Button, Box,
} from '@chakra-ui/react';
import { retrieveMsg, deleteMsg } from '../features/user';

const Welcome = () => {
  const { username } = useSelector((state) => state.user);

  const welcomeMsg = useSelector((state) => state.user.welcomeMessage);

  const dispatch = useDispatch();

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
          <Text fontSize="2xl">
            {welcomeMsg}
          </Text>
          <Box>
            <Button onClick={() => {
              dispatch(retrieveMsg());
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
