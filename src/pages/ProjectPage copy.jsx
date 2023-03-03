// ALL PROJECTS

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Components
import PledgeForm from "../components/PledgeForm/PledgeForm";
import CommentForm from "../components/CommentForm/CommentForm";
import ProgressBar from "../components/ProgressBar/ProgressBar";


function ProjectPage() {
  // State
  const [projectData, setProjectData] = useState({ pledges: [] });
  const [commentData, setCommentData] = useState({ comments: [] });
  // const [projectPledgeAmount, setProjectPledgeAmount] = useState();
  // const [projectGoalPercentage, setGoalPercentage] = useState();
  // const [pledgeForm, setPledgeFormData] = useState({ pledgeforms: [] });


  // Hooks
  const { id } = useParams();

  // Check user is LoggedIn
  const token = window.localStorage.getItem("token");
  //  const isUserLoggedin = !(token === null || token === undefined || token === "undefined")


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

    // DATE FORMAT 
    const date = new Date(projectData.date_created);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // PRINT PLEDGES RELATED TO THE PROJECT
    console.log(projectData.pledges)

  return (
    <div>
      <h2>{projectData.title}</h2>
      <h3>Created at: {projectData.date_created}</h3>
      <h3>{`Status: ${projectData.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {projectData.pledges.map((pledgeData, key) => {
          return (
            <li key={key}>
              {pledgeData.amount} from {pledgeData.supporter}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectPage;