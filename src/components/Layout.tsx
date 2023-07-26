import { Outlet } from "react-router-dom";
import Header from "./Header";
import AdminHeader from "./AdminHeader";

const Layout = (props: { type: "admin" | "user" }) => {
  return (
    <>
      {props.type === "admin" ? <AdminHeader /> : <Header />}
      <Outlet />
    </>
  );
};

export default Layout;
