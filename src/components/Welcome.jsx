import React from 'react';

import { useSelector } from 'react-redux';

import {
  Heading, Center, VStack, Text,
} from '@chakra-ui/react';

const Welcome = () => {
  const { username } = useSelector((state) => state.user.value);

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
          <Text fontSize="2xl">Custom Message from server: TODO</Text>
        </VStack>
      </Center>
    </div>
  );
};

export default Welcome;
