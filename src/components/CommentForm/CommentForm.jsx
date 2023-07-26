import React, { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function CommentForm(props) {

    // useParams hook to extract the id parameter from the DRF
    // in this case the project 
    const { id } = useParams();
    const {project} = props;
    
    // token retrieval from browser's / windows local storage 
    const authToken = window.localStorage.getItem("token");
    // outlet hook is used & along with auth token. 
    // user needs to be logged in to add a comment 
    const [loggedIn] = useOutletContext();
    
    // usestate hook is used to grab the fields as per project ID from DRF and set comment to the project
    const [comment, setComment] = useState({
        title: "",
        content: "",
        project: id,        
    });

    // hook to enables redirect
    // however this does not redirect it back to itself
    // research to include in 'handleSubmit'
    const navigate = useNavigate();
    
    // event handler ie user typing in field // arrow function for field input 
    const handleChange = (event) => {
        const { id, value } = event.target;

        //set comment is updating comment related to above usestate hook in regards to the project & creating a new project 
        // setComment with prevComment ensures existing comments are preserved 
        setComment((prevComment) => ({
        ...prevComment,
        // ID is the project ID and value is users input 
        [id]: value,
        
        }));
    };

    // post data 
    const postData = async () => {

        const response = await fetch(
            // send data to API comments/ DRF endpoint 
            `${import.meta.env.VITE_API_URL}comments/`,
            {
                method: "post",
                headers: {
                    // posting with authorisation via token in JSON to comments as per the project 
                    "Authorization": `Token ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({project, ...comment}),
            }
        );
        return response.json();
    };

    // submit form with handlesubmit 
    const handleSubmit = async (event) => {
            // prevents the form from being submitted until conditions are met via fetch requests

        event.preventDefault();

        // checks are in place
        // 1) logged in 
        if (loggedIn) {
            try {
                // 2) comment.title exists 
                if (comment.title) {
                    postData().then((response) =>{
                        console.log(response);
                        // location.reload();
                    });                    
                } else {
                    // if no title alert msg 
                    return (alert("Please enter a title!"));
                }
            // catch block will handle the error with a console log box with the above error
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            };
            
        } else {
            // if user is not logged this will navigate to the login page.
            navigate(`/login`);
        }
    };

    // the below is related to handleSubmit and how it handles form submission when button is clicked 
    return (
        <div>
        <form className="form-container-sml" onSubmit={handleSubmit}>
            <div className="mb-2">
            <label
            className="form-labels-sml" 
            htmlFor="title">(+) Title</label>
            <input
                className="input-sml-field"
                type="text"
                id="title"
                placeholder="Enter a title"
                onChange={handleChange}
            />
            </div>
            <div className="mb-2">
            <label
            className="form-labels-sml"
            htmlFor="content">(+) Comment:</label>
            <input
                className="input-sml-field"
                type="text"
                id="content"
                placeholder="Enter Comment"
                onChange={handleChange}
            />
            </div>
            {/* <div className="mt-2"></div> */}

            <button className="bg-gray-500 hover:bg-gray-700 text-white  py-.5 px-4 rounded focus:outline-none focus:shadow " type="submit">Comment</button>
        </form>
        </div>
    );
}

// Exporint is providing permission for it to be reused elsewhere in the project
export default CommentForm;