import React from "react";
import {createBrowserRouter} from "react-router-dom";
import {Home} from "../components/Home/Home";
import Login from "../components/Login/Login";
import {Register} from "../components/Register/Register";

export const router = createBrowserRouter([
  {path: "/", element: <Login/>},
  {path: "/register", element: <Register/>},
  {path: "/home/", element: <Home/>},
  {path: "/category", element: <Home/>},
  {path: "/user", element: <Home/>},
  {path: "/company", element: <Home/>},
  {path: "/about", element: <Home/>},
  {path: "/profile", element: <Home/>},
  {path: "/password", element: <Home/>},
  {path: "/addCompany", element: <Home/>},
  {path: "/editCompany/:id", element: <Home/>},
  {path: "/post-list", element: <Home/>},
  {path: "/add-post", element: <Home/>},
  {path: '/post', element: <Home/>},
  {path: '/detail', element: <Home/>}
]);
