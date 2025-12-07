import { NotFound } from "@/components/Common/Notfound/NotFound";
import { AdminDashboard } from "@/Pages/[admin]/adminDashboard/adminDashboard";
import { AdminLogin } from "@/Pages/[admin]/adminLogin/adminLogin";
import { AdminPeriod } from "@/Pages/[admin]/adminPeriods/adminPeriods";
import { AdminServices } from "@/Pages/[admin]/adminServices/adminServices";
import { AdminUsers } from "@/Pages/[admin]/adminUsers/adminUsers";
import { AdminVehicles } from "@/Pages/[admin]/adminVehicles/adminVehicles";
import { ManagerApartments } from "@/Pages/[manager]/managerApartments/managerApartments";
import { ManagerCreateFactor } from "@/Pages/[manager]/managerCreateFactor/managerCreateFactor";
import { ManagerDashboard } from "@/Pages/[manager]/managerDashboard/managerDashboard";
import { ManagerNotification } from "@/Pages/[manager]/managerNotification/managerNotification";
import { ManagerReports } from "@/Pages/[manager]/managerReports/managerReports";
import { UserCharges } from "@/Pages/[user]/userCharges/userCharges";
import { UserDashboard } from "@/Pages/[user]/userDashboard/userDashboard";
import { UserFound } from "@/Pages/[user]/userFound/userFound";
import { UserReports } from "@/Pages/[user]/userReports/userReports";
import ContactUs from "@/Pages/contactUs/contactUs";
import Home from "@/Pages/home/home";
import { LoginPage } from "@/Pages/login/login";
import { Register } from "@/Pages/regester/register";
import Services from "@/Pages/services/services";
import useAuthStore from "@/store/authStore";
import { RouteConst } from "@/utils/allRoutes.type";
import { RoleEnum } from "@/utils/common";
import { Navigate, RouteObject } from "react-router-dom";

const PrivateRoute = ({
  element,
  acceptRole,
}: {
  element: JSX.Element;
  acceptRole: RoleEnum;
}) => {
  const { isAuth, role } = useAuthStore();

  if (!isAuth) return <Navigate to="/" replace />;
  if (acceptRole != role) return <Navigate to="/" replace />;

  return element;
};

export const allRoutes: Array<RouteObject> = [
  { path: RouteConst.home, element: <Home /> },
  { path: RouteConst.contactUs, element: <ContactUs /> },
  { path: RouteConst.services, element: <Services /> },
  { path: RouteConst.login, element: <LoginPage /> },
  { path: RouteConst.register, element: <Register /> },

  { path: "*", element: <NotFound /> },

  // Admin //
  {
    path: RouteConst.adminLogin,
    element: <AdminLogin />,
  },
  {
    path: RouteConst.adminDashboard,
    element: (
      <PrivateRoute element={<AdminDashboard />} acceptRole={RoleEnum.ADMIN} />
    ),
  },
  {
    path: RouteConst.adminServices,
    element: (
      <PrivateRoute element={<AdminServices />} acceptRole={RoleEnum.ADMIN} />
    ),
  },
  {
    path: RouteConst.adminUsers,
    element: (
      <PrivateRoute element={<AdminUsers />} acceptRole={RoleEnum.ADMIN} />
    ),
  },
  {
    path: RouteConst.adminVehicles,
    element: (
      <PrivateRoute element={<AdminVehicles />} acceptRole={RoleEnum.ADMIN} />
    ),
  },
  {
    path: RouteConst.adminPeriods,
    element: (
      <PrivateRoute element={<AdminPeriod />} acceptRole={RoleEnum.ADMIN} />
    ),
  },

  // MANAGER //
  {
    path: RouteConst.manageApartments,
    element: (
      <PrivateRoute
        element={<ManagerApartments />}
        acceptRole={RoleEnum.MANAGER}
      />
    ),
  },
  {
    path: RouteConst.manageCreateFactor,
    element: (
      <PrivateRoute
        element={<ManagerCreateFactor />}
        acceptRole={RoleEnum.MANAGER}
      />
    ),
  },
  {
    path: RouteConst.manageDashboard,
    element: (
      <PrivateRoute
        element={<ManagerDashboard />}
        acceptRole={RoleEnum.MANAGER}
      />
    ),
  },
  {
    path: RouteConst.manageReports,
    element: (
      <PrivateRoute
        element={<ManagerReports />}
        acceptRole={RoleEnum.MANAGER}
      />
    ),
  },
  {
    path: RouteConst.manageNotifications,
    element: (
      <PrivateRoute
        element={<ManagerNotification />}
        acceptRole={RoleEnum.MANAGER}
      />
    ),
  },

  // USER //
  {
    path: RouteConst.userCharges,
    element: (
      <PrivateRoute element={<UserCharges />} acceptRole={RoleEnum.USER} />
    ),
  },
  {
    path: RouteConst.userDashboard,
    element: (
      <PrivateRoute element={<UserDashboard />} acceptRole={RoleEnum.USER} />
    ),
  },
  {
    path: RouteConst.userFound,
    element: (
      <PrivateRoute element={<UserFound />} acceptRole={RoleEnum.USER} />
    ),
  },
  {
    path: RouteConst.userReports,
    element: (
      <PrivateRoute element={<UserReports />} acceptRole={RoleEnum.USER} />
    ),
  },
];
