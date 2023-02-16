import {getServerSession} from "next-auth/next";
import {authOptions} from "./auth/[...nextauth]";
import {default as prisma} from '../../lib/prismadb';
import {getUserFromEmail, getUserFromRequest} from "../../prisma/utils";

export default async (req: any, res: any) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.send({
            error:
                "You must be signed in to view the protected content on this page.",
        });
        return;
    }
    const user = await getUserFromRequest(req);
    if (req.method === "GET") {

        const messages = await prisma.message.findMany({
            where: {
                recipient_id: user.id,
            },
            include: {
                sender: true
            }
        });
        console.log("messages", messages)
        res.send({
            messages,
        });
    } else if (req.method === "POST") {
        const body = JSON.parse(req.body);
        const recipient = await getUserFromEmail(body.recipient_email);
        if (recipient === null) {
            res.status(404);
            res.send({
                error: "Recipient does not exist!"
            });
            return
        }
        await prisma.message.create({
            data: {
                title: body.title,
                body: body.body,
                sender_id: user.id,
                recipient_id: recipient.id,
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
