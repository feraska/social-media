import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

import {
createBrowserRouter,
  Navigate,
RouterProvider,

} from "react-router-dom";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element:user?<Home/>:<Register/>
    },
    {
      path: "login",
      element: user?<Navigate to="/"/> :<Login/>
    },
    {
      path: "register",
      element: user?<Navigate to="/"/>:<Register/>
    },
    {
      path: "profile/:username",
      element: <Profile/>
    },
    {
      path: "messenger",
      element: !user?<Navigate to="/"/>:<Messenger/>
    },
  ]);
  return (
    <RouterProvider router={router} />
   
  );
}

export default App;
