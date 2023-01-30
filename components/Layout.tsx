import type {ReactNode} from 'react';
import {Box} from '@chakra-ui/react';
import Header from './Header';

export default function Layout({children}: { children: ReactNode }) {
    return (
        <Box >
            <Header />
            <main style={{marginLeft: "2rem", marginRight: "2rem"}}>{children}</main>
        </Box>
    );
}
