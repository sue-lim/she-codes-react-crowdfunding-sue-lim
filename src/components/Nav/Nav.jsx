import { Link, useNavigate } from "react-router-dom";

// Styles
import "./Nav.css";


function Nav(props) {
const { loggedIn, setLoggedIn } = props;

const navigate = useNavigate();

const handleClick = () => {
    window.localStorage.removeItem("token");
    setLoggedIn(false);
    navigate(`/`);

};


    return (
        <nav className="p-3 border-gray-600 rounded bg-gray-50 dark:bg-#c1b6b4 dark:border-#c1b6b4">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                
                <a href="/" className=" items-center">
                <img src="\Images\ScrubHubLogo.JPG" className=" sm:h-10" alt="The Scrub Hub Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    
                </span>
                </a>

                <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">

            
                    <nav role="navigate" className=""> 
                    <div id="menuToggle">
                        
                        <input type="checkbox" />
                        
                        <span></span>
                        <span></span>
                        <span></span>
                        
                        <ul id="menu">
                            <li>
                                <Link className="text-center focus:ring-2" to="/">
                                Home
                                </Link>
                            </li>
                            <li>
                                <Link className="text-center" to="/all-projects">
                                Projects
                                </Link>
                            </li>
                            <li>
                                <Link className="text-center" to="/about-us">
                                About 
                                </Link>
                            </li>
                            <li>
                                {!loggedIn && (
                                <Link className="text-center" to="/login">
                                Login
                                </Link>
                                )}
                                {loggedIn && (
                                <Link className="text-center" onClick={handleClick}>
                                Logout
                                </Link>
                                )}                       
                            </li>
                            <li>
                                {!loggedIn && (
                                <Link className="" to="/register">
                                Register
                                </Link>
                            )}
                            </li>
                        </ul>
                    </div>
                    </nav>
                </button>

                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">

        
            <div className="nav-links">
            </div>
                    <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <Link className="nav-bar-link-horizontal" to="/">
                            Home
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-bar-link-horizontal" to="/all-projects">
                            Projects
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-bar-link-horizontal" to="/about-us">
                            About 
                            </Link>
                        </li>

                        <li>
                            {!loggedIn && (
                                <Link className="nav-bar-link-horizontal" to="/login">
                                Login
                                </Link>
                            )}
                            {loggedIn && (
                                <Link className="nav-bar-link-horizontal" onClick={handleClick}>
                                Logout
                                </Link>
                            )}                       
                        </li>
                        <li>
                        {!loggedIn && (
                            <Link className="nav-bar-link-horizontal" to="/register">
                            Register
                            </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    );
}


export default Nav;


// https://flowbite.com/docs/components/navbar/