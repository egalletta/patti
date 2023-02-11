import {useEffect, useState} from 'react';
import {Button, Card, CardBody, CardHeader, Text, VStack,} from '@chakra-ui/react';

export function SentPattiMessages() {
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {
        fetch('/api/sentMessages')
            .then((response) => response.json())
            .then((data) => setMessages(data.messages));
    });

    async function deleteMessage(id: string) {
        await fetch('/api/messages', {
            method: 'DELETE',
            body: JSON.stringify({
                id,
            }),
        });
    }

    return (
        <VStack>
            {messages.map((m: any) => (
                <Card key={m.id}>
                    <CardHeader>
                        <Text as="b">{m.title}</Text>
                        <Text as="h6">
                            {"to "}
                            {m.recipient.email}
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
