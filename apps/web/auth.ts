import NextAuth from "next-auth"
import "next-auth/jwt"
import type { Provider } from "next-auth/providers"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

import Credentials from "next-auth/providers/credentials"
import { getUserInfo } from "@repo/ui/Utils"
const providers: Provider[] = [
  Google,
  GitHub,
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials, request) => { // Update the type of the authorize function
      try {
        let user = null
        // Get the user info from the credentials
        const { email, password } = credentials as { email: string; password: string }
        // // logic to salt and hash password
        // const pwHash = saltAndHashPassword(password)

        // // logic to verify if user exists
        user = getUserInfo(email, password)

        if (!user) {
          throw new Error("User not found.")
        }
        console.log("user!! at auth credentials", user);
        // return json object with the user data
        return user
      } catch (error) {
        // if (error instanceof ZodError) {
        //   // Return `null` to indicate that the credentials are invalid
        //   return null
        // }
      }
    },

  }),
]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})
const config = {
  providers,
  pages: {
    signIn: "/login",
    signUp: "/sign-up",
  },
  session: {
    cookie: {
      domain: 'localhost',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  callbacks: {
    jwt({ token, user }: { token: any, user: any }) {
      if (user) { // User is available during sign-in
        token.id = user.id!
      }
      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      console.log("session", session);
      return session
    },
    // signIn: async ({user, account, profile}) => {
    //   return Promise.resolve('/')  // 로그인 후 리디렉션할 경로를 여기에 설정하세요.
    // },
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
}
export const {
  handlers,
  signIn,
  signOut,
  auth
} = NextAuth(config)
