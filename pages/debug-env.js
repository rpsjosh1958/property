import { useEffect, useState } from 'react';
import { Box, Container, Heading, Text, VStack, Code, Alert, AlertIcon } from '@chakra-ui/react';

export default function EnvDebug() {
  const [envVars, setEnvVars] = useState({});

  useEffect(() => {
    // Check environment variables on client side
    const vars = {
      'NEXT_PUBLIC_FIREBASE_API_KEY': process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set (hidden)' : 'Missing',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'Missing',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID': process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Missing',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'Missing',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'Missing',
      'NEXT_PUBLIC_FIREBASE_APP_ID': process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? 'Set (hidden)' : 'Missing',
      'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID': process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'Missing'
    };
    setEnvVars(vars);
  }, []);

  const missingVars = Object.entries(envVars).filter(([key, value]) => value === 'Missing');

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading>Environment Variables Debug</Heading>
        
        {missingVars.length > 0 && (
          <Alert status="error">
            <AlertIcon />
            Missing environment variables detected!
          </Alert>
        )}

        <Box>
          <Heading size="md" mb={4}>Firebase Environment Variables Status</Heading>
          <VStack spacing={3} align="stretch">
            {Object.entries(envVars).map(([key, value]) => (
              <Box key={key} p={3} border="1px" borderColor="gray.200" borderRadius="md">
                <Text fontWeight="bold">{key}:</Text>
                <Code colorScheme={value === 'Missing' ? 'red' : 'green'}>
                  {value}
                </Code>
              </Box>
            ))}
          </VStack>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Debug Information</Heading>
          <VStack spacing={2} align="stretch">
            <Text><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</Text>
            <Text><strong>Build Time:</strong> {new Date().toISOString()}</Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export async function getServerSideProps() {
  // Check environment variables on server side
  const serverEnvVars = {
    'NEXT_PUBLIC_FIREBASE_API_KEY': process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Missing',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID': process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : 'Missing',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? 'Set' : 'Missing',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? 'Set' : 'Missing',
    'NEXT_PUBLIC_FIREBASE_APP_ID': process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? 'Set' : 'Missing',
    'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID': process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ? 'Set' : 'Missing'
  };

  console.log('Server-side environment variables check:', serverEnvVars);

  return {
    props: {
      serverEnvVars
    }
  };
}
