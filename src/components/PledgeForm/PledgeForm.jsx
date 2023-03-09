// import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function PledgeForm(props) {

    //Actions
    const { id }  = useParams(); 

    //State
    const { project } = props;

    const authToken = window.localStorage.getItem("token");
    
    const [loggedIn] = useOutletContext();

    const [pledge, setPledge] = useState({
            amount: null,
            comment: "",
            anonymous: false,
            project: id,
        });

    //Hooks 
    const navigate = useNavigate();
    
   
    const handleChange = (event) => {
        const { id, value} = event.target;
        
        setPledge((prevPledge) => ({
            ...prevPledge,
            [id]: value,
            
        }));
    };

    const postData = async () => {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}pledges/`,
            {
                method: "post",
                headers: {
                    "Authorization": `Token ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({project, ...pledge}),
            }
        );
        return response.json();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loggedIn) {
            try {
                if (pledge.amount) {
                    postData().then((response) =>{
                        console.log(response);
                        // location.reload();
                    });                    
                } else {
                    return (alert("Please enter an amount, thank you!"));
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

export default PledgeForm;