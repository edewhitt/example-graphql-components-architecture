/* eslint-disable @next/next/no-img-element */
"use client";

import gql from "graphql-tag";
import UserComponent, { User, UserComponentFragment } from "./user";

export const UserWithAvatarFragment = gql`
  ${UserComponentFragment}

  fragment UserWithAvatarFragment on User {
    ...UserComponentFragment
    avatar
    email
    username
  }
`;

export type UserWithAvatar = User & {
  avatar: string;
};

type UserCardComponentInput = {
  user: UserWithAvatar;
};

const UserCardComponent = ({ user }: UserCardComponentInput) => (
  <div className="card shadow-sm">
    <img className="card-image-top" src={user.avatar} alt={user.id} />
    <div className="card-body">
      <UserComponent user={user} />
    </div>
  </div>
);

export default UserCardComponent;