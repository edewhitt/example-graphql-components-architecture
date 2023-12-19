import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import UsersList from "./components/users/usersList";

export default function Page() {
  return (
    <main>
      <div className="container-fluid px-4 py-5">
        <h2 className="pb-2 border-bottom">GraphQL Components Architecture Example</h2>
        <UsersList />
      </div>
    </main>
  )
};
