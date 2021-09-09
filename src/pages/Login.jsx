import React, { useRef, useState, useLayoutEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  Center,
  Flex,
  Spacer,
  Box,
  Input,
  FormControl,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { login } from '../features/user';

const Login = () => {
  // if already logged in, redirect to "/"
  const toast = useToast();
  const user = useSelector((state) => state.user.value);
  const history = useHistory();

  useLayoutEffect(() => {
    if (user.username === 'johnshift') {
      history.replace('/');
    }
    return () => {

    };
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const usernameToastRef = useRef();
  const passwordToastRef = useRef();

  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    if (username !== 'johnshift') {
      setUsernameInvalid(true);
      usernameToastRef.current = toast({
        title: 'Username not found',
        status: 'error',
      });
      return;
    }

    if (password !== 'john123') {
      setPasswordInvalid(true);
      passwordToastRef.current = toast({
        title: 'Incorrect password',
        status: 'error',
      });
      return;
    }

    dispatch(login({ username }));
    toast({
      title: `Welcome ${username}!`,
      status: 'success',
    });
    history.push('/');
  };

  return (
    <Flex align="center" justify="center" h="100vh">
      <Spacer />
      <Center>
        <Box
          border="1px"
          borderColor="gray.300"
          borderRadius="lg"
          w={[300, 620]}
          h={[300, 600]}
          p={[15, 50]}
        >
          <Center mb={[2, 50]}>
            <Text fontSize={['4xl', '6xl']} title="Login">Login</Text>
          </Center>

          <form onSubmit={submit}>
            <Center mb={[5, 50]}>
              <FormControl>
                <Input
                  isInvalid={usernameInvalid}
                  placeholder="Username"
                  textAlign="center"
                  h={[12, 20]}
                  value={username}
                  onChange={(e) => {
                    setUsernameInvalid(false);
                    toast.close(usernameToastRef.current);
                    setUsername(e.target.value);
                  }}
                />
              </FormControl>
            </Center>
            <Center mb={[5, 50]}>
              <FormControl>
                <Input
                  isInvalid={passwordInvalid}
                  h={[12, 20]}
                  placeholder="Password"
                  textAlign="center"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPasswordInvalid(false);
                    toast.close(passwordToastRef.current);
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>
            </Center>

            <Center>
              <Button w="100%" h={[12, 20]} colorScheme="purple" onClick={submit} type="submit">
                Login
              </Button>
            </Center>
          </form>
        </Box>
      </Center>
      <Spacer />
    </Flex>
  );
};

export default Login;
