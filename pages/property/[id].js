import { 
  Box, 
  Avatar, 
  Flex, 
  Spacer, 
  Text, 
  Container,
  Grid,
  GridItem,
  Badge,
  Divider,
  VStack,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Heading,
  IconButton
} from '@chakra-ui/react';
import { useState } from 'react';
import millify from 'millify';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { transformFirebaseProperty } from '../../utils/firebaseService';
import { GoVerified } from 'react-icons/go';
import { FaBath, FaBed, FaMapMarkerAlt, FaHome, FaCouch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { MdApartment } from 'react-icons/md';

const PropertyDetails = ({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos, location } }) => {
    // Handle location - it might be an array or string
    const locationText = Array.isArray(location) && location.length > 0 
        ? location[0].name 
        : (typeof location === 'string' ? location : null);

    // Image gallery state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const hasMultipleImages = photos && photos.length > 1;

    const nextImage = () => {
        if (photos && photos.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % photos.length);
        }
    };

    const prevImage = () => {
        if (photos && photos.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
        }
    };

    return (
    <Container maxW="7xl" py={8}>
        {/* Hero Image Section */}
        <Box mb={8}>
            {photos && photos.length > 0 ? (
                <Box position="relative" borderRadius="lg" overflow="hidden" height="700px">
                    <Image
                        src={photos[currentImageIndex].url}
                        alt={`Property image ${currentImageIndex + 1}`}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                    />
                    
                    {/* Navigation arrows for multiple images */}
                    {hasMultipleImages && (
                        <>
                            <IconButton
                                icon={<FaChevronLeft />}
                                position="absolute"
                                left="4"
                                top="50%"
                                transform="translateY(-50%)"
                                onClick={prevImage}
                                bg="blackAlpha.600"
                                color="white"
                                _hover={{ bg: "blackAlpha.800" }}
                                borderRadius="full"
                                size="lg"
                                aria-label="Previous image"
                            />
                            <IconButton
                                icon={<FaChevronRight />}
                                position="absolute"
                                right="4"
                                top="50%"
                                transform="translateY(-50%)"
                                onClick={nextImage}
                                bg="blackAlpha.600"
                                color="white"
                                _hover={{ bg: "blackAlpha.800" }}
                                borderRadius="full"
                                size="lg"
                                aria-label="Next image"
                            />
                        </>
                    )}

                    {/* Image counter */}
                    {hasMultipleImages && (
                        <Box
                            position="absolute"
                            top="4"
                            right="4"
                            bg="blackAlpha.700"
                            color="white"
                            px="3"
                            py="1"
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="medium"
                        >
                            {currentImageIndex + 1} / {photos.length}
                        </Box>
                    )}

                    {/* Thumbnail strip for multiple images */}
                    {hasMultipleImages && (
                        <HStack
                            position="absolute"
                            bottom="4"
                            left="50%"
                            transform="translateX(-50%)"
                            spacing="2"
                            bg="blackAlpha.600"
                            borderRadius="full"
                            px="4"
                            py="2"
                            maxW="90%"
                            overflowX="auto"
                        >
                            {photos.map((photo, index) => (
                                <Box
                                    key={index}
                                    width="40px"
                                    height="40px"
                                    borderRadius="md"
                                    overflow="hidden"
                                    cursor="pointer"
                                    border={index === currentImageIndex ? "2px solid" : "2px solid transparent"}
                                    borderColor={index === currentImageIndex ? "yellow.400" : "transparent"}
                                    onClick={() => setCurrentImageIndex(index)}
                                    flexShrink={0}
                                >
                                    <Image
                                        src={photo.url}
                                        alt={`Thumbnail ${index + 1}`}
                                        width="100%"
                                        height="100%"
                                        objectFit="cover"
                                    />
                                </Box>
                            ))}
                        </HStack>
                    )}
                </Box>
            ) : (
                <Box 
                    h="400px" 
                    bg="gray.200" 
                    borderRadius="lg" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    <Text color="gray.500" fontSize="lg">No images available</Text>
                </Box>
            )}
        </Box>

        {/* Main Content Grid */}
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
            {/* Left Column - Main Details */}
            <GridItem>
                {/* Property Header */}
                <VStack align="stretch" spacing={6}>
                    {/* Title and Price */}
                    <Box>
                        <HStack mb={3}>
                            <Badge 
                                colorScheme="yellow" 
                                bg="yellow.400" 
                                color="black" 
                                px={3} 
                                py={1} 
                                borderRadius="full"
                                textTransform="capitalize"
                            >
                                {purpose?.replace('-', ' ')}
                            </Badge>
                            {isVerified && (
                                <HStack color="green.500">
                                    <GoVerified />
                                    <Text fontSize="sm" fontWeight="medium">Verified</Text>
                                </HStack>
                            )}
                        </HStack>
                        <Heading size="xl" mb={2} color="gray.800">
                            {title}
                        </Heading>
                        {locationText && (
                            <HStack color="gray.600" mb={4}>
                                <Icon as={FaMapMarkerAlt} />
                                <Text>{locationText}</Text>
                            </HStack>
                        )}
                        <Text fontSize="3xl" fontWeight="bold" color="yellow.600">
                            £{price?.toLocaleString()}
                            {rentFrequency && <Text as="span" fontSize="lg" color="gray.600">/{rentFrequency}</Text>}
                        </Text>
                    </Box>

                    {/* Key Features */}
                    <Box bg="white" p={6} borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
                        <Heading size="md" mb={4}>Property Features</Heading>
                            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
                                <VStack>
                                    <Icon as={FaBed} boxSize={6} color="yellow.500" />
                                    <Text fontWeight="bold">{rooms}</Text>
                                    <Text fontSize="sm" color="gray.600">Bedrooms</Text>
                                </VStack>
                                <VStack>
                                    <Icon as={FaBath} boxSize={6} color="yellow.500" />
                                    <Text fontWeight="bold">{baths}</Text>
                                    <Text fontSize="sm" color="gray.600">Bathrooms</Text>
                                </VStack>
                                <VStack>
                                    <Icon as={BsGridFill} boxSize={6} color="yellow.500" />
                                    <Text fontWeight="bold">{area ? millify(area) : 'N/A'}</Text>
                                    <Text fontSize="sm" color="gray.600">Sq Ft</Text>
                                </VStack>
                                <VStack>
                                    <Icon as={MdApartment} boxSize={6} color="yellow.500" />
                                    <Text fontWeight="bold" textTransform="capitalize">{type}</Text>
                                    <Text fontSize="sm" color="gray.600">Type</Text>
                                </VStack>
                            </SimpleGrid>
                    </Box>

                    {/* Description */}
                    {description && (
                        <Box bg="white" p={6} borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
                            <Heading size="md" mb={4}>Description</Heading>
                            <Text lineHeight="tall" color="gray.700">
                                {description}
                            </Text>
                        </Box>
                    )}

                    {/* Amenities */}
                    {amenities && amenities.length > 0 && (
                        <Box bg="white" p={6} borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
                            <Heading size="md" mb={4}>Amenities & Features</Heading>
                            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
                                {amenities.map((amenity, index) => (
                                    <HStack key={index} p={3} bg="yellow.50" borderRadius="md" border="1px" borderColor="yellow.200">
                                        <Box w={2} h={2} bg="yellow.500" borderRadius="full" />
                                        <Text fontWeight="medium" color="gray.700">{amenity}</Text>
                                    </HStack>
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}
                </VStack>
            </GridItem>

            {/* Right Column - Property Info & Agent */}
            <GridItem>
                <VStack spacing={6}>
                    {/* Property Details Card */}
                    <Box w="full" bg="white" p={6} borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
                        <Heading size="md" mb={4}>Property Details</Heading>
                            <VStack spacing={4} align="stretch">
                                <Flex justify="space-between" py={2} borderBottom="1px" borderColor="gray.100">
                                    <Text color="gray.600">Property Type</Text>
                                    <Text fontWeight="medium" textTransform="capitalize">{type}</Text>
                                </Flex>
                                <Flex justify="space-between" py={2} borderBottom="1px" borderColor="gray.100">
                                    <Text color="gray.600">Purpose</Text>
                                    <Text fontWeight="medium" textTransform="capitalize">{purpose?.replace('-', ' ')}</Text>
                                </Flex>
                                {furnishingStatus && (
                                    <Flex justify="space-between" py={2} borderBottom="1px" borderColor="gray.100">
                                        <Text color="gray.600">Furnishing</Text>
                                        <Text fontWeight="medium" textTransform="capitalize">{furnishingStatus}</Text>
                                    </Flex>
                                )}
                            </VStack>
                    </Box>

                    {/* Agent/Agency Card */}
                    {agency && (
                        <Box w="full" bg="white" p={6} borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
                            <Heading size="md" mb={4}>Listed By</Heading>
                            <HStack spacing={4}>
                                <Avatar 
                                    size="lg" 
                                    src={agency.logo?.url} 
                                    name={agency.name}
                                    bg="yellow.500"
                                />
                                <VStack align="start" spacing={1}>
                                    <Text fontWeight="bold" fontSize="lg">{agency.name}</Text>
                                    <Text color="gray.600" fontSize="sm">Properties Agency</Text>
                                </VStack>
                            </HStack>
                        </Box>
                    )}

                    {/* Contact Card */}
                    <Box w="full" bg="yellow.50" border="2px" borderColor="yellow.200" p={6} borderRadius="lg" shadow="md">
                        <Heading size="md" mb={4} color="yellow.800">Interested?</Heading>
                        <Text color="yellow.700" mb={4}>
                            Contact us for more information about this property or to schedule a viewing.
                        </Text>
                        <VStack spacing={3}>
                            <Box 
                                as="button" 
                                w="full" 
                                p={3} 
                                bg="yellow.500" 
                                color="white" 
                                borderRadius="md" 
                                fontWeight="bold"
                                _hover={{ bg: "yellow.600" }}
                            >
                                Contact Agent
                            </Box>
                            <Box 
                                as="button" 
                                w="full" 
                                p={3} 
                                bg="white" 
                                color="yellow.600" 
                                border="2px" 
                                borderColor="yellow.500" 
                                borderRadius="md" 
                                fontWeight="bold"
                                _hover={{ bg: "yellow.50" }}
                            >
                                Schedule Viewing
                            </Box>
                        </VStack>
                    </Box>
                </VStack>
            </GridItem>
        </Grid>
    </Container>
);};


export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
    try {
        // Fetch property from Firebase by document ID
        const propertyDoc = await getDoc(doc(db, 'properties', id));
        
        if (!propertyDoc.exists()) {
            return {
                notFound: true,
            };
        }
        
        const propertyData = {
            id: propertyDoc.id,
            ...propertyDoc.data()
        };
        
        // Transform Firebase data to match component expectations
        const transformedProperty = transformFirebaseProperty(propertyData);
        
        return {
            props: {
                propertyDetails: transformedProperty
            }
        };
    } catch (error) {
        console.error('Error fetching property:', error);
        return {
            notFound: true,
        };
    }
};
