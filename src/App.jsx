import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";

//css 
import "./App.css";

// Components
import Nav from "./components/Nav/Nav";

const HeaderLayout = () => (
  <div>
    <Nav />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/project", element: <ProjectPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
};

export default App;