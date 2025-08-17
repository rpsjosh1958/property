import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilterComponent from '../components/SearchFilterComponent';
import Property from '../components/Property';
import noresult from '../assets/images/noresult.svg';
import { getPropertiesByPurpose, transformFirebaseProperty } from '../utils/firebaseService';

const Search = ({ properties }) => {
    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter();

    return (
        <Box>
            <Flex
                cursor="pointer"
                bg="gray.100"
                borderBottom='1px'
                borderColor='gray.200'
                p="2"
                fontWeight='black'
                fontSize='lg'
                justifyContent='center'
                alignItems='center'
                onClick={() => setSearchFilters(!searchFilters)}
            >
                <Text>Search Property By Filters</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />
            </Flex>

            {searchFilters && <SearchFilterComponent />}
            <Text fontSize='2xl' p='4' fontWeight='bold'>
                Properties {router.query.purpose}
            </Text>

            <Flex flexWrap='wrap' justifyContent='center' gap={5}>
                {properties.map((property) => <Property property={property} key={property?.id} />)}
            </Flex>

            {properties.length === 0 && (
                <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
                    <Image src={noresult} alt="No Result" width={400} height={300} />
                    <Text fontSize='xl' marginTop='3'>No Result Found.</Text>
                </Flex>
            )}

        </Box>
    );

};

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    
    try {
        // Fetch properties from Firebase based on purpose
        const properties = await getPropertiesByPurpose(purpose);
        
        return {
            props: {
                properties: properties.map(transformFirebaseProperty),
            },
        };
    } catch (error) {
        console.error('Error fetching properties:', error);
        return {
            props: {
                properties: [],
            },
        };
    }
}

export default Search;