import React, { useState } from "react";

// hooks from React Router, which allow navigation and access to URL parameters, respectively.
import { useNavigate, useParams } from "react-router-dom";

// Components

// Styles
// import "./ProjectFormPage.css";

// hook to create state variable "projects"
const [projects, setProjects] = useState({
    // from JSON Raw Body in Deployed (default values)
    // this is what you return at the bottom - your list might look different to mine. If so, don't worry!
    // "amount": null,
    // "comment": "",
    // "anonymous": false,
    // "project": null,        
});

// setting up useNavigate() to be called later 
const navigate = useNavigate();

// accesses API to ID / retrieve / create 
const { id } = useParams();

// event handler ie user typing in field // arrow function for field input 
const handleChange = (event) => {
    const { id, value } = event.target;

    //set projects is updating projects related to above usestate hook in regards to the project & creating a new object 
    // setprojects with prevprojects ensures existing projects are preserved 
    setPledges((prevProjects) => ({
    ...prevProjects,
    [id]: value,
    }));
};

// submit form with handlesubmit 
const handleSubmit = async (event) => {
    // prevents the form from being submitted until conditions are met via fetch requests
    event.preventDefault();

    // get auth token from local storage
    const authToken = window.localStorage.getItem("token")

    // if user has an authenticated token then we will proceed, else error 
    if (authToken) {

        // try is javascript it will run thhrough the next block of code and any errors, catch will deal wit it. 
        try {

            // fetch 
            const response = await fetch(
                // api via URL projects 
                `${import.meta.env.VITE_API_URL}project/`,
                {
                method: "post",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`,
            },

            // sent to api as jsn to projects 
            body: JSON.stringify(projects),
            }
            );

            // checks if any erros from server, if not ok throw error 
            if (!response.ok) {
                throw new Error(await response.text());
            }
            // reload after successful form submission 
            location.reload();

        // catch block will handle the error with a console log box error alert 
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
        }
    } else {
    // redirect to lin 
    navigate(`/login`);
    }
};

// the below is related to handleSubmit and how it handles form submission when button is clicked 
return (
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


// Export provides permission for it to be reused elsewhere in the project
export default ProjectForm;