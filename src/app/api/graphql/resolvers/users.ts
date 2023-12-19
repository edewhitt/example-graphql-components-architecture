import gql from "graphql-tag";
import { faker } from '@faker-js/faker';
import { ResolverDefinition } from "./utils";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    users(limit: Int): [User]!
  }
`;

const resolvers = {
  Query: {
    users: async (_: unknown, { limit }: { limit: number }) => {
      return buildUsers(limit);
    },
  },
};

const definition: ResolverDefinition = {
  typeDefs,
  resolvers,
};

export default definition;

const buildUsers = (count: number) => {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    users.push(buildUser());
  }

  return users;
}

const buildUser = () => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
});