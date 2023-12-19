import gql from "graphql-tag";
import { faker } from '@faker-js/faker';
import { ResolverDefinition } from "./utils";

type User = {
  id: string;
  account: UserFinance;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  occupation: string;
  transactions: UserTransaction[];
  username: string;
};

type UserFinance = {
  accountName: string;
  accountNumber: string;
  balance: string;
}

type UserTransaction = {
  amount: string;
  date: string;
  description: string;
  type: string;
};

const typeDefs = gql`
  type UserFinance {
    accountName: String!
    accountNumber: String!
    balance: Float!
  }

  type UserTransaction {
    amount: Float!
    date: String!
    description: String!
    type: String!
  }

  type User {
    id: ID!
    account: UserFinance
    avatar: String
    email: String!
    firstName: String!
    lastName: String!
    occupation: String!
    transactions: [UserTransaction]
    username: String!
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

const buildUser = (): User => ({
  id: faker.string.uuid(),
  account: {
    accountName: faker.finance.accountName(),
    accountNumber: faker.finance.accountNumber(),
    balance: faker.finance.amount(),
  },
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  occupation: faker.person.jobTitle(),
  transactions: buildTransactions(Math.floor(Math.random() * 5)),
  username: faker.internet.userName(),
});

const buildTransactions = (count: number) => {
  const transactions: UserTransaction[] = [];

  for (let i = 0; i < count; i++) {
    transactions.push(buildTransaction());
  }

  return transactions;
};

const buildTransaction = (): UserTransaction => ({
  amount: faker.finance.amount(),
  date: faker.date.recent().toISOString(),
  description: faker.finance.transactionDescription(),
  type: faker.finance.transactionType(),
});