import { Link, useNavigate } from "react-router-dom";

// Styles
import "./Nav.css";

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
        <section classNameName="navbar">

            <nav classNameName="left-menu">
                <ul>
                <li><a href='/'>Home </a></li>
                <li><a href='/'>Projects </a></li>

                <li><a href='/contact'>Contact Us </a></li>
                </ul>
            </nav>
            <nav classNameName="right-menu">
                <ul>

                {/* <Link classNameName="button" to="/search/">Search </Link> */}
                {/* Below we call the Action for the Login/Logout button */}
                {checkUser()}
                </ul>
            </nav>
        </section>

    );
}


export default Nav;