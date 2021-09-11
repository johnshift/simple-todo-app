import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Heading, Center, VStack, Text,
} from '@chakra-ui/react';
import { retrieveMsg } from '../features/user';

const Welcome = () => {
  const { username } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(retrieveMsg());
  }, []);

  const welcomeMsg = useSelector((state) => state.user.welcomeMessage);

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
            Custom Message from server:
            {welcomeMsg}
          </Text>
        </VStack>
      </Center>
    </div>
  );
};

export default Welcome;
