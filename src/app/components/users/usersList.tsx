"use client";

import gql from "graphql-tag";
// import UserComponent, { UserComponentFragment, User } from "./user";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import UserFinanceView, { UserWithFinances, UserWithFinancesFragment } from "./userFinanceView";
import UserCard, { UserWithAvatar, UserWithAvatarFragment } from "./userCard";

const GET_USERS_QUERY = gql`
  ${UserWithFinancesFragment}

  query GetUsersList {
    users(limit: 10) {
      ...UserWithFinancesFragment,
    }
  }
`;

const UsersList = () => {
  const { loading, data } = useQuery<{ users: UserWithFinances[] }>(GET_USERS_QUERY);

  return (
    <>
      {loading && (<p>Loading...</p>)}
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        {data?.users?.map((user) => (
          <div key={user.id} className="feature col">
            <UserFinanceView user={user} />
            {/* <UserCard user={user} /> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersList;
