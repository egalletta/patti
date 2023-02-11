import {default as prisma} from '../lib/prismadb';
import {User} from "@prisma/client";
import {getToken} from "next-auth/jwt";
import {NextApiRequest} from "next";

export async function getUserFromRequest(req: NextApiRequest): Promise<User> {
    const token = await getToken({ req })
    console.log('token', token)
    const user =  prisma.user.findFirst({
        where: {
            id: token?.sub
        }
    });
    if (user === null) {
        throw new Error("User not found");
    }
    return user as unknown as User;
}

export async function getUserFromEmail(email: string): Promise<User|null> {
    return prisma.user.findFirst({
        where: {
            email
        }
    })
}