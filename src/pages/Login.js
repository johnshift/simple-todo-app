import {
  Text,
  Center,
  Flex,
  Spacer,
  Box,
  Input,
  FormControl,
  Button,
  FormHelperText,
} from "@chakra-ui/react";

import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const submit = () => {
    if (username !== "johnshift") {
      setUsernameInvalid(true);
    }

    if (password !== "john123") {
      setPasswordInvalid(true);
    }
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
          h={[330, 620]}
          p={[15, 50]}
        >
          <Center mb={[2, 50]}>
            <Text fontSize={["4xl", "6xl"]}>Login</Text>
          </Center>

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
                  setUsername(e.target.value);
                }}
              />
              {usernameInvalid && (
                <FormHelperText color="red" textAlign="center">
                  Username not found
                </FormHelperText>
              )}
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
                  setPassword(e.target.value);
                }}
              />
              {passwordInvalid && (
                <FormHelperText color="red" textAlign="center">
                  Incorrect password
                </FormHelperText>
              )}
            </FormControl>
          </Center>

          <Center>
            <Button w="100%" h={[12, 20]} colorScheme="purple" onClick={submit}>
              Login
            </Button>
          </Center>
        </Box>
      </Center>
      <Spacer />
    </Flex>
  );
};

export default Login;
