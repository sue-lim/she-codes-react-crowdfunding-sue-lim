import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components

// Styles
// import "./ProjectFormPage.css";

const [projects, setProjects] = useState({
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
    setPledges((prevProjects) => ({
    ...prevProjects,
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
                `${import.meta.env.VITE_API_URL}project/`,
                {
                method: "post",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`,
            },
            body: JSON.stringify(projects),
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
    //REDIRECT TO LOGIN PAGE 
    navigate(`/login`);
    }
};

return (
    //DRF NOTES - ID AUTO GENERATED 
    <div>
    <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="title">Title:</label>
        <input
            type="text"
            id="title"
            placeholder=""
            onChange={handleChange}
        />
        </div>
        <div>
        <label htmlFor="description">Description:</label>
        <input
            type="text"
            id="description"
            placeholder="Enter a description"
            onChange={handleChange}
        />
        </div>
        <div>
        <label htmlFor="is_opens">Anonymous:</label>
        <input 
            type="checkbox"
            id="anonymous" 
            onChange={handleChange} 
        />
        </div>
        
        
      
              <div>
        <label htmlFor="goal">Goal:</label>
        <input
            type="id"
            id="goal"
            placeholder="needs to be auto-filled with current project"
            onChange={handleChange}
        />
        </div>
        <button type="submit">Pledge</button>
    </form>
    </div>
);


export default ProjectForm;