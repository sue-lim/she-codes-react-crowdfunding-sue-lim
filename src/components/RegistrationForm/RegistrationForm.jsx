import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

import "./RegistrationForm.css";

function RegistrationForm() {
    const authToken = window.localStorage.getItem("token")
    const [users, setUsers] = useState({
        "username": "",
        "first_name":"",
        "last_name":"",
        "email": "",
        "password": "",
        "password2": "",
        
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setUsers((prevUsers) => ({
        ...prevUsers,
        [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!authToken) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}users/`,
                    {
                    method: "post",
                    headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(users),
                }
            );
            navigate(`/login`);
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

export default RegistrationForm;