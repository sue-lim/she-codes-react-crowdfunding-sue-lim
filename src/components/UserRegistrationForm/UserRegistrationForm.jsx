import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserRegistrationForm() {
    const [users, setUsers] = useState({
        // from JSON Raw Body in Deployed (default values)
        // this is what you return at the bottom - your list might look different to mine. If so, don't worry!
        // "amount": null,
        // "comment": "",
        // "anonymous": false,
        // "project": null,        
    });

    // enables redirect
    const navigate = useNavigate();

    // accesses project ID so the pledge can be connected to it
    const { id } = useParams();

    // copies the original data, replaces the old data for each id/value pair to what is input in the form (changes state). this will be submitted to API below
    const handleChange = (event) => {
        const { id, value } = event.target;
        setComments((prevUsers) => ({
        ...prevUsers,
        [id]: value,
        }));
    };

    // submit the new data (state change) from handleChange.
        // POST has been moved from separate function to be embedded and actioned when the submit button is pressed. 
    const handleSubmit = async (event) => {
        event.preventDefault();

        // get auth token from local storage
        const authToken = window.localStorage.getItem("token")

        // if the auth token exists (if logged in) 
            // TRY to POST the data to your deployed, using fetch.
            // send the token with it to authorise the ability to post
                // wait for the response - 
                // if successful, return the JSON payload and reload the page with the data
                // if not successful, CATCH the error and display as a pop up alert
        // if not logged in, redirect to login page

        if (authToken) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}users/`,
                    {
                    method: "post",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify(users),
                }
                );
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                location.reload();
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            }
        } else {
        // redirect to login page
        navigate(`/login`);
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
                placeholder="Enter Username"
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
            <label htmlFor="email">Password:</label>
            <input
                type="password"
                id="password"
                placeholder="Enter your password again"
                onChange={handleChange}
            />
            </div>
            <button type="submit">Register</button>
        </form>
        </div>
    );
}

export default UserRegistrationForm;