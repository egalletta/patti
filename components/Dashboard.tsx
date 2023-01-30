import {Box, SimpleGrid} from '@chakra-ui/react';
import {PattiMessages} from './PattiMessages';
import {Weather} from './Weather';

export function Dashboard() {
    return (
        <SimpleGrid columns={2}>
            <PattiMessages/>
            <Box>
                <Weather/>
            </Box>
        </SimpleGrid>
    );
}
