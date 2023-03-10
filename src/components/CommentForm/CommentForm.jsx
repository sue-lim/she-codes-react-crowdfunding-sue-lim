import React, { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";


function CommentForm(props) {

    //Actions / accesses project ID so the pledge can be connected to it
    const { id } = useParams();
    
    const {project} = props;
  
    const authToken = window.localStorage.getItem("token");
    
    const [loggedIn] = useOutletContext();
    
    const [comment, setComment] = useState({
        title: "",
        content: "",
        project: id,        
    });

    // HOOKS / enables redirect
    const navigate = useNavigate();
    
    
    const handleChange = (event) => {
        const { id, value } = event.target;
        //data is being sent 
        setComment((prevComment) => ({
        ...prevComment,
        [id]: value,
        //this is the project I want to call & is the page I'm looking at
        }));
    };

    const postData = async () => {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}comments/`,
            {
                method: "post",
                headers: {
                    "Authorization": `Token ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({project, ...comment}),
            }
        );
        return response.json();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loggedIn) {
            try {
                if (comment.title) {
                    postData().then((response) =>{
                        console.log(response);
                        // location.reload();
                    });                    
                } else {
                    return (alert("Please enter a title!"));
                }
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            };
            
        } else {
            // redirect to login page
            navigate(`/login`);
            // return (
            //     <Link to="/login">Please log in to pledge</Link>
            // );
        }
    };


    
    return (
        //SUPPORTER - AUTO GENERATED 
        //DRF NOTES - ID AUTO GENERATED 
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

export default CommentForm;