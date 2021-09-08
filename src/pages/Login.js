import {
  Text,
  Center,
  Flex,
  Spacer,
  Box,
  Input,
  FormControl,
  Button,
} from "@chakra-ui/react";

import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Flex align="center" justify="center" h="100vh">
      <Spacer />
      <Center>
        <Box
          border="1px"
          borderColor="gray.300"
          borderRadius="lg"
          w={[300, 620]}
          h={[310, 600]}
          p={[15, 50]}
        >
          <Center mb={[5, 50]}>
            <Text fontSize={["4xl", "6xl"]}>Login</Text>
          </Center>

          <Center mb={[5, 50]}>
            <FormControl>
              <Input
                placeholder="Username"
                textAlign="center"
                h={[12, 20]}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
          </Center>
          <Center mb={[5, 50]}>
            <FormControl>
              <Input
                h={[12, 20]}
                placeholder="Password"
                textAlign="center"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Center>

          <Center>
            <Button w="100%" h={[12, 20]} colorScheme="purple">
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
