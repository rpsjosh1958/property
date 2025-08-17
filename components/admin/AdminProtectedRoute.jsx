import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading } from '@chakra-ui/react';
import { useAdmin } from '../hooks/useAdmin';

const AdminProtectedRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <Box minH="100vh" bg="black" display="flex" alignItems="center" justifyContent="center">
        <Heading color="white">Loading...</Heading>
      </Box>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return children;
};

export default AdminProtectedRoute;
