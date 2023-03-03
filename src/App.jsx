import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import AllProjectsPage from "./pages/AllProjectsPage";
import CommentPage from "./pages/CommentPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";
import ProfilePage from "./pages/ProfilePage";
import PledgePage from "./pages/PledgePage";
import RegistrationPage from "./pages/RegistrationPage";
import SessionUserPage from "./pages/SessionUserPage";
//import AdminPage from "./pages/AdminPage";

// Components
import Nav from "./components/Nav/Nav";

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
      { path: "/all-projects/", element: <AllProjectsPage/>},
      { path: "/comment/", element: <CommentPage />},
      { path: "/login", element: <LoginPage /> },
      { path: "/projects/:id", element: <ProjectPage /> },
      { path: "/pledge/", element: <PledgePage /> },
      { path: "/profile/:<int:pk>", element: <ProfilePage />},
      { path: "/registration/", element: <RegistrationPage />,},
      { path: "/user/session", element: <SessionUserPage /> },       
      // { path: "/admin", element: <AdminPage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
};



export default App;

