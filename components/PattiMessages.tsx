import {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader, Heading, Text, VStack,} from '@chakra-ui/react';

export function PattiMessages() {
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {
        fetch('/api/messages')
            .then((response) => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then((data) => setMessages(data.messages));
    }, []);

    return (
        <VStack>
            {messages.map((m: any) => (
                <Card key={m.id}>
                    <CardHeader>
                        <Heading as="h5">{m.title}</Heading>
                        <Text as="h6">
                            {"from "}
                            {m.sender.email}
                        </Text>
                    </CardHeader>
                    <CardBody>
                        <Text>{m.body}</Text>
                    </CardBody>
                </Card>
            ))}
        </VStack>
    );
}
