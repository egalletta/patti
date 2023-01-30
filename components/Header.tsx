import {Box, Button, Flex, Stack, Text, useColorMode, useColorModeValue, useDisclosure,} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import Router from "next/router";
import {signIn, signOut, useSession} from "next-auth/react";


export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {data: session} = useSession();
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} marginBottom={'2rem'}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box><Text as={'b'}> patti </Text></Box>
                    <Button onClick={() => {Router.push("/dashboard")}}> Home </Button>
                    <Button onClick={() => {Router.push("/messages")}}> Send Messages </Button>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            {session ? <Button onClick={async () => {await signOut()}}>Sign Out</Button> : <Button onClick={async () => {await signIn()}}>Sign In</Button>}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
