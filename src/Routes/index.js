import React from "react";
import { createBrowserRouter, Route } from "react-router-dom";
import { Home } from "../components/Home/Home";
import Login from "../components/Login/Login";
import { Register } from "../components/Register/Register";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home/", element: <Home /> },
  { path: "/category", element: <Home /> },
  { path: "/about", element: <Home /> },
]);
