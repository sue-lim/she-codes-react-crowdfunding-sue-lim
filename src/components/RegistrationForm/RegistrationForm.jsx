import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

import "./RegistrationForm.css";

function RegistrationForm() {
    // get auth token from local storage
    const authToken = window.localStorage.getItem("token")

    // hook to create state variable "user"
    const [users, setUsers] = useState({
        // fields for the new variable, typically the should match those in the API 
        "username": "",
        "first_name":"",
        "last_name":"",
        "email": "",
        "password": "",
        "password2": "",
        
    });

    // setting up useNavigate() to be called later 
    const navigate = useNavigate();

    // accesses API to ID / retrieve / create   
    const { id } = useParams();

    // event handler ie user typing in field // arrow function for field input 
    const handleChange = (event) => {
        const { id, value } = event.target;

        //set user is updating user related to above usestate hook in regards to the user & creating a new object 
        // set user  with prevuser  ensures existing users are preserved 
        setUsers((prevUsers) => ({
        ...prevUsers,
        [id]: value,
        }));
    };

    // submit form with handlesubmit 
    const handleSubmit = async (event) => {
        // prevents the form from being submitted until conditions are met via fetch requests
        event.preventDefault();

        // check if user is logged in or authenticated 
        if (!authToken) {

            // try to run through the next block of code to create a new user
            try {
                const response = await fetch(
                    //  api via URL / users 
                    `${import.meta.env.VITE_API_URL}users/`,
                    {
                    method: "post",
                    headers: {
                    "Content-Type": "application/json",
                },
                // sent to api as jsn to users
                body: JSON.stringify(users),
                }
            );
            // on success, navigate to login 
            navigate(`/login`);
            // catch block will handle the error with a console log box error alert 
        } catch (err) {
            console.error(err);
        }
    } else {
    // redirect to login page
    navigate(`/`);
    }
    };

    return (
        <div className="registration-form-container">
        <div className="registration-form-col-1"></div>
        <div className="registration-form-col-2">
        <form 
        onSubmit={handleSubmit}
        className="form-container">
            <h3>Become a member</h3>
                <div  className="mb-4">
                    <label 
                    className="form-labels" 
                    htmlFor="username">Username:</label>
                    <input
                        className="input-field"
                        type="text"
                        id="username"
                        onChange={handleChange}
                        placeholder="Enter unique username"
                />
                </div>

                <div className="mb-6">
                    <label 
                        className="form-labels" 
                        htmlFor="first_name">
                        First Name:</label>
                    <input
                        className="input-field"
                        type="text"
                        id="first_name"
                        placeholder="Enter First name"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="form-labels"htmlFor="last_name">Last Name:</label>
                    <input
                        className="input-field" 
                        type="text"
                        id="last_name"
                        placeholder="Enter Last name"
                        onChange={handleChange}
                    /> 
                </div>

                <div className="mb-6">
                    <label className="form-labels" htmlFor="email">Email:</label>
                    <input
                        className="input-field" 
                        type="email"
                        id="email"
                        placeholder="Enter unique email"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="form-labels" htmlFor="password">Password:</label>
                    <input
                        className="input-field" 
                        type="text"
                        id="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                    />
                    </div>
            
                <div className="mb-6">
                <label className="form-labels"htmlFor="password2">Type password again:</label>
                <input 
                    className="input-field" 
                    type="text"
                    id="password2" 
                    placeholder="Enter password"
                    onChange={handleChange} 
                />
                </div>
                <button 
                type="submit" 
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Register
                </button>
            </form>
            </div>
            <div className="registration-form-col-3"></div>
        </div>
    )
}


// Export provides permission for it to be reused elsewhere in the project
export default RegistrationForm;