import { useState, useEffect } from 'react';
import {
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  SimpleGrid,
  Box,
  Image,
  IconButton,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  CheckboxGroup,
  Stack,
  useToast
} from '@chakra-ui/react';
import { FiTrash2, FiUpload } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';

const PropertyForm = ({ property, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    purpose: 'for-rent',
    location: '',
    rooms: 1,
    baths: 1,
    area: 0,
    type: 'apartment',
    isVisible: true,
    amenities: [],
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const toast = useToast();

  const amenitiesList = [
    'Balcony', 'Gym', 'Parking', 'Pool', 'Garden', 'Security',
    'Elevator', 'Furnished', 'Pet Friendly', 'Air Conditioning',
    'Heating', 'Internet', 'Laundry', 'Dishwasher'
  ];

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        description: property.description || '',
        price: property.price || 0,
        purpose: property.purpose || 'for-rent',
        location: property.location || '',
        rooms: property.rooms || 1,
        baths: property.baths || 1,
        area: property.area || 0,
        type: property.type || 'apartment',
        isVisible: property.isVisible ?? true,
        amenities: property.amenities || [],
        images: property.images || []
      });
    }
  }, [property]);

  const onDrop = (acceptedFiles) => {
    setUploadedImages(prev => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  const removeImage = (index, isUploaded = false) => {
    if (isUploaded) {
      setUploadedImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const uploadImages = async () => {
    const uploadPromises = uploadedImages.map(async (file) => {
      const fileName = `${Date.now()}_${file.name}`;
      const imageRef = ref(storage, `properties/${fileName}`);
      await uploadBytes(imageRef, file);
      return getDownloadURL(imageRef);
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let allImages = [...formData.images];
      
      if (uploadedImages.length > 0) {
        const newImageUrls = await uploadImages();
        allImages = [...allImages, ...newImageUrls];
      }

      const propertyData = {
        ...formData,
        // Ensure rooms and baths are valid numbers
        rooms: formData.rooms || 1,
        baths: formData.baths || 1,
        // Ensure price and area are valid numbers
        price: formData.price || 0,
        area: formData.area || 0,
        images: allImages,
        updatedAt: new Date().toISOString()
      };

      if (property) {
        // Update existing property
        await updateDoc(doc(db, 'properties', property.id), propertyData);
        toast({
          title: 'Success',
          description: 'Property updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Create new property
        propertyData.createdAt = new Date().toISOString();
        await addDoc(collection(db, 'properties'), propertyData);
        toast({
          title: 'Success',
          description: 'Property created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving property:', error);
      toast({
        title: 'Error',
        description: 'Failed to save property',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        {/* Basic Information */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl isRequired>
            <FormLabel color="white">Title</FormLabel>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              bg="gray.800"
              color="white"
              borderColor="gray.600"
              _focus={{ borderColor: 'yellow.400' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="white">Price (£)</FormLabel>
            <NumberInput
              value={formData.price}
              onChange={(valueString, valueNumber) => 
                setFormData(prev => ({ ...prev, price: valueNumber || '' }))
              }
              min={0}
            >
              <NumberInputField
                bg="gray.800"
                color="white"
                borderColor="gray.600"
                _focus={{ borderColor: 'yellow.400' }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper color="white" />
                <NumberDecrementStepper color="white" />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </SimpleGrid>

        <FormControl isRequired>
          <FormLabel color="white">Description</FormLabel>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            bg="gray.800"
            color="white"
            borderColor="gray.600"
            _focus={{ borderColor: 'yellow.400' }}
            
          />
        </FormControl>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <FormControl isRequired>
            <FormLabel color="white">Purpose</FormLabel>
            <Select
              value={formData.purpose}
              onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
              bg="gray.800"
              color="white"
              borderColor="gray.600"
              _focus={{ borderColor: 'yellow.400' }}
            >
              <option value="for-rent">For Rent</option>
              <option value="for-sale">For Sale</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="white">Property Type</FormLabel>
            <Select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              bg="gray.800"
              color="white"
              borderColor="gray.600"
              _focus={{ borderColor: 'yellow.400' }}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
              <option value="penthouse">Penthouse</option>
              <option value="villa">Villa</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="white">Location</FormLabel>
            <Input
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              bg="gray.800"
              color="white"
              borderColor="gray.600"
              _focus={{ borderColor: 'yellow.400' }}
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <FormControl isRequired>
            <FormLabel color="white">Rooms</FormLabel>
            <NumberInput
              value={formData.rooms}
              onChange={(valueString, valueNumber) => 
                setFormData(prev => ({ ...prev, rooms: valueNumber || '' }))
              }
              min={1}
              max={20}
            >
              <NumberInputField
                bg="gray.800"
                color="white"
                borderColor="gray.600"
                _focus={{ borderColor: 'yellow.400' }}
              />
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="white">Bathrooms</FormLabel>
            <NumberInput
              value={formData.baths}
              onChange={(valueString, valueNumber) => 
                setFormData(prev => ({ ...prev, baths: valueNumber || '' }))
              }
              min={1}
              max={10}
            >
              <NumberInputField
                bg="gray.800"
                color="white"
                borderColor="gray.600"
                _focus={{ borderColor: 'yellow.400' }}
              />
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="white">Area (sq ft)</FormLabel>
            <NumberInput
              value={formData.area}
              onChange={(valueString, valueNumber) => 
                setFormData(prev => ({ ...prev, area: valueNumber || '' }))
              }
              min={0}
            >
              <NumberInputField
                bg="gray.800"
                color="white"
                borderColor="gray.600"
                _focus={{ borderColor: 'yellow.400' }}
              />
            </NumberInput>
          </FormControl>
        </SimpleGrid>

        {/* Amenities */}
        <FormControl>
          <FormLabel color="white">Amenities</FormLabel>
          <CheckboxGroup
            value={formData.amenities}
            onChange={(values) => setFormData(prev => ({ ...prev, amenities: values }))}
          >
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={2}>
              {amenitiesList.map((amenity) => (
                <Checkbox key={amenity} value={amenity} color="white" colorScheme="yellow">
                  {amenity}
                </Checkbox>
              ))}
            </SimpleGrid>
          </CheckboxGroup>
        </FormControl>

        {/* Image Upload */}
        <FormControl>
          <FormLabel color="white">Images</FormLabel>
          
          {/* Existing Images */}
          {formData.images.length > 0 && (
            <Box mb={4}>
              <Text color="gray.400" mb={2}>Current Images:</Text>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                {formData.images.map((url, index) => (
                  <Box key={index} position="relative">
                    <Image src={url} alt={`Property ${index + 1}`} borderRadius="md" />
                    <IconButton
                      icon={<FiTrash2 />}
                      size="sm"
                      position="absolute"
                      top={2}
                      right={2}
                      bg="red.500"
                      color="white"
                      onClick={() => removeImage(index, false)}
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}

          {/* New Images Preview */}
          {uploadedImages.length > 0 && (
            <Box mb={4}>
              <Text color="gray.400" mb={2}>New Images:</Text>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                {uploadedImages.map((file, index) => (
                  <Box key={index} position="relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`New ${index + 1}`}
                      borderRadius="md"
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      size="sm"
                      position="absolute"
                      top={2}
                      right={2}
                      bg="red.500"
                      color="white"
                      onClick={() => removeImage(index, true)}
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}

          {/* Upload Area */}
          <Box
            {...getRootProps()}
            border="2px dashed"
            borderColor={isDragActive ? 'yellow.400' : 'gray.600'}
            borderRadius="md"
            p={8}
            textAlign="center"
            cursor="pointer"
            bg={isDragActive ? 'gray.800' : 'gray.900'}
            transition="all 0.2s"
          >
            <input {...getInputProps()} />
            <VStack spacing={2}>
              <FiUpload size="24px" color="white" />
              <Text color="white">
                {isDragActive
                  ? "Drop the images here..."
                  : "Drag & drop images here, or click to select"
                }
              </Text>
              <Text color="gray.400" fontSize="sm">
                Supports JPG, PNG, WebP files
              </Text>
            </VStack>
          </Box>
        </FormControl>

        {/* Form Actions */}
        <HStack spacing={4} pt={4}>
          <Button
            type="submit"
            bg="yellow.400"
            color="black"
            size="lg"
            isLoading={loading}
            loadingText={property ? "Updating..." : "Creating..."}
            _hover={{ bg: 'yellow.500' }}
            flex={1}
          >
            {property ? 'Update Property' : 'Create Property'}
          </Button>
          <Button
            variant="outline"
            borderColor="gray.600"
            color="white"
            size="lg"
            onClick={onClose}
            _hover={{ bg: 'gray.800' }}
          >
            Cancel
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default PropertyForm;
