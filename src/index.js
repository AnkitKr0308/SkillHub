import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "../src/pages/Home";
import Signup from "./pages/Signup";
import store from "./store/store";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import MyLearnings from "./pages/MyLearnings";
import CourseData from "./pages/CourseData";
import Unauthorized from "./pages/Unauthorized";
import Users from "./pages/Users";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",

        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/courses",
        element: (
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addcourse",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Mentor"]}>
            <AddCourse />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-learning",
        element: (
          <ProtectedRoute>
            <MyLearnings />
          </ProtectedRoute>
        ),
      },
      {
        path: `/my-learning/:courseId`,
        element: (
          <ProtectedRoute>
            <CourseData />
          </ProtectedRoute>
        ),
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
