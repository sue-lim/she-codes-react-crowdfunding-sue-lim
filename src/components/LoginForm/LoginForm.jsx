import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function LoginForm() {
    const [, setLoggedIn] = useOutletContext();

// STATE
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    
    //Hooks
    const navigate = useNavigate();

    // Actions
    const handleChange = (event) => {

        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({ ...prevCredentials,[id]: value, }));
    };

    const postData = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api-token-auth/`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            }
        );
        return response.json();
    };
const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
        const { token } = await postData();
        if (token !== undefined) {
            window.localStorage.setItem("token", token);
            setLoggedIn(true);
            navigate("/");
        } else {
            setLoggedIn(false);
        }
    }
};

    return (

<div className="grid grid-cols-3 gap-5 mt-8">
  <div></div>
    <div className="w-full max-w-xs rounded px">
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

        </div>
</div>
            
        );
}
export default LoginForm;

// TAILWIND TEMPLATE - https://tailwind-elements.com/docs/standard/forms/form-templates/