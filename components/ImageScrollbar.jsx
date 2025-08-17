import { useState } from 'react';
import { Box, IconButton, Flex, HStack, Image } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ImageScrollbar({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!data || data.length === 0) {
        return null;
    }

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <Box position="relative" width="100%" height="400px" borderRadius="lg" overflow="hidden">
            {/* Main Image */}
            <Image
                src={data[currentIndex].url}
                alt={`Property image ${currentIndex + 1}`}
                width="100%"
                height="100%"
                objectFit="cover"
                borderRadius="lg"
            />

            {/* Navigation Arrows */}
            {data.length > 1 && (
                <>
                    <IconButton
                        icon={<FaChevronLeft />}
                        position="absolute"
                        left="4"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={goToPrevious}
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
                        onClick={goToNext}
                        bg="blackAlpha.600"
                        color="white"
                        _hover={{ bg: "blackAlpha.800" }}
                        borderRadius="full"
                        size="lg"
                        aria-label="Next image"
                    />
                </>
            )}

            {/* Dots Indicator */}
            {data.length > 1 && (
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
                >
                    {data.map((_, index) => (
                        <Box
                            key={index}
                            width="8px"
                            height="8px"
                            borderRadius="full"
                            bg={index === currentIndex ? "yellow.400" : "whiteAlpha.600"}
                            cursor="pointer"
                            onClick={() => goToSlide(index)}
                            transition="all 0.2s"
                            _hover={{ bg: index === currentIndex ? "yellow.500" : "whiteAlpha.800" }}
                        />
                    ))}
                </HStack>
            )}

            {/* Image Counter */}
            {data.length > 1 && (
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
                    {currentIndex + 1} / {data.length}
                </Box>
            )}
        </Box>
    );
}