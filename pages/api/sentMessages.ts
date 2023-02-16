import {getServerSession} from "next-auth/next";
import {authOptions} from "./auth/[...nextauth]";
import {default as prisma} from '../../lib/prismadb';
import {getUserFromRequest} from "../../prisma/utils";

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
    if (user === null) {
        res.status = 404;
        res.send();
        return;
    }
    if (req.method === "GET") {
        const messages = await prisma.message.findMany({
            where: {
                sender_id: user.id,
            },
            include: {
                recipient: true
            }
        });
        res.send({
            messages,
        });
        return;
    }
    throw new Error("Unsupported Method");
};
