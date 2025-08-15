import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    VStack,
    HStack,
    Button,
    Image,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Flex
} from '@chakra-ui/react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ContactSection = () => {
    const bgColor = 'black';
    const cardBg = useColorModeValue('gray.900', 'gray.800');

    return (
        <Box py={16} bg={bgColor} id="contact">
            <Container maxW="7xl">
                <VStack spacing={12}>
                    {/* Header */}
                    <VStack spacing={4} textAlign="center">
                        <Heading
                            size="2xl"
                            color="white"
                            fontWeight="bold"
                        >
                            Get In Touch
                        </Heading>
                        <Text
                            fontSize="xl"
                            color={useColorModeValue('gray.300', 'gray.400')}
                            maxW="2xl"
                        >
                            Ready to find your dream property or need expert advice? 
                            Contact us today and let&apos;s discuss your property needs.
                        </Text>
                    </VStack>

                    {/* Main Content */}
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} w="100%">
                        {/* Left Side - Image and Contact Info */}
                        <VStack spacing={8} align="stretch">
                            {/* Image */}
                            <Box
                                position="relative"
                                height={{ base: '300px', md: '400px' }}
                                borderRadius="2xl"
                                overflow="hidden"
                                boxShadow="xl"
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Contact us"
                                    objectFit="cover"
                                    w="100%"
                                    h="100%"
                                />
                                <Box
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    right="0"
                                    bottom="0"
                                    bg="blackAlpha.400"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <VStack spacing={2} color="white" textAlign="center">
                                        <Heading size="lg">Let&apos;s Connect</Heading>
                                        <Text fontSize="lg">We&apos;re here to help you</Text>
                                    </VStack>
                                </Box>
                            </Box>

                            {/* Contact Information */}
                            <VStack spacing={6} align="stretch">
                                <Heading size="md" color="white">Contact Information</Heading>
                                
                                <VStack spacing={4} align="stretch">
                                    <HStack spacing={4}>
                                        <Box
                                            p={3}
                                            bg="yellow.100"
                                            borderRadius="full"
                                            color="black"
                                        >
                                            <FiPhone size="20px" />
                                        </Box>
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold" color="white">Phone</Text>
                                            <Text color="gray.300">+44 20 1234 5678</Text>
                                        </VStack>
                                    </HStack>

                                    <HStack spacing={4}>
                                        <Box
                                            p={3}
                                            bg="yellow.100"
                                            borderRadius="full"
                                            color="black"
                                        >
                                            <FiMail size="20px" />
                                        </Box>
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold" color="white">Email</Text>
                                            <Text color="gray.300">info@dmletting.co.uk</Text>
                                        </VStack>
                                    </HStack>

                                    <HStack spacing={4}>
                                        <Box
                                            p={3}
                                            bg="yellow.100"
                                            borderRadius="full"
                                            color="black"
                                        >
                                            <FiMapPin size="20px" />
                                        </Box>
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold" color="white">Office</Text>
                                            <Text color="gray.300">123 Property Street, London, UK</Text>
                                        </VStack>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </VStack>

                        {/* Right Side - Contact Form */}
                        <Box
                            bg={cardBg}
                            p={8}
                            borderRadius="2xl"
                            boxShadow="xl"
                            border="1px"
                            borderColor={useColorModeValue('gray.700', 'gray.600')}
                        >
                            <VStack spacing={6} align="stretch">
                                <VStack spacing={2} textAlign="center">
                                    <Heading size="lg" color="white">
                                        Send us a Message
                                    </Heading>
                                    <Text color="gray.300">
                                        Fill out the form below and we&apos;ll get back to you within 24 hours
                                    </Text>
                                </VStack>

                                <VStack spacing={4} align="stretch">
                                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                        <FormControl>
                                            <FormLabel color="white" fontWeight="medium">First Name</FormLabel>
                                            <Input
                                                placeholder="John"
                                                borderColor="gray.600"
                                                bg="gray.800"
                                                color="white"
                                                _placeholder={{ color: 'gray.400' }}
                                                _focus={{
                                                    borderColor: "yellow.400",
                                                    boxShadow: "0 0 0 1px #F6E05E"
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel color="white" fontWeight="medium">Last Name</FormLabel>
                                            <Input
                                                placeholder="Doe"
                                                borderColor="gray.600"
                                                bg="gray.800"
                                                color="white"
                                                _placeholder={{ color: 'gray.400' }}
                                                _focus={{
                                                    borderColor: "yellow.400",
                                                    boxShadow: "0 0 0 1px #F6E05E"
                                                }}
                                            />
                                        </FormControl>
                                    </SimpleGrid>

                                    <FormControl>
                                        <FormLabel color="white" fontWeight="medium">Email</FormLabel>
                                        <Input
                                            type="email"
                                            placeholder="john.doe@email.com"
                                            borderColor="gray.600"
                                            bg="gray.800"
                                            color="white"
                                            _placeholder={{ color: 'gray.400' }}
                                            _focus={{
                                                borderColor: "yellow.400",
                                                boxShadow: "0 0 0 1px #F6E05E"
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel color="white" fontWeight="medium">Phone</FormLabel>
                                        <Input
                                            type="tel"
                                            placeholder="+44 20 1234 5678"
                                            borderColor="gray.600"
                                            bg="gray.800"
                                            color="white"
                                            _placeholder={{ color: 'gray.400' }}
                                            _focus={{
                                                borderColor: "yellow.400",
                                                boxShadow: "0 0 0 1px #F6E05E"
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel color="white" fontWeight="medium">I&apos;m interested in</FormLabel>
                                        <Select
                                            placeholder="Select an option"
                                            borderColor="gray.600"
                                            bg="gray.800"
                                            color="white"
                                            _focus={{
                                                borderColor: "yellow.400",
                                                boxShadow: "0 0 0 1px #F6E05E"
                                            }}
                                        >
                                            <option value="renting">Renting a Property</option>
                                            <option value="buying">Buying a Property</option>
                                            <option value="selling">Selling a Property</option>
                                            <option value="letting">Property Management</option>
                                            <option value="valuation">Property Valuation</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel color="white" fontWeight="medium">Message</FormLabel>
                                        <Textarea
                                            placeholder="Tell us about your property requirements..."
                                            rows={5}
                                            borderColor="gray.600"
                                            bg="gray.800"
                                            color="white"
                                            _placeholder={{ color: 'gray.400' }}
                                            _focus={{
                                                borderColor: "yellow.400",
                                                boxShadow: "0 0 0 1px #F6E05E"
                                            }}
                                        />
                                    </FormControl>

                                    <Button
                                        size="lg"
                                        bg="yellow.400"
                                        color="black"
                                        _hover={{ 
                                            bg: 'yellow.500',
                                            transform: 'translateY(-2px)',
                                            boxShadow: 'lg'
                                        }}
                                        transition="all 0.3s"
                                        fontWeight="600"
                                        py={6}
                                    >
                                        Send Message
                                    </Button>
                                </VStack>
                            </VStack>
                        </Box>
                    </SimpleGrid>

                   
                </VStack>
            </Container>
        </Box>
    );
};

export default ContactSection;
