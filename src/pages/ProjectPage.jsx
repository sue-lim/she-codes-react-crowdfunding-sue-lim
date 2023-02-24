
// SEPERATE PAGE WITH THE INDIVIDUAL PROJECTS 

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


//Components

function ProjectPage() {
  // State
  const [projectData, setProjectData] = useState({ pledges: [] });
  const [commentData, setCommentData] = useState({ comments: [] });
  const [projectPledgeAmount, setProjectPledgeAmount] = useState();
  const [projectGoalPercentage, setGoalPercentage] = useState();

  // Hooks
  const { id } = useParams();

   // Check user is LoggedIn
   const token = window.localStorage.getItem("token");
   const isUserLoggedin = !(token === null || token === undefined || token === "undefined")


  // Effects
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}projects/${id}`
        );
        console.log(res);

        const data = await res.json();
        setProjectData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, []);

  return (
    <div>
      <h2>{projectData.title}</h2>
      {/* add css to the image */}
      <img src={projectData.image} />
      <h3>Created at: {projectData.date_created}</h3>
        <h3>{`Status: ${projectData.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {projectData.pledges.map((pledgeData, key) => {
          return (
            <li key={key}>
              
              $ {pledgeData.amount} from:  {pledgeData.supporter}
              {pledgeData.comment}
            </li>
          );
        })}
      </ul>
      <ul>

      <h2>{commentData.title}</h2>

      <h3>Comments:</h3>
        {commentData.comments.map((commentData, key) => {
          return (
            <li key={key}>
              
             {commentData.content} {commentData.project} 
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectPage;