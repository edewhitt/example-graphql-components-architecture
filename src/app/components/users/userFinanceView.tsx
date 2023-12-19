"use client";
import gql from "graphql-tag";
import UserComponent, { User, UserComponentFragment } from "./user";

export type UserWithFinances = User & {
  account: {
    accountName: string;
    accountNumber: string;
    balance: string;
  };
  transactions: {
    amount: string;
    date: string;
    description: string;
    type: string;
  }[];
};

export const UserWithFinancesFragment = gql`
  ${UserComponentFragment}

  fragment UserWithFinancesFragment on User {
    ...UserComponentFragment
    account {
      accountName
      accountNumber
      balance
    }
    transactions {
      amount
      date
      description
      type
    }
  }
`;

const UserFinanceView = ({ user }: { user: UserWithFinances }) => (
  <div className="border border-1 rounded p-2">
    <UserComponent user={user} />
    {user.account && (
      <div className="p-4 pt-0">
        <div><b>Account:</b> {user.account.accountName}</div>
        <div><b>Account #:</b> {user.account.accountNumber}</div>
        <div><b>Balance:</b> ${user.account.balance}</div>
      </div>
    )}
    {!!user.transactions?.length && (
      <div className="p-4 pt-0">
        <h5>Previous Transactions</h5>
        {user.transactions.map((transaction, index) => (
          <div key={index}>
            <UserTransaction transaction={transaction} />
          </div>
        ))}
      </div>
    )}
  </div>
);

const UserTransaction = ({ transaction }: { transaction: UserWithFinances['transactions'][0] }) => {
  const isWithdrawal = transaction.type === 'withdrawal';

  const formattedDate = new Date(transaction.date).toLocaleDateString();

  return (
    <>
      <div className="row justify-content-between">
        <div className="col-auto">
          <b>{formattedDate}</b>
        </div>
        <div className="col-auto">
          <span className={isWithdrawal ? 'text-success' : 'text-danger'}>{isWithdrawal ? '+' : '-'}{transaction.amount}</span>
        </div>
      </div>
      <p className="text-truncate">{transaction.description}</p>
    </>
  )
};

export default UserFinanceView;