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
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useBreakpointValue
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
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
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

    const nextModalImage = () => {
        if (photos && photos.length > 0) {
            setModalImageIndex((prev) => (prev + 1) % photos.length);
        }
    };

    const prevModalImage = () => {
        if (photos && photos.length > 0) {
            setModalImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
        }
    };

    const openImageModal = (index = currentImageIndex) => {
        setModalImageIndex(index);
        onOpen();
    };

    return (
    <Container maxW="7xl" py={{ base: 4, md: 8 }} px={{ base: 4, md: 8 }}>
        {/* Hero Image Section */}
        <Box mb={{ base: 6, md: 8 }}>
            {photos && photos.length > 0 ? (
                <Box 
                    position="relative" 
                    borderRadius="lg" 
                    overflow="hidden" 
                    height={{ base: "250px", md: "400px", lg: "500px" }}
                    cursor="pointer"
                    onClick={() => openImageModal()}
                    _hover={{ opacity: 0.95 }}
                    transition="opacity 0.2s"
                >
                    <Image
                        src={photos[currentImageIndex].url}
                        alt={`Property image ${currentImageIndex + 1}`}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                    />
                    
                    {/* Click to view indicator */}
                    <Box
                        position="absolute"
                        top="4"
                        left="4"
                        bg="blackAlpha.700"
                        color="white"
                        px="3"
                        py="1"
                        borderRadius="full"
                        fontSize="sm"
                        fontWeight="medium"
                        display={{ base: "block", md: "none" }}
                    >
                        Tap to view full image
                    </Box>
                    
                    {/* Navigation arrows for multiple images */}
                    {hasMultipleImages && (
                        <>
                            <IconButton
                                icon={<FaChevronLeft />}
                                position="absolute"
                                left="4"
                                top="50%"
                                transform="translateY(-50%)"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                                bg="blackAlpha.600"
                                color="white"
                                _hover={{ bg: "blackAlpha.800" }}
                                borderRadius="full"
                                size="lg"
                                aria-label="Previous image"
                                zIndex={2}
                            />
                            <IconButton
                                icon={<FaChevronRight />}
                                position="absolute"
                                right="4"
                                top="50%"
                                transform="translateY(-50%)"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                bg="blackAlpha.600"
                                color="white"
                                _hover={{ bg: "blackAlpha.800" }}
                                borderRadius="full"
                                size="lg"
                                aria-label="Next image"
                                zIndex={2}
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
                            display={{ base: "none", md: "flex" }}
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(index);
                                    }}
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
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={{ base: 6, md: 8 }}>
            {/* Left Column - Main Details */}
            <GridItem>
                {/* Property Header */}
                <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
                    {/* Title and Price */}
                    <Box>
                        <HStack mb={3} flexWrap="wrap" gap={2}>
                            <Badge 
                                colorScheme="yellow" 
                                bg="yellow.400" 
                                color="black" 
                                px={3} 
                                py={1} 
                                borderRadius="full"
                                textTransform="capitalize"
                                fontSize={{ base: "xs", md: "sm" }}
                            >
                                {purpose?.replace('-', ' ')}
                            </Badge>
                            {isVerified && (
                                <HStack color="green.500">
                                    <GoVerified />
                                    <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium">Verified</Text>
                                </HStack>
                            )}
                        </HStack>
                        <Heading size={{ base: "lg", md: "xl" }} mb={2} color="gray.800" lineHeight="shorter">
                            {title}
                        </Heading>
                        {locationText && (
                            <HStack color="gray.600" mb={4}>
                                <Icon as={FaMapMarkerAlt} />
                                <Text fontSize={{ base: "sm", md: "md" }}>{locationText}</Text>
                            </HStack>
                        )}
                        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="yellow.600">
                            £{price?.toLocaleString()}
                            {rentFrequency && <Text as="span" fontSize={{ base: "md", md: "lg" }} color="gray.600">/{rentFrequency}</Text>}
                        </Text>
                    </Box>

                    {/* Key Features */}
                    <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
                        <Heading size={{ base: "sm", md: "md" }} mb={4}>Property Features</Heading>
                            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 4, md: 6 }}>
                                <VStack spacing={2}>
                                    <Icon as={FaBed} boxSize={{ base: 5, md: 6 }} color="yellow.500" />
                                    <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>{rooms}</Text>
                                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" textAlign="center">Bedrooms</Text>
                                </VStack>
                                <VStack spacing={2}>
                                    <Icon as={FaBath} boxSize={{ base: 5, md: 6 }} color="yellow.500" />
                                    <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>{baths}</Text>
                                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" textAlign="center">Bathrooms</Text>
                                </VStack>
                                <VStack spacing={2}>
                                    <Icon as={BsGridFill} boxSize={{ base: 5, md: 6 }} color="yellow.500" />
                                    <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>{area ? millify(area) : 'N/A'}</Text>
                                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" textAlign="center">Sq Ft</Text>
                                </VStack>
                                <VStack spacing={2}>
                                    <Icon as={MdApartment} boxSize={{ base: 5, md: 6 }} color="yellow.500" />
                                    <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} textTransform="capitalize">{type}</Text>
                                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" textAlign="center">Type</Text>
                                </VStack>
                            </SimpleGrid>
                    </Box>

                    {/* Description */}
                    {description && (
                        <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
                            <Heading size={{ base: "sm", md: "md" }} mb={4}>Description</Heading>
                            <Text lineHeight="tall" color="gray.700" fontSize={{ base: "sm", md: "md" }}>
                                {description}
                            </Text>
                        </Box>
                    )}

                    {/* Amenities */}
                    {amenities && amenities.length > 0 && (
                        <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
                            <Heading size={{ base: "sm", md: "md" }} mb={4}>Amenities & Features</Heading>
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={3}>
                                {amenities.map((amenity, index) => (
                                    <HStack key={index} p={3} bg="yellow.50" borderRadius="md" border="1px" borderColor="yellow.200">
                                        <Box w={2} h={2} bg="yellow.500" borderRadius="full" flexShrink={0} />
                                        <Text fontWeight="medium" color="gray.700" fontSize={{ base: "sm", md: "md" }}>{amenity}</Text>
                                    </HStack>
                                ))}
                            </SimpleGrid>
                        </Box>
                    )}
                </VStack>
            </GridItem>

            {/* Right Column - Property Info & Agent */}
            <GridItem>
                <VStack spacing={{ base: 4, md: 6 }}>
                    {/* Property Details Card */}
                    <Box w="full" bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
                        <Heading size={{ base: "sm", md: "md" }} mb={4}>Property Details</Heading>
                            <VStack spacing={4} align="stretch">
                                <Flex justify="space-between" py={2} borderBottom="1px" borderColor="gray.100">
                                    <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>Property Type</Text>
                                    <Text fontWeight="medium" textTransform="capitalize" fontSize={{ base: "sm", md: "md" }}>{type}</Text>
                                </Flex>
                                <Flex justify="space-between" py={2} borderBottom="1px" borderColor="gray.100">
                                    <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>Purpose</Text>
                                    <Text fontWeight="medium" textTransform="capitalize" fontSize={{ base: "sm", md: "md" }}>{purpose?.replace('-', ' ')}</Text>
                                </Flex>
                                {furnishingStatus && (
                                    <Flex justify="space-between" py={2} borderBottom="1px" borderColor="gray.100">
                                        <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>Furnishing</Text>
                                        <Text fontWeight="medium" textTransform="capitalize" fontSize={{ base: "sm", md: "md" }}>{furnishingStatus}</Text>
                                    </Flex>
                                )}
                            </VStack>
                    </Box>

                    {/* Agent/Agency Card */}
                    {agency && (
                        <Box w="full" bg="white" p={{ base: 4, md: 6 }} borderRadius="lg" shadow="md" border="1px" borderColor="gray.200">
                            <Heading size={{ base: "sm", md: "md" }} mb={4}>Listed By</Heading>
                            <HStack spacing={4}>
                                <Avatar 
                                    size={{ base: "md", md: "lg" }} 
                                    src={agency.logo?.url} 
                                    name={agency.name}
                                    bg="yellow.500"
                                />
                                <VStack align="start" spacing={1}>
                                    <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>{agency.name}</Text>
                                    <Text color="gray.600" fontSize={{ base: "xs", md: "sm" }}>Properties Agency</Text>
                                </VStack>
                            </HStack>
                        </Box>
                    )}

                    {/* Contact Card */}
                    <Box w="full" bg="yellow.50" border="2px" borderColor="yellow.200" p={{ base: 4, md: 6 }} borderRadius="lg" shadow="md">
                        <Heading size={{ base: "sm", md: "md" }} mb={4} color="yellow.800">Interested?</Heading>
                        <Text color="yellow.700" mb={4} fontSize={{ base: "sm", md: "md" }}>
                            Contact us for more information about this property or to schedule a viewing.
                        </Text>
                        <VStack spacing={3}>
                            <Box 
                                as="button" 
                                w="full" 
                                p={{ base: 3, md: 4 }}
                                bg="yellow.500" 
                                color="white" 
                                borderRadius="md" 
                                fontWeight="bold"
                                fontSize={{ base: "sm", md: "md" }}
                                _hover={{ bg: "yellow.600" }}
                                _active={{ transform: "scale(0.98)" }}
                                transition="all 0.2s"
                            >
                                Contact Agent
                            </Box>
                            <Box 
                                as="button" 
                                w="full" 
                                p={{ base: 3, md: 4 }}
                                bg="white" 
                                color="yellow.600" 
                                border="2px" 
                                borderColor="yellow.500" 
                                borderRadius="md" 
                                fontWeight="bold"
                                fontSize={{ base: "sm", md: "md" }}
                                _hover={{ bg: "yellow.50" }}
                                _active={{ transform: "scale(0.98)" }}
                                transition="all 0.2s"
                            >
                                Schedule Viewing
                            </Box>
                        </VStack>
                    </Box>
                </VStack>
            </GridItem>
        </Grid>

        {/* Image Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay bg="blackAlpha.800" />
            <ModalContent bg="black" m={0}>
                <ModalCloseButton
                    color="white"
                    size="lg"
                    bg="blackAlpha.600"
                    _hover={{ bg: "blackAlpha.800" }}
                    zIndex={10}
                />
                <ModalBody p={0} display="flex" alignItems="center" justifyContent="center" position="relative">
                    {photos && photos.length > 0 && (
                        <>
                            <Image
                                src={photos[modalImageIndex].url}
                                alt={`Property image ${modalImageIndex + 1}`}
                                maxH="100vh"
                                maxW="100vw"
                                objectFit="contain"
                            />
                            
                            {/* Navigation arrows for modal */}
                            {hasMultipleImages && (
                                <>
                                    <IconButton
                                        icon={<FaChevronLeft />}
                                        position="absolute"
                                        left={{ base: "2", md: "4" }}
                                        top="50%"
                                        transform="translateY(-50%)"
                                        onClick={prevModalImage}
                                        bg="blackAlpha.600"
                                        color="white"
                                        _hover={{ bg: "blackAlpha.800" }}
                                        borderRadius="full"
                                        size={{ base: "md", md: "lg" }}
                                        aria-label="Previous image"
                                        zIndex={5}
                                    />
                                    <IconButton
                                        icon={<FaChevronRight />}
                                        position="absolute"
                                        right={{ base: "2", md: "4" }}
                                        top="50%"
                                        transform="translateY(-50%)"
                                        onClick={nextModalImage}
                                        bg="blackAlpha.600"
                                        color="white"
                                        _hover={{ bg: "blackAlpha.800" }}
                                        borderRadius="full"
                                        size={{ base: "md", md: "lg" }}
                                        aria-label="Next image"
                                        zIndex={5}
                                    />
                                </>
                            )}

                            {/* Image counter for modal */}
                            {hasMultipleImages && (
                                <Box
                                    position="absolute"
                                    bottom={{ base: "4", md: "8" }}
                                    left="50%"
                                    transform="translateX(-50%)"
                                    bg="blackAlpha.700"
                                    color="white"
                                    px="4"
                                    py="2"
                                    borderRadius="full"
                                    fontSize="sm"
                                    fontWeight="medium"
                                    zIndex={5}
                                >
                                    {modalImageIndex + 1} of {photos.length}
                                </Box>
                            )}
                        </>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
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
