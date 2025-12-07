import { NotFound } from "@/components/Common/Notfound/NotFound";
import { CustomerDashboard } from "@/Pages/[customer]/customerDashboard/customerDashboard";
import { CustomerReports } from "@/Pages/[customer]/customerReports/customerReports";
import { ShopCreateOrder } from "@/Pages/[shop]/shopCreateOrder/shopCreateOrder";
import { ShopCustomers } from "@/Pages/[shop]/shopCustomers/shopCustomers";
import { ShopDashboard } from "@/Pages/[shop]/shopDashboard/shopDashboard";
import { ShopReports } from "@/Pages/[shop]/shopReport/shopReport";
import Home from "@/Pages/home/home";
import { LoginPage } from "@/Pages/login/login";
import { Register } from "@/Pages/regester/register";
import useAuthStore from "@/store/authStore";
import { RoleEnum } from "@/utils/common";
import { Navigate, RouteObject } from "react-router-dom";
import { RouteConst } from "@/utils/allRoutes.type";
import ContactUs from "@/Pages/contactUs/contactUs";
import Services from "@/Pages/services/services";
import { AdminLogin } from "@/Pages/[admin]/adminLogin/adminLogin";
import { AdminDashboard } from "@/Pages/[admin]/adminDashboard/adminDashboard";
import { AdminServices } from "@/Pages/[admin]/adminServices/adminServices";
import { AdminUsers } from "@/Pages/[admin]/adminUsers/adminUsers";
import { AdminVehicles } from "@/Pages/[admin]/adminVehicles/adminVehicles";
import { AdminPeriod } from "@/Pages/[admin]/adminPeriods/adminPeriods";

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

  // Customer //
  {
    path: RouteConst.customerDashboard,
    element: (
      <PrivateRoute
        element={<CustomerDashboard />}
        acceptRole={RoleEnum.CUSTOMER}
      />
    ),
  },
  {
    path: RouteConst.customerReports,
    element: (
      <PrivateRoute
        element={<CustomerReports />}
        acceptRole={RoleEnum.CUSTOMER}
      />
    ),
  },

  // SHOP //
  {
    path: RouteConst.shopDashboard,
    element: (
      <PrivateRoute element={<ShopDashboard />} acceptRole={RoleEnum.SHOP} />
    ),
  },
  {
    path: RouteConst.shopCreateOrder,
    element: (
      <PrivateRoute element={<ShopCreateOrder />} acceptRole={RoleEnum.SHOP} />
    ),
  },
  {
    path: RouteConst.shopReports,
    element: (
      <PrivateRoute element={<ShopReports />} acceptRole={RoleEnum.SHOP} />
    ),
  },
  {
    path: RouteConst.shopCustomers,
    element: (
      <PrivateRoute element={<ShopCustomers />} acceptRole={RoleEnum.SHOP} />
    ),
  },
];
