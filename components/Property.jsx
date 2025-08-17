import { Box, Text, Badge, Flex } from '@chakra-ui/layout';
import { StarIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

const Property = ({ property: { id, coverPhoto, photos, rooms, isVerified, title, baths, score_l1, price, randBoostScore, rentFrequency, externalID } }) => {
    // Use Firebase document ID for the link, fall back to externalID for compatibility
    const propertyId = id || externalID;
    
    // Get the first photo from either coverPhoto or photos array
    const imageUrl = coverPhoto?.url || (photos && photos.length > 0 ? photos[0]?.url : null);
    
    return (
        <Link href={`/property/${propertyId}`} passHref >
            <Box
                bg="white"
                _dark={{ bg: "gray.800" }}
                maxW="sm"
                borderWidth="1px"
                roundedTop="md"
                padding={23}
                shadow="lg"
                style={{ cursor: 'pointer' }}
                _hover={{ transform: 'scale(1.02)' }}
            >
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt='property'
                        roundedTop="lg"
                        width="100%"
                        height="200px"
                        objectFit="cover"
                    />
                )}

            <Box p="6">
                <Box display="flex" alignItems="baseline">
                    <Badge rounded="full" px="2" colorScheme="yellow" bg="yellow.400" color="black">
                        New
                    </Badge>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                    >
                        <Flex alignItems='center' justifyContent='center'>
                            {rooms} Rooms &bull; {baths} baths &nbsp;
                            <Box color='green.400'>{isVerified && <GoVerified />}</Box>
                        </Flex>
                    </Box>
                </Box>

                <Text
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                >
                    £
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {rentFrequency && `/${rentFrequency}`}
                </Text>

                <Box>
                    {title}
                </Box>

                <Box display="flex" mt="2" alignItems="center">
                    {Array(5)
                        .fill("")
                        .map((_, i) => (
                            < StarIcon
                                key={i}
                                color={i < (randBoostScore / 100) ? "yellow.500" : "gray.300"}
                            />
                        ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {score_l1} reviews
                    </Box>
                </Box>
            </Box>
        </Box>
    </Link>
    );
};

export default Property;