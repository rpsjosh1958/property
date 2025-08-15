import { Flex, Box, Heading, Text, Container, VStack, useColorModeValue } from '@chakra-ui/react';
import Property from '../components/Property';
import { sampleProperties } from '../utils/sampleData';
import HeroSection from '../components/HeroSection';
import CardSection from '../components/CardSection';
import Banner from '../components/Banner';
import WhatWeOffer from '../components/WhatWeOffer';
import ContactSection from '../components/ContactSection';

const details = [
  {
    id: 1,
    title: 'Renting Made Simple',
    description: 'Browse the highest quality listings, apply online, sign your lease, and even pay your rent from any device.',
    imgUrl: 'https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'
  },
];

const Home = ({ propertiesForSale, propertiesForRent }) => (
  <Box>
    <HeroSection />

    {details.map((item) => (
      <CardSection key={item.id} item={item} inverted={item.id % 2 == 0 && true} />
    ))}

    <WhatWeOffer />

    {/* Main Properties Section Header */}
    <Container maxW={'7xl'} py={16}>
      <VStack spacing={4} textAlign="center">
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
        >
          <Text
            as={'span'}
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: '30%',
              position: 'absolute',
              bottom: 1,
              left: 0,
					  bg: 'yellow.400',
              zIndex: -1,
            }}
          >
            Choose Your,
          </Text>
          <br />
			  <Text as={'span'} color={'black'}>
            Home
          </Text>
        </Heading>
        <Text color={'gray.500'} fontSize="xl">
          Browse our carefully curated selection of premium properties for rent and sale.
        </Text>
      </VStack>
    </Container>

    <Container maxW='container.xl' py={10}>

      <Flex flexWrap='wrap' justifyContent='center' gap={5}>
        {propertiesForRent.map((property) => <Property property={property} key={property.id} renting={true} />)}
      </Flex>
    </Container>

    <Container maxW='container.xl' py={10}>
      <Flex flexWrap='wrap' justifyContent='center' gap={5}>
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </Container>

    <ContactSection />
  </Box>
);

export async function getStaticProps() {
  // Using sample data instead of API calls
  return {
    props: {
      propertiesForSale: sampleProperties.propertiesForSale,
      propertiesForRent: sampleProperties.propertiesForRent,
    },
  };
}

export default Home;