import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import "./LoginForm.css"

function LoginForm() {
    // useOutletContext used to get the setLoggedin function 
    // set loggedIn use to update a state that keeps tack of whether th user is logged in or not. 
    const [, setLoggedIn] = useOutletContext();

    // The useState hook is setting up a state variable "credentials", which holds an object with username and password properties. 
    // setCredentials function is used to update the credentials state.
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    
    // setting up useNavigate() to be called later 
    const navigate = useNavigate();

    // event handler ie user typing in field // arrow function for field input  
    const handleChange = (event) => {
        const { id, value } = event.target;

        //setCredentials is updating credentials related to above usestate hook in regards to the user 
        // setCredentials with previous credentials ensures existing value are preserved 
        setCredentials((prevCredentials) => ({ ...prevCredentials,[id]: value, }));
    };

    // post data / 
    const postData = async () => {

        const response = await fetch(
            // send data to API comments/ DRF endpoint 
            `${import.meta.env.VITE_API_URL}api-token-auth/`,
            {
                method: "post",
                headers: {
                    // posting / checking with authorisation / credentials via token in JSON to comments as per the user 
                    "Content-Type": "application/json",
                },
                // server expects the format to be in jasn, this converts it from JS to json format 
                body: JSON.stringify(credentials),
            }
        );
        //  JSN read and rtn in JS 
        return response.json();
    };

// function when user submits the form it triggers the on submit 
const handleSubmit = async (event) => {

    // prevents default behaviour of a form submitting 
    event.preventDefault();

    // check if both username and passorwd objects are not empty 
    if (credentials.username && credentials.password) {

        // once credentials are sent to server it ill wait for a responce
        // this contains a token 
        const { token } = await postData();

        // condition if token is not defined
        // = token is available authentication was successful 
        if (token !== undefined) {

            // store in local storage as token 
            window.localStorage.setItem("token", token);

            //  when logged in is true then then navigate back to home 
            setLoggedIn(true);
            navigate("/");
        } else {
            // loggedin false, authentication failed 
            setLoggedIn(false);
        }
    }
};

    // the below is related to handleSubmit and how it handles form submission when button is clicked 
    return (
        <div className="login-form-container">
        <div className="login-form-col-1"></div>
            <div className="login-form-col-2">
                <form 
                    onSubmit={handleSubmit}
                    className="form-container">
                        <h3>Login</h3>
                        <div className="mb-4">
                            <label 
                                className="form-labels" 
                                htmlFor="username"> 
                                Username 
                            </label>
                            <input 
                                className="input-field"
                                type="text" 
                                id="username" 
                                onChange={handleChange}
                                placeholder="Username"          
                            />
                        </div>

                        <div className="mb-6">
                            <label 
                                className="form-labels"> 
                                Password 
                            </label>
                                <input 
                                className="input-field" 
                                type="password" 
                                id="password" 
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                            
                        </div>

                        <div className="flex items-center justify-between">
                        <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow" >
                            Log In
                        </button>
                        

                        </div>
                        <div className="mt-6">
                        <p className="text-gray-500 text-xs italic">No login ? ...  <a href='register'> Register Here</a></p>
                        </div>
                    </form>
        <div className="login-form-col-2"></div>
                </div>
        </div>
            
        );
}


// Export provides permission for it to be reused elsewhere in the project
export default LoginForm;

// TAILWIND TEMPLATE - https://tailwind-elements.com/docs/standard/forms/form-templates/