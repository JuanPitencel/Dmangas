import React from "react";
import {  Navigate, Outlet } from "react-router-dom";
import  useAuth from "../../hook/useAuth";

function PrivateRoute({ element, ...rest }) {
  const { auth } = useAuth();

  return auth.id ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;