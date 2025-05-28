import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"


export const authOptions: NextAuthOptions = {
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
        strategy: "jwt",
        maxAge: 30*60,
        updateAge: 5 * 60,
    },
    jwt:{
        maxAge: 30*60,
    }

}