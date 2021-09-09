import React from 'react';
import { Text } from '@chakra-ui/react';

import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <div>
      <Text fontSize="6xl">Home</Text>
      <br />
      <p>
        username:
        {user.username}
      </p>
    </div>
  );
};

export default Home;
