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
                recipient_email: email,
            },
        });
        res.send({
            messages,
        });
    } else if (req.method === "POST") {
        const body = JSON.parse(req.body);
        await prisma.message.create({
            data: {
                title: body.title,
                body: body.body,
                sender_email: email,
                recipient_email: body.recipient_email,
                image_hotlink: body.image_hotlink,
                video_hotlink: body.video_hotlink,
            },
        });
        res.send({
            status: "ok",
        });
    } else if (req.method === "DELETE") {
        const body = JSON.parse(req.body);
        await prisma.message.deleteMany({
            where: {
                id: body.id,
            },
        });
        res.send({
            status: "ok",
        });
    }
};
