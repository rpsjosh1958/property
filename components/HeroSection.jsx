import {
	Container,
	Stack,
	Flex,
	Box,
	Heading,
	Text,
	Button,
	Image,
	Icon,
	IconButton,
	useColorModeValue,
	VStack,
	HStack,
	Badge,
	SimpleGrid,
  } from '@chakra-ui/react';
  import { Link as ScrollLink } from "react-scroll";
  import { AiOutlineArrowRight, AiOutlineHome, AiOutlineStar } from 'react-icons/ai';
  import { FiMapPin, FiUsers, FiTrendingUp } from 'react-icons/fi';
  
  export default function CallToActionWithVideo() {
	const bgGradient = useColorModeValue(
	  'linear(to-br, yellow.50, white, yellow.100)',
	  'linear(to-br, gray.900, gray.800, yellow.900)'
	);

	return (
	  <Box bg={bgGradient} position="relative" overflow="hidden">
		{/* Background Pattern */}
		<Box
		  position="absolute"
		  top="0"
		  left="0"
		  right="0"
		  bottom="0"
		  opacity="0.1"
		  bgImage="radial-gradient(circle at 25px 25px, yellow.500 2px, transparent 0), radial-gradient(circle at 75px 75px, yellow.300 2px, transparent 0)"
		  bgSize="100px 100px"
		/>
		
		<Container maxW={'7xl'} position="relative" zIndex={1}>
		  <Stack
			align={'center'}
			spacing={{ base: 8, md: 12 }}
			py={{ base: 20, md: 28 }}
			direction={{ base: 'column', lg: 'row' }}
		  >
			{/* Left Content */}
			<Stack flex={1} spacing={{ base: 6, md: 8 }} maxW={{ base: 'full', lg: '500px' }}>
			  {/* Badge */}
			  <Badge
				alignSelf="flex-start"
				colorScheme="yellow"
				fontSize="sm"
				px={4}
				py={2}
				borderRadius="full"
				fontWeight="medium"
				bg="yellow.400"
				color="black"
			  >
				Premium Property Platform
			  </Badge>

			  {/* Main Heading */}
			  <VStack align="flex-start" spacing={4}>
				<Heading
				  lineHeight={1.1}
				  fontWeight={700}
				  fontSize={{ base: '4xl', sm: '5xl', lg: '7xl' }}
				  letterSpacing="-0.02em"
				>
				  <Text
					as={'span'}
					bgGradient="linear(to-r, yellow.400, yellow.600)"
					bgClip="text"
				  >
					Discover
				  </Text>{' '}
				  <Text as={'span'}>Your</Text>
				  <br />
				  <Text
					as={'span'}
					position={'relative'}
					_after={{
					  content: "''",
					  width: 'full',
					  height: '4px',
					  position: 'absolute',
					  bottom: 2,
					  left: 0,
					  bg: 'yellow.400',
					  borderRadius: '2px',
					}}
				  >
					Dream Home
				  </Text>
				</Heading>

				<Text 
				  color={useColorModeValue('gray.600', 'gray.300')} 
				  fontSize={{ base: 'lg', md: 'xl' }}
				  lineHeight="1.8"
				  maxW="450px"
				>
				  Choose from over 1 million apartments, houses, condos, and townhomes. 
				  Find your perfect space with our curated property listings.
				</Text>
			  </VStack>

			  {/* Stats */}
			  <SimpleGrid columns={3} spacing={6} w="full" maxW="400px">
				<VStack spacing={1}>
				  <Text fontSize="2xl" fontWeight="bold" color="yellow.500">1M+</Text>
				  <Text fontSize="sm" color="gray.500">Properties</Text>
				</VStack>
				<VStack spacing={1}>
				  <Text fontSize="2xl" fontWeight="bold" color="yellow.500">50K+</Text>
				  <Text fontSize="sm" color="gray.500">Happy Clients</Text>
				</VStack>
				<VStack spacing={1}>
				  <Text fontSize="2xl" fontWeight="bold" color="yellow.500">98%</Text>
				  <Text fontSize="sm" color="gray.500">Satisfaction</Text>
				</VStack>
			  </SimpleGrid>

			  {/* Buttons */}
			  <HStack spacing={4} flexWrap="wrap">
				<ScrollLink
				  activeClass="active"
				  to="rental-section"
				  spy={true}
				  smooth={true}
				  offset={-70}
				  duration={500}
				>
				  <Button
					size={'lg'}
					fontWeight={'600'}
					px={8}
					py={6}
					bg="yellow.400"
					color="black"
					_hover={{ 
					  bg: 'yellow.500', 
					  transform: 'translateY(-2px)',
					  boxShadow: 'xl'
					}}
					transition="all 0.3s"
					borderRadius="xl"
					rightIcon={<AiOutlineArrowRight />}
				  >
					Explore Properties
				  </Button>
				</ScrollLink>
				
				<Button
				  as="a"
				  href="https://github.com/Gojodept/Get-Apartments/tree/main"
				  target="_blank"
				  size={'lg'}
				  fontWeight={'600'}
				  px={8}
				  py={6}
				  variant="outline"
				  borderColor="black"
				  color="black"
				  _hover={{ 
					bg: 'yellow.50',
					transform: 'translateY(-2px)',
					boxShadow: 'lg'
				  }}
				  transition="all 0.3s"
				  borderRadius="xl"
				>
				  How It Works
				</Button>
			  </HStack>
			</Stack>

			{/* Right Content - Image Section */}
			<Flex
			  flex={1}
			  justify={'center'}
			  align={'center'}
			  position={'relative'}
			  w={'full'}
			  minH="500px"
			>
			  {/* Floating Elements */}
			  <Box
				position="absolute"
				top="10%"
				left="10%"
				bg="white"
				p={4}
				borderRadius="xl"
				boxShadow="xl"
				zIndex={2}
			  >
				<HStack spacing={3}>
				  <Box bg="yellow.100" p={2} borderRadius="lg">
					<AiOutlineHome color="black" size="20px" />
				  </Box>
				  <VStack align="start" spacing={0}>
					<Text fontWeight="bold" fontSize="sm">Available Properties</Text>
					<Text color="gray.500" fontSize="xs">2,847 new listings</Text>
				  </VStack>
				</HStack>
			  </Box>

			  <Box
				position="absolute"
				bottom="20%"
				right="10%"
				bg="white"
				p={4}
				borderRadius="xl"
				boxShadow="xl"
				zIndex={2}
			  >
				<HStack spacing={3}>
				  <Box bg="yellow.100" p={2} borderRadius="lg">
					<AiOutlineStar color="black" size="20px" />
				  </Box>
				  <VStack align="start" spacing={0}>
					<Text fontWeight="bold" fontSize="sm">5.0 Rating</Text>
					<Text color="gray.500" fontSize="xs">From 10K+ reviews</Text>
				  </VStack>
				</HStack>
			  </Box>

			  {/* Main Image */}
			  <Box
				position={'relative'}
				height={{ base: '400px', md: '500px' }}
				width={{ base: '90%', md: '80%' }}
				maxW="600px"
				borderRadius={'3xl'}
				overflow={'hidden'}
				boxShadow={'2xl'}
				bg="white"
				p={2}
			  >
				<Box
				  h="full"
				  w="full"
				  borderRadius="2xl"
				  overflow="hidden"
				  position="relative"
				>
				  <Image
					alt={'Modern Property'}
					fit={'cover'}
					align={'center'}
					w={'100%'}
					h={'100%'}
					src={'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'}
				  />
				  
				  {/* Overlay gradient */}
				  <Box
					position="absolute"
					bottom="0"
					left="0"
					right="0"
					h="50%"
					bgGradient="linear(to-t, blackAlpha.600, transparent)"
				  />
				</Box>
			  </Box>

			  {/* Background Blob */}
			  <ModernBlob
				w={'120%'}
				h={'120%'}
				position={'absolute'}
				top={'-10%'}
				left={'-10%'}
				zIndex={-1}
				color={useColorModeValue('yellow.100', 'yellow.800')}
			  />
			</Flex>
		  </Stack>
		</Container>
	  </Box>
	);
  }
  
  export const ModernBlob = (props) => {
	return (
	  <Icon
		width={'100%'}
		viewBox="0 0 578 440"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	  >
		<path
		  fillRule="evenodd"
		  clipRule="evenodd"
		  d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
		  fill="currentColor"
		/>
	  </Icon>
	);
  };
  