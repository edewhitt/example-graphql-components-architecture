import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs, resolvers } from "./resolvers";

const server = new ApolloServer({
  introspection: true,
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async req => ({ req }),
});

export { handler as GET, handler as POST };

