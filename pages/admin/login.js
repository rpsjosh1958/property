import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAdmin } from '../../hooks/useAdmin';
import { useEffect } from 'react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, isAdmin, loading: authLoading } = useAdmin();

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      router.push('/admin/dashboard');
    }
  }, [user, isAdmin, authLoading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The useEffect will handle the redirect
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <Box minH="100vh" bg="black" display="flex" alignItems="center" justifyContent="center">
        <Heading color="white">Loading...</Heading>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="black" py={16}>
      <Container maxW="md">
        <VStack spacing={8}>
          <Heading color="white" size="xl" textAlign="center">
            Admin Login
          </Heading>
          
          <Box 
            bg="gray.900" 
            borderColor="yellow.400" 
            borderWidth="1px" 
            w="100%" 
            borderRadius="lg"
            p={8}
          >
            <form onSubmit={handleLogin}>
              <VStack spacing={6}>
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <FormControl>
                  <FormLabel color="white">Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="gray.800"
                    color="white"
                    borderColor="gray.600"
                    _focus={{ borderColor: 'yellow.400' }}
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color="white">Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="gray.800"
                    color="white"
                    borderColor="gray.600"
                    _focus={{ borderColor: 'yellow.400' }}
                    required
                  />
                </FormControl>

                <Button
                  type="submit"
                  bg="yellow.400"
                  color="black"
                  size="lg"
                  w="100%"
                  isLoading={loading}
                  loadingText="Signing in..."
                  _hover={{ bg: 'yellow.500' }}
                >
                  Sign In
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AdminLogin;
