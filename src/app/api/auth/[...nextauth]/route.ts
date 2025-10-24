import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// });

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      console.log("🆕 New user created:", user);
      await dbConnect();

      // Check if user already exists
      const existingUser = await User.findOne({ email: user.email as string });

      if (!existingUser) {
        // Create a new user on first signup
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
        console.log("🆕 New user created:", user.email);
      } else {
        console.log("👤 Existing user logged in:", user.email);
      }

      return true;
    },

    async session({ session }) {
      await dbConnect();
      const dbUser = await User.findOne({ email: session.user?.email });
      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.role = dbUser.role;
      }
      return session;
    },

    // Handle redirects after login
    async redirect({ url, baseUrl }) {
      // The redirect callback doesn't get session data directly
      // So we’ll just let client-side redirect handle it
      return baseUrl;
    },
    
  },
    pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
