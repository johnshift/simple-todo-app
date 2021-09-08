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

const Login = () => {
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
              <Input placeholder="Username" textAlign="center" h={[12, 20]} />
            </FormControl>
          </Center>
          <Center mb={[5, 50]}>
            <FormControl>
              <Input
                h={[12, 20]}
                placeholder="Password"
                textAlign="center"
                type="password"
              />
            </FormControl>
          </Center>

          <Center>
            <Button w="100%" h={[12, 20]}>
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
