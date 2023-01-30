import {useEffect, useState} from 'react';
import {Button, Card, CardBody, CardHeader, Text, VStack,} from '@chakra-ui/react';
import {useRouter} from 'next/router';

export function SentPattiMessages() {
    const [messages, setMessages] = useState<any>([]);

    const router = useRouter();

    useEffect(() => {
        fetch('/api/sentMessages')
            .then((response) => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then((data) => setMessages(data.messages));
    }, []);

    async function deleteMessage(id: string) {
        await fetch('/api/messages', {
            method: 'DELETE',
            body: JSON.stringify({
                id,
            }),
        });
        router.reload();
    }

    return (
        <VStack>
            {messages.map((m: any) => (
                <Card key={m.id}>
                    <CardHeader>
                        <Text as="b">{m.title}</Text>
                        <Text as="h6">
                            {"to "}
                            {m.recipient_email}
                        </Text>
                    </CardHeader>
                    <CardBody>
                        <Text>{m.body}</Text>
                    </CardBody>
                    <Button
                        colorScheme="red"
                        variant="solid"
                        onClick={async () => {
                            await deleteMessage(m.id);
                        }}
                    >
                        Delete
                    </Button>
                </Card>
            ))}
        </VStack>
    );
}
