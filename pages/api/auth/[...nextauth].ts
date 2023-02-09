import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"

// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    theme: {
        colorScheme: "light",
    },
    adapter: PrismaAdapter(prisma),
    // which is used to look up the session in the database.
    session: {
        strategy: "jwt",
    }
};

export default NextAuth(authOptions);
