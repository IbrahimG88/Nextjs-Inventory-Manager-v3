import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

let dev = process.env.NODE_ENV !== "production";
let { DEV_URL, PROD_URL } = process.env;

export default NextAuth({
  // Configure one or more authentication providers
  // secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        return { email: user.email };
      },
    }),
    /*
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: 587,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    */
    // ...add more providers here
  ],
  pages: {
    signIn: `${dev ? DEV_URL : PROD_URL}/`,
    signOut: `${dev ? DEV_URL : PROD_URL}/`,
  },
  // adapter: MongoDBAdapter(clientPromise),
});
