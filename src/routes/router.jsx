
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Plants from "../pages/Plants";  
import PlantDetails from "../pages/PlantDetails";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },

      { path: "/plants", element: <ProtectedRoute><Plants /></ProtectedRoute> },
      { path: "/plant/:id", element: <ProtectedRoute><PlantDetails /></ProtectedRoute> },
      { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);

export default router;