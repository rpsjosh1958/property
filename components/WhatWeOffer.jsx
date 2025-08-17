import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    VStack,
    Button,
    Image,
    useColorModeValue,
    Stack,
    Flex
} from '@chakra-ui/react';
import { FaHome, FaUsers, FaHandshake } from 'react-icons/fa';

const ServiceCard = ({ title, description, imageSrc, icon: Icon, buttonText, buttonLink }) => {
    const cardBg = useColorModeValue('white', 'gray.800');
    const cardShadow = useColorModeValue('lg', 'dark-lg');

    return (
        <Box
            bg={cardBg}
            shadow={cardShadow}
            rounded="xl"
            p={6}
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
            _hover={{ transform: 'translateY(-4px)', transition: 'all 0.3s' }}
        >
            <VStack spacing={4} align="start">
                <Box>
                    <Flex align="center" mb={4}>
                        <Box
                            p={3}
                            bg="yellow.100"
                            rounded="full"
                            color="black"
                            mr={3}
                        >
                            <Icon size="24px" />
                        </Box>
                        <Heading size="lg" color="black">
                            {title}
                        </Heading>
                    </Flex>
                    
                    <Image
                        src={imageSrc}
                        alt={title}
                        rounded="lg"
                        w="100%"
                        h="200px"
                        objectFit="cover"
                        mb={4}
                    />
                    
                    <Text color={useColorModeValue('gray.600', 'gray.300')} lineHeight="tall">
                        {description}
                    </Text>
                </Box>
                
                <Button
                    bg="yellow.400"
                    color="black"
                    _hover={{ bg: 'yellow.500' }}
                    rounded="full"
                    px={6}
                    onClick={() => window.open(buttonLink, '_blank')}
                >
                    {buttonText}
                </Button>
            </VStack>
        </Box>
    );
};

const WhatWeOffer = () => {
    const services = [
        {
            title: "For Property Owners",
            description: "We guarantee your rental income for 3-5 years! Enjoy the benefits of working with us - guaranteed rent for up to 5 years, 52 weeks of the year, absolutely zero fees, and long-term lets. Let us handle everything while you receive consistent returns on your investment.",
            imageSrc: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            icon: FaHome,
            buttonText: "Learn More",
            buttonLink: "#"
        },
        {
            title: "For Real Estate Agents", 
            description: "We&apos;re constantly looking to work alongside experienced agents. We can take on multiple properties and offer your clients all the benefits of long-term guaranteed rent. This partnership works great for everyone involved - agents, landlords, and tenants alike.",
            imageSrc: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            icon: FaHandshake,
            buttonText: "Partner With Us",
            buttonLink: "#"
        },
        {
            title: "For Tenants",
            description: "We believe that working professionals deserve a home, not just a house. We understand you no longer want to live in student-style accommodation. Find quality properties with professional management, transparent pricing, and excellent customer service.",
            imageSrc: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            icon: FaUsers,
            buttonText: "Find Your Home",
            buttonLink: "#"
        }
    ];

    return (
        <Box py={16} bg={useColorModeValue('gray.50', 'gray.900')}>
            <Container maxW="7xl">
                <VStack spacing={12}>
                    {/* Header Section */}
                    <VStack spacing={4} textAlign="center">
                        <Heading
                            size="2xl"
                            color="black"
                            fontWeight="bold"
                        >
                            What We Offer
                        </Heading>
                        <Text
                            fontSize="xl"
                            color={useColorModeValue('gray.600', 'gray.400')}
                            maxW="2xl"
                        >
                            Comprehensive property solutions tailored for property owners, real estate agents, and tenants. 
                            We&apos;re here to make property management and finding your perfect home effortless.
                        </Text>
                    </VStack>

                    {/* Services Grid */}
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </SimpleGrid>

                    {/* Call to Action */}
                    <Box textAlign="center" pt={8}>
                        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} justify="center">
                            <Button
                                size="lg"
                                bg="yellow.400"
                                color="black"
                                _hover={{ bg: 'yellow.500' }}
                                rounded="full"
                                px={8}
                            >
                                Book Consultation
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                borderColor="black"
                                color="black"
                                _hover={{ bg: 'yellow.50' }}
                                rounded="full"
                                px={8}
                            >
                                Contact Us
                            </Button>
                        </Stack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default WhatWeOffer;
