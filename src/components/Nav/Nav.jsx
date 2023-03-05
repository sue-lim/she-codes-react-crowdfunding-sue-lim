import { Link, useNavigate } from "react-router-dom";

// Styles
// import "./Nav.css";

function Nav() {

    // Hooks
    const navigate = useNavigate();

    // Actions and Helpers
    const navigateToLogin = () => {
        navigate("/login")
    }

    const handleSignOut = () => {
        window.localStorage.removeItem("token")
        navigateToLogin()
    }

    
    const checkUser = () => {
        const isUserLoggedIn = !!window.localStorage.getItem("token");

        return isUserLoggedIn
            ? <a href="logout" onClick={handleSignOut} classNameName="button">Log out</a>
            : <a href="login" onClick={navigateToLogin} classNameName="button">Log in</a>
    }


    return (

        
        <nav className="p-3 border-gray-600 rounded bg-gray-50 dark:bg-#c1b6b4 dark:border-#c1b6b4">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="#" className="flex items-center">
                <img src="" className="h-6 mr-3 sm:h-10" alt="" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
                </a>

                <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
                <span className="sr-only">Open main menu
        
                </span>
            
                
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" ></path></svg>
                </button>

                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <a href='/' 
                            className="nav-bar-link-vertical" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href='/' className="nav-bar-link-horizontal">Home</a>
                        </li>
                        <li>
                            <a href='/all-projects' className="nav-bar-link-horizontal">Projects</a>
                        </li>
                        <li>
                            <a href='/contact' className="nav-bar-link-horizontal">Contact</a>
                        </li>
                        <li>
                            <a href='/contact' className="nav-bar-link-horizontal">About</a>
                        </li>
                        <li>
                            <a href='/login' className="nav-bar-link-horizontal">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    );
}


export default Nav;


// https://flowbite.com/docs/components/navbar/