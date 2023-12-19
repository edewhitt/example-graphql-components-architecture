import { mergeTypeDefs } from "@graphql-tools/merge";
import merge from "lodash.merge";

import usersDefinition from "./users";

const typeDefs = mergeTypeDefs([
  usersDefinition.typeDefs,
]);

const resolvers = merge([
  usersDefinition.resolvers,
]);

export { typeDefs, resolvers };