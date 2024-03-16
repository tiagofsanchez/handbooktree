import Nav from "./Nav";
// TO DO
// get the profile of the user
// get the sign out button with the redirect to the login page
const Layout = ({ children }) => {
  return (
    <div>
      <Nav>
        <h1>Profile of the user</h1>
      </Nav>
      <div className="min-h-screen dark:bg-black sm:pl-60 ">{children}</div>
    </div>
  );
};

export default Layout;
