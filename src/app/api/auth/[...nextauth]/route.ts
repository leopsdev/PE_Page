import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "E-mail", type: "email", placeholder: "admin@programa.com" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        // Usando o Mock combinado para garantir performance e visual sem delays
        if (credentials?.email === "admin@programa.com" && credentials?.password === "senha123") {
          return { id: "1", name: "Administrador", email: "admin@programa.com" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "programaeficiencia-secret-123",
  pages: {
    signIn: '/', 
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
