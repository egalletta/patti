import {SessionProvider} from "next-auth/react";

import type {AppProps} from "next/app";
import type {Session} from "next-auth";
import {ChakraProvider} from "@chakra-ui/provider";

import {extendTheme} from "@chakra-ui/react";

const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
    },
};

const theme = extendTheme({colors});

export default function App({
                                Component,
                                pageProps: {session, ...pageProps},
                            }: AppProps<{ session: Session }>) {
    return (
        <ChakraProvider theme={theme}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ChakraProvider>
    );
}
