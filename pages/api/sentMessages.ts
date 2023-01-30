import {getServerSession} from "next-auth/next";
import {PrismaClient} from "@prisma/client";
import {authOptions} from "./auth/[...nextauth]";

export default async (req: any, res: any) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.send({
            error:
                "You must be signed in to view the protected content on this page.",
        });
        return;
    }
    const prisma = new PrismaClient();
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
