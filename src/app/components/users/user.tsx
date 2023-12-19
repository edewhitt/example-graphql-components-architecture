"use client";

import gql from "graphql-tag";

export const UserComponentFragment = gql`
  fragment UserComponentFragment on User {
    id
    firstName
    lastName
    occupation
  }
`;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  occupation: string;
};

type UserComponentInput = {
  user: User;
};

const UserComponent = ({ user }: UserComponentInput) => (
  <div className="p-4">
    <h2>{user.firstName} {user.lastName}</h2>
    <small><em>{user.occupation}</em></small>
  </div>
);

export default UserComponent;