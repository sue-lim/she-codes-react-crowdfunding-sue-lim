import React, { useState } from "react";

// IMPORTS 
import { useNavigate, useParams } from "react-router-dom";

function RegistrationForm() {
    // STATE 
    const [newUser, setNewUser] = useState({
        // Fields from serialiser in the backend 
        "username": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "password2": ""
    });

   // HOOKS 
    const navigate = useNavigate();


    // copies the original data, replaces the old data for each id/value pair to what is input in the form (changes state). this will be submitted to API below
    const handleChange = (event) => {
        const { id, value } = event.target;
        setNewUser((prevNewUser) => ({
        ...prevNewUser,
        [id]: value,
        }));
    };

    // submit the new data (state change) from handleChange.
        // POST has been moved from separate function to be embedded and actioned when the submit button is pressed. 
    const handleSubmit = async (event) => {
        event.preventDefault();
        
    //         const response = await fetch(
    //             `${import.meta.env.VITE_API_URL}users/`,
    //             {
    //                 method: "post",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
                        
    //           username: register.username, 
    //           password: register.password,
    //           password2: register.password2,
    //           email: register.email,
    //           first_name: register.first_name,
    //           last_name: register.last_name
    //            }),
    //             }
    //         );
    //         return response.json();
    //         };
//if all fields match then jsonfiy it and register 
    if (newUser.username && newUser.first_name && newUser.last_name && newUser.email && newUser.password && newUser.password2) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}users/`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: newUser.username, 
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                password: newUser.password,
                password2: newUser.password2,      
              }),
            }
          );
          const data = await response.json();
          console.log(data)
          window.localStorage.setItem("token", data.token);
        //   window.localStorage.getItem("token")

        //   if (data.token===undefined) {
        //     console.log("cannot register authentication token")
        //     return (
        //       <>
        //       <h2>Please Try Again</h2>
        //       </>
        //     );
        //   }
        // else {
        //     //this directs it home 
        //     //amend to user session 
          navigate(`/`);
        
        } catch (err) {
          console.log(err);
        }
      }
    };
       
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="Username">Username:</label>
            <input
                type="text"
                id="username"
                placeholder="Register a Unique Username"
                onChange={handleChange}
            />
            </div>
            <div>
            <label htmlFor="first_name">First Name:</label>
            <input
                type="text"
                id="first_name"
                placeholder="Enter your first name"
                onChange={handleChange}
            />
            </div>
            <div>
            <label htmlFor="last_nam">Last Name:</label>
            <input
                type="text"
                id="last_name"
                placeholder="Enter your last name"
                onChange={handleChange}
            />
            </div>
            <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
            />
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
            />
            </div>
            <div>
            <label htmlFor="password2">Password:</label>
            <input
                type="password"
                id="password2"
                placeholder="Enter your password again"
                onChange={handleChange}
            />
            </div>
            <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default RegistrationForm;