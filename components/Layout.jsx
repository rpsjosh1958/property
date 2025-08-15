import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>D&M Letting CO Ltd |  Property solutions tailored for property owners, real estate agents, and tenants.</title>
            </Head>
            <Box>
                <header>
                    <Navbar />
                </header>
                <Box as="main" pt="80px">
                    {children}
                </Box>
                <footer>
                    <Footer />
                </footer>
            </Box>
        </>
    );
}