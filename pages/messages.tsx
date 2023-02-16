import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Input,
    SimpleGrid,
    Textarea,
} from "@chakra-ui/react";
import {ReactElement, useState} from "react";
import {useRouter} from "next/router";
import {SentPattiMessages} from "../components/SentPattiMessages";
import Layout from "../components/Layout";

export default function Messages() {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [recipient, setRecipient] = useState<string>("");
    const [status, setStatus] = useState<ReactElement>(<></>);

    async function createMessage() {
        const res = await fetch("/api/messages", {
            method: "POST",
            body: JSON.stringify({
                recipient_email: recipient,
                title,
                body,
            }),
        });
        if (res.status !== 200) {
            setStatus(<Alert status='error'>
                <AlertIcon />
                User does not exist.
            </Alert>);
        } else {
            setStatus(<Alert status='success'>
                <AlertIcon />
                Message Saved.
            </Alert>);
        }
    }

    return (
        <Layout>
            <SimpleGrid columns={2}>
                <Box>
                    <Heading size="md" as="b">
                        New Message
                    </Heading>
                    <Divider/>
                    {status}
                    <br/>
                    <form>
                        <FormControl>
                            <FormLabel>Recipient Email</FormLabel>
                            <Input
                                type="email"
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input onChange={(e) => setTitle(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Body</FormLabel>
                            <Textarea onChange={(e) => setBody(e.target.value)}/>
                        </FormControl>
                        <Button colorScheme="teal" variant="solid" onClick={createMessage}>
                            Submit
                        </Button>
                    </form>
                </Box>
                <SentPattiMessages/>
                <br/>
            </SimpleGrid>
        </Layout>
    );
}
