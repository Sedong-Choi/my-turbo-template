import NextAuth, { CredentialsSignin, User, type NextAuthConfig } from "next-auth"
import "next-auth/jwt"
import type { Provider } from "next-auth/providers"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/prisma"
import passage from "next-auth/providers/passage"
import { NextRequest, NextResponse } from "next/server"

// TODO fix ater auth.js(next-auth)'s {Credentials} return "throw error" or "null" is working
class CustomCredentialsSignin extends CredentialsSignin {
  constructor(type: string, message?: string) {
    super(message)
    this.code = "custom_error";
    this.name = "CustomCredentialsSignin"

    if (message) {
      this.message = message
      return;
    }
    switch (type) {
      case "user":
        this.message = "User not found"
        break;
      case "password":
        this.message = "Password is incorrect"
        break;
      default:
        this.message = "Invalid credentials"
        break;
    }
  }
}

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

const providers: Provider[] = [
  Google,
  GitHub,
  /*
    Warning: Credentials provider is return 'error=Configuration', when user is null or throw error 
    Cannot handle this error 

    ::caution 
    Credentials provider is not support session.strategy: "database". only support session.strategy: "jwt"
  */
  /* Credentials({
    credentials: {
      email: { label: "Email", type: "email", placeholder: "enter user email" },
      password: { label: "Password", type: "password" }
    },
    authorize: async (credentials, request) => {
      console.log( request);
      const { email, password } = credentials as { email: string; password: string };

      let user = null;
      // logic to salt and hash password
      // const pwHash = saltAndHashPassword(password)
      const prismaUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!prismaUser) {
        throw new CustomCredentialsSignin("user");
      }

      if (prismaUser?.password !== password) {
        throw new CustomCredentialsSignin("password");
      }

      user = {
        name: prismaUser.name,
        email: prismaUser.email,
        id: prismaUser.id,
        image: prismaUser.image,
      }
      return user as User
    },
  }) */

]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

const authOptions: NextAuthConfig = {
  providers,
  pages: {
    signIn: "/login",
    error: "/login?error=custom",
  },
  adapter: PrismaAdapter(prisma),
  // If you use adapter, you don't need to use session and cookies
  // session: {
  //   strategy: "database"
  // },
  // cookies: {
  //   sessionToken: {
  //     name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
  //       domain: VERCEL_DEPLOYMENT
  //         ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  //         : undefined,
  //       secure: VERCEL_DEPLOYMENT,
  //     },
  //   },
  // },
  callbacks: {
    session: async ({ session, token, user }) => {
      session.user = {
        ...session.user,
      };
      return session;
    },
    signIn: async ({ user ,account, profile, credentials }) => {
      if (user) {
        return true;
      }
      return false;
    },

  },
  // debug: process.env.NODE_ENV !== "production" ? true : false,
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
}
export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth(authOptions)
