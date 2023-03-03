
import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
// PAGE FOR THE USER THAT IS LOGGED IN 
// Dummy Data
// import { oneProject } from "../data";

function SessionUserPage() {
    const [loggedIn] = useOutletContext();
    const authToken = window.localStorage.getItem("token")
    // State
    const [user, setUser] = useState({});

    // Hooks
    const { id } = useParams();

    // Effects
    // ---- ASYNC change
    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(authToken)
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}users/session`, 
                    {
                    method: "get",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`,
                    }
                    });
                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
}, [authToken]);



    return (
        <div classNameName="user-detail">
            <h2>{user.username}</h2>
            {/* <img src={user.avatar} />
            <h3>Bio: {user.bio}</h3> */}
            <p>-------------------------------</p>
                <div>
                    <h3>{user.username}'s Projects:</h3>
                    <ul>
                    {user.projects &&
                        user.projects.map((projectData, key) => (
                            <li key={key}>
                            {projectData.title} - {projectData.date_created}
                            </li>
                        ))
                    }
                    </ul>
                </div>

            <p>-------------------------------</p>
                <div>
                    <h3>{user.username} Comment Feed:</h3>
                    <ul>
                    {user.comments &&
                        user.comments.map((commentData, key) => (
                            <li key={key}>
                            {commentData.created} - {commentData.project}: says {commentData.body}
                            </li>
                        ))
                    }
                    </ul>
                </div>

            <p>-------------------------------</p>
                <div>
                    <h3>{user.username} Pledges Feed:</h3>
                    <ul>
                        {user.pledges &&
                            user.pledges.map((pledgeData, key) => (
                                <li key={key}>
                                    {pledgeData.date_pledged}: ${pledgeData.amount} for {pledgeData.project}
                                    <p>{pledgeData.comment}</p>
                                </li>
                            ))}
                    </ul>
                </div>
        </div>
    );
}

export default SessionUserPage;