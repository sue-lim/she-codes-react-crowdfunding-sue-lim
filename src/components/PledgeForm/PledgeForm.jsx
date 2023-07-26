// import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function PledgeForm(props) {

    // useParams hook to extract the id parameter from the DRF
    // in this case the project 
    const { id }  = useParams(); 
    const { project } = props;

    // token retrieval from browser's / windows local storage 
    const authToken = window.localStorage.getItem("token");
    // outlet hook is used & along with auth token. 
    // user needs to be logged in to add a pledge 
    const [loggedIn] = useOutletContext();

    // usestate hook is used to grab the fields as per project ID from DRF and set pledge to the project
    const [pledge, setPledge] = useState({
            amount: null,
            comment: "",
            anonymous: false,
            project: id,
        });

    // hook to enables redirect
    // however this does not redirect it back to itself
    // research to include in 'handleSubmit'
    const navigate = useNavigate();
    
    // event handler ie user typing in field // arrow function for field input 
    const handleChange = (event) => {
        const { id, value} = event.target;
        
        //set pledges is updating pledges related to above usestate hook in regards to the pledges and creating a new object 
        // setPledges with prevPledge ensures existing pledges are preserved 
        setPledge((prevPledge) => ({
            ...prevPledge,
            // ID is the project ID and value is users input 
            [id]: value,
            
        }));
    };

    // post data 
    const postData = async () => {

        const response = await fetch(
            // send data to API pledges / DRF endpoint 
            `${import.meta.env.VITE_API_URL}pledges/`,
            {
                method: "post",
                headers: {
                    // posting with authorisation via token in JSON to comments as per the project 
                    "Authorization": `Token ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({project, ...pledge}),
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
                // 2) pledge.amount exists 
                if (pledge.amount) {
                    postData().then((response) =>{
                        console.log(response);
                        // location.reload();
                    });                    
                } else {
                    return (alert("Please enter an amount, thank you!"));
                }
            // catch block will handle the error with a console log box with the above error
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            };
            
        } else {
           // if user is not logged this will navigate to the login page.
            navigate(`/login`);
            // return (
            //     <Link to="/login">Please log in to pledge</Link>
            // );
        }
    };

    // the below is related to handleSubmit and how it handles form submission when button is clicked 
    return (
        <div>
        <form className="form-container-sml" onSubmit={handleSubmit}>
            <div className="mb-2">
            <label 
            className="form-labels-sml" 
            htmlFor="amount">(+) Pledge Now</label>
            <input
                className="input-sml-field"
                type="number"
                id="amount"
                placeholder="Enter amount"
                onChange={handleChange}
            />
            </div>
            <div className="mb-3">
            <label 
            className="form-labels-sml" htmlFor="comment">(+) Leave a message</label>
            <input
             className="input-sml-field"
                type="text"
                id="comment"
                placeholder="Enter Comment"
                onChange={handleChange}
            />
            </div>
            <div className="mb-2">
            <label 
            className="form-labels-sml"
            htmlFor="anonymous">Anonymous:</label>
            <input 
                type="checkbox" 
                id="anonymous" 
                onChange={handleChange} 
            />
            </div>

            <button className="bg-gray-500 hover:bg-gray-700 text-white  py-.5 px-7 rounded focus:outline-none focus:shadow " type="submit">Pledge</button>
        </form>
        </div>
    );
}


// Export provides permission for it to be reused elsewhere in the project
export default PledgeForm;