import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Badge,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Switch,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast
} from '@chakra-ui/react';
import { FiEdit, FiTrash2, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { useAdmin } from '../../hooks/useAdmin';
import PropertyForm from '../../components/admin/PropertyForm';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [deleteProperty, setDeleteProperty] = useState(null);
  const { user, isAdmin, loading: authLoading } = useAdmin();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const fetchProperties = useCallback(async () => {
    try {
      // For admin dashboard, we want to fetch ALL properties (visible and hidden)
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const propertiesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(propertiesData);
      console.log('Fetched properties:', propertiesData); // Debug log
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: 'Error',
        description: `Failed to fetch properties: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchProperties();
    }
  }, [user, isAdmin, fetchProperties]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);
    onOpen();
  };

  const handleAdd = () => {
    setSelectedProperty(null);
    onOpen();
  };

  const handleDelete = (property) => {
    setDeleteProperty(property);
    onDeleteOpen();
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'properties', deleteProperty.id));
      await fetchProperties();
      onDeleteClose();
      toast({
        title: 'Success',
        description: 'Property deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete property',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toggleVisibility = async (propertyId, currentVisibility) => {
    try {
      await updateDoc(doc(db, 'properties', propertyId), {
        isVisible: !currentVisibility
      });
      await fetchProperties();
      toast({
        title: 'Success',
        description: `Property ${!currentVisibility ? 'shown' : 'hidden'} successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating property visibility:', error);
      toast({
        title: 'Error',
        description: 'Failed to update property visibility',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (authLoading || loading) {
    return (
      <Box minH="100vh" bg="black" display="flex" alignItems="center" justifyContent="center">
        <Heading color="white">Loading...</Heading>
      </Box>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <Box minH="100vh" bg="black" py={8}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <HStack justify="space-between">
            <Heading color="white" size="xl">
              Property Management Dashboard
            </Heading>
            <HStack>
              <Button
                leftIcon={<FiPlus />}
                bg="yellow.400"
                color="black"
                onClick={handleAdd}
                _hover={{ bg: 'yellow.500' }}
              >
                Add Property
              </Button>
              <Button
                variant="outline"
                borderColor="gray.600"
                color="white"
                onClick={handleLogout}
                _hover={{ bg: 'gray.800' }}
              >
                Logout
              </Button>
            </HStack>
          </HStack>

          {/* Properties Table */}
          <Box bg="gray.900" borderRadius="lg" overflow="hidden">
            <Table variant="simple">
              <Thead bg="gray.800">
                <Tr>
                  <Th color="white">Image</Th>
                  <Th color="white">Title</Th>
                  <Th color="white">Price</Th>
                  <Th color="white">Type</Th>
                  <Th color="white">Status</Th>
                  <Th color="white">Visible</Th>
                  <Th color="white">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {properties.map((property) => (
                  <Tr key={property.id}>
                    <Td>
                      {property.images && property.images.length > 0 ? (
                        <Image
                          src={property.images[0]}
                          alt={property.title}
                          boxSize="60px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      ) : (
                        <Box bg="gray.700" boxSize="60px" borderRadius="md" />
                      )}
                    </Td>
                    <Td color="white" maxW="200px">
                      <Text isTruncated>{property.title}</Text>
                    </Td>
                    <Td color="white">
                      £{property.price?.toLocaleString()}
                    </Td>
                    <Td>
                      <Badge colorScheme={property.purpose === 'for-sale' ? 'green' : 'blue'}>
                        {property.purpose === 'for-sale' ? 'Sale' : 'Rent'}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge colorScheme={property.isVisible ? 'green' : 'red'}>
                        {property.isVisible ? 'Live' : 'Hidden'}
                      </Badge>
                    </Td>
                    <Td>
                      <Switch
                        isChecked={property.isVisible}
                        onChange={() => toggleVisibility(property.id, property.isVisible)}
                        colorScheme="yellow"
                      />
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FiEdit />}
                          size="sm"
                          bg="yellow.400"
                          color="black"
                          onClick={() => handleEdit(property)}
                          _hover={{ bg: 'yellow.500' }}
                        />
                        <IconButton
                          icon={<FiTrash2 />}
                          size="sm"
                          bg="red.500"
                          color="white"
                          onClick={() => handleDelete(property)}
                          _hover={{ bg: 'red.600' }}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {properties.length === 0 && (
            <Box textAlign="center" py={16}>
              <Heading color="gray.400" size="md" mb={4}>
                No properties found
              </Heading>
              <Text color="gray.500">
                Click &quot;Add Property&quot; to create your first property listing
              </Text>
            </Box>
          )}
        </VStack>
      </Container>

      {/* Property Form Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent bg="gray.900" borderColor="yellow.400" borderWidth="1px">
          <ModalHeader color="white">
            {selectedProperty ? 'Edit Property' : 'Add New Property'}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <PropertyForm
              property={selectedProperty}
              onClose={onClose}
              onSuccess={fetchProperties}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.900" borderColor="red.500" borderWidth="1px">
            <AlertDialogHeader color="white">Delete Property</AlertDialogHeader>
            <AlertDialogBody color="white">
              Are you sure you want to delete &quot;{deleteProperty?.title}&quot;? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onDeleteClose} mr={3}>
                Cancel
              </Button>
              <Button bg="red.500" color="white" onClick={confirmDelete} _hover={{ bg: 'red.600' }}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AdminDashboard;
