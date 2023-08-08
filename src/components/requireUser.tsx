import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "../redux/api/userApi";
import FullScreenLoader from "./FullScreenLoader";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies(["logged_in"]);
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const userData = userApi.endpoints.getMe.useQueryState(null);

  if (loading) {
    return <FullScreenLoader />;
  }

  return (cookies.logged_in || userData) &&
    allowedRoles.includes(userData?.data?.role as string) ? (
    <Outlet />
  ) : cookies.logged_in && userData ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireUser;
