import {getServerSession} from "next-auth/next";
import {authOptions} from "./auth/[...nextauth]";
import {default as prisma} from '../../lib/prismadb';

export default async (req: any, res: any) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.send({
            error:
                "You must be signed in to view the protected content on this page.",
        });
        return;
    }
    const email = session.user?.email as string;
    if (req.method === "GET") {
        const messages = await prisma.message.findMany({
            where: {
                sender_email: email,
            },
        });
        res.send({
            messages,
        });
        return;
    }
    throw new Error("Unsupported Method");
};
