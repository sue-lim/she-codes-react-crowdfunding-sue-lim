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
            ? <a href="logout" onClick={handleSignOut} className="button">Log out</a>
            : <a href="login" onClick={navigateToLogin} className="button">Log in</a>
    }


    return (
        <section className="navbar">

            <nav className="left-menu">
                <Link className="button" variantcolor="#fff" to="/">Home </Link>
                {/* <Link className="button" to="/projects/">Projects </Link> */}
            </nav>
            <nav className="right-menu">
            {/* <Link className="button" to="/search/">Search </Link> */}
            {/* Below we call the Action for the Login/Logout button */}
            {checkUser()}
            </nav>
        </section>

    );
}


export default Nav;