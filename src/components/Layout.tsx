import { Outlet } from "react-router-dom";
import Header from "./headers/Header";
import AdminHeader from "./headers/AdminHeader";

const Layout = (props: { type: "admin" | "user" }) => {
  return (
    <>
      {props.type === "admin" ? <AdminHeader /> : <Header />}
      <Outlet />
    </>
  );
};

export default Layout;
