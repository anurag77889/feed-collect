import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authConfig: NextAuthOptions = {
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        })
    ],
    pages:{
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: "jwt"
    }

}

const handler = NextAuth(authConfig);
export {handler as GET, handler as POST}