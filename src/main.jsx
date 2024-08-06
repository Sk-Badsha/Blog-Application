import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthInput, Login } from "./components/index.js";
import {
  Home,
  Signup,
  AllPosts,
  AddPost,
  EditPost,
  Post,
} from "./pages/index.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthInput authentication={false}>
            <Login />
          </AuthInput>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthInput authentication={false}>
            <Signup />
          </AuthInput>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthInput authentication>
            {" "}
            <AllPosts />
          </AuthInput>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthInput authentication>
            {" "}
            <AddPost />
          </AuthInput>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthInput authentication>
            {" "}
            <EditPost />
          </AuthInput>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
