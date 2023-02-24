import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// Pages
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import PledgePage from "./pages/PledgePage";
import CommentPage from "./pages/CommentPage";



//import AdminPage from "./pages/AdminPage";

// Components
import Nav from "./components/Nav/nav";
//css
import './App.css'
import { useState } from "react";
const HeaderLayout = () => {
  
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("token") != null)
  return (
    <>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
    </>
  )
};
const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/pledge/", element: <PledgePage /> },
      { path: "/comment/", element: <CommentPage />},
      // { path: "/user/", element: <UserRegistration />,}
      // { path: "/admin", element: <AdminPage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
};



export default App;

