import Link from 'next/link';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer, HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex={1000}
            bg={isScrolled ? 'black' : 'white'}
            borderBottom="1px"
            borderColor={isScrolled ? 'yellow.400' : 'gray.100'}
            backdropFilter="blur(10px)"
            transition="all 0.3s ease"
            boxShadow={isScrolled ? 'lg' : 'none'}
        >
            <Flex p="4" align="center" maxW="7xl" mx="auto">
                <Box 
                    fontSize='3xl' 
                    color={isScrolled ? 'yellow.400' : 'black'} 
                    fontWeight='bold'
                    transition="color 0.3s ease"
                >
                    <Link href="/" paddingLeft='2'>D&M</Link>
                </Box>
                <Spacer />
                
                {/* Desktop Navigation */}
                {!isMobile && (
                    <HStack spacing={8} align="center">
                        <Link href='/' passHref>
                            <Box 
                                cursor="pointer" 
                                _hover={{ color: isScrolled ? 'yellow.300' : 'yellow.500' }} 
                                color={isScrolled ? 'white' : 'black'}
                                transition="color 0.3s ease"
                            >
                                <Text fontWeight="medium">Home</Text>
                            </Box>
                        </Link>
                        <Link href='/search' passHref>
                            <Box 
                                cursor="pointer" 
                                _hover={{ color: isScrolled ? 'yellow.300' : 'yellow.500' }} 
                                color={isScrolled ? 'white' : 'black'}
                                transition="color 0.3s ease"
                            >
                                <Text fontWeight="medium">Search</Text>
                            </Box>
                        </Link>
                        <Link href='/search?purpose=for-sale' passHref>
                            <Box 
                                cursor="pointer" 
                                _hover={{ color: isScrolled ? 'yellow.300' : 'yellow.500' }} 
                                color={isScrolled ? 'white' : 'black'}
                                transition="color 0.3s ease"
                            >
                                <Text fontWeight="medium">Buy Property</Text>
                            </Box>
                        </Link>
                        <Link href='/search?purpose=for-rent' passHref>
                            <Box 
                                cursor="pointer" 
                                _hover={{ color: isScrolled ? 'yellow.300' : 'yellow.500' }} 
                                color={isScrolled ? 'white' : 'black'}
                                transition="color 0.3s ease"
                            >
                                <Text fontWeight="medium">Rent Property</Text>
                            </Box>
                        </Link>
                    </HStack>
                )}

                {/* Mobile Navigation */}
                {isMobile && (
                    <Box>
                        <Menu>
                            <MenuButton 
                                as={IconButton} 
                                icon={<FcMenu />} 
                                variant='outline' 
                                color={isScrolled ? 'yellow.400' : 'black'}
                                borderColor={isScrolled ? 'yellow.400' : 'black'}
                                _hover={{ bg: isScrolled ? 'yellow.400' : 'yellow.50' }}
                                transition="all 0.3s ease"
                            />
                            <MenuList bg={isScrolled ? 'black' : 'white'} borderColor={isScrolled ? 'yellow.400' : 'gray.200'}>
                                <Link href='/' passHref>
                                    <MenuItem 
                                        color={isScrolled ? 'white' : 'black'}
                                        _hover={{ bg: isScrolled ? 'yellow.600' : 'gray.100' }}
                                    >
                                        Home
                                    </MenuItem>
                                </Link>
                                <Link href='/search' passHref>
                                    <MenuItem 
                                        color={isScrolled ? 'white' : 'black'}
                                        _hover={{ bg: isScrolled ? 'yellow.600' : 'gray.100' }}
                                    >
                                        Search
                                    </MenuItem>
                                </Link>
                                <Link href='/search?purpose=for-sale' passHref>
                                    <MenuItem 
                                        color={isScrolled ? 'white' : 'black'}
                                        _hover={{ bg: isScrolled ? 'yellow.600' : 'gray.100' }}
                                    >
                                        Buy Property
                                    </MenuItem>
                                </Link>
                                <Link href='/search?purpose=for-rent' passHref>
                                    <MenuItem 
                                        color={isScrolled ? 'white' : 'black'}
                                        _hover={{ bg: isScrolled ? 'yellow.600' : 'gray.100' }}
                                    >
                                        Rent Property
                                    </MenuItem>
                                </Link>
                            </MenuList>
                        </Menu>
                    </Box>
                )}
            </Flex>
        </Box>
    );
};

export default Navbar;