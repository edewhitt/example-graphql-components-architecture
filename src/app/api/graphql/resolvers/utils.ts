import { DocumentNode } from "graphql"

export type ResolverDefinition = {
  typeDefs: DocumentNode;
  resolvers: any;
};