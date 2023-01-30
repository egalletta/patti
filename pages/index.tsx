import {signIn, useSession} from "next-auth/react";
import {Link} from "@chakra-ui/react";
import Layout from "../components/Layout";
import Router from 'next/router'

export default function Index() {

    const {data: session} = useSession();

    if (session) {
        Router.push("/dashboard");
    }

    return (
        <Layout>
            <p>
                Welcome to patti. Please{" "}
                <Link
                    color="teal.500"
                    onClick={async () => {
                        signIn(undefined, { callbackUrl: '/dashboard' });
                    }}
                >
                    {" "}
                    sign in{" "}
                </Link>{" "}
                to continue.
            </p>
        </Layout>
    );
}