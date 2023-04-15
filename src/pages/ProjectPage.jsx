
// SEPERATE PAGE WITH THE INDIVIDUAL PROJECTS 

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
  const [projectPledgeAmount, setProjectPledgeAmount] = useState();
  const [projectGoalPercentage, setGoalPercentage] = useState();



  // Hooks
  const { id } = useParams();

   // Check user is LoggedIn
   const token = window.localStorage.getItem("token");
   const isUserLoggedin = !(token === null || token === undefined || token === "undefined")


  //Effects
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}projects/${id}`
        );
        console.log(res);

        const data = await res.json();
        setProjectData(data); /*returns projects and associated pledges to screen*/
        setCommentData(data); /*returns comments related to the project to the screen*/
    //     setProjectPledgeAmount(data);

    //     const totalPledges = projectData.sum_pledges
    //     // eslint-disable-next-line eqeqeq
    //     .filter (pledgeData => pledgeData.project_id == id)
    //     // reducing your list to an output value
    //     .reduce ((sum, pledgeData) => sum + pledgeData.amount, 0)
    // setProjectPledgeAmount(totalPledges);

    // console.log(totalPledges)
    
    // const goalPercentage = ((totalPledges / projectData.goal) * 100).toFixed(2)
    // setGoalPercentage(goalPercentage);


      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, [id]);

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
//     .then((results) => {
//         return results.json();
//     })
//     .then((data) => {
//         console.log(data)

//         if (data.detail === 'Not found.') {
//             setIsError(true)
//         } else {
//             setProjectData(data);
//             setCommentData(data);
//             setProjectPledgeAmount(data);
        
//             const totalPledges = data.pledges
//                 // eslint-disable-next-line eqeqeq
//                 .filter (pledge => pledge.project_id == id)
//                 // reducing your list to an output value
//                 .reduce ((sum, pledge) => sum + pledge.amount, 0)
//             setProjectPledgeAmount(totalPledges);
            
//             const goalPercentage = ((totalPledges / data.goal) * 100).toFixed(2)
//             setGoalPercentage(goalPercentage);
//         }
//     })
// }, []);



  // PRINT PLEDGES RELATED TO THE PROJECT
  // console.log(projectData.pledges)
  // console.log(commentData.comments)
  // console.log(projectData.goal)


  return (
  <div className="project-pg-container">

    <div className="project-card-page-col-1">

      <div className="project-card-img"> <div className="project-pg-container-left">
      <h2 className="project-card-title">{projectData.title}</h2> 
          
      <img src={projectData.image} /> </div>
        {/* <div className="project-card-txt"> */}
<div className="project-pg-container-left">
          <h4>Created at: {new Date(projectData.date_created).toDateString()}</h4>
          {/* <h3>{`Status: ${projectData.is_open}`}</h3> */}
          {/* <p> $Goal: {projectData.goal} </p> */}
          
          <p> Description: {projectData.description} </p></div>
        {/* </div> */}
      </div>
    </div>

    <div className="project-card-page-col-2">
      <div className="project-card-progressbar">
      <p> ${projectData.sum_pledges} of $Goal: {projectData.goal} </p>
      <ProgressBar/>

      {/* <h3>{projectData.is_open
            // '? :' are ternary oprators
                // '?' is if true
                // ':' is if false
                // what comes before the ? is the predicate aka 'what you write in the if statement'
                ? projectData.goal > projectPledgeAmount
                    ? "Currently Accepting Inventi-Cents! 💰"
                    : "We made a lot of money, please give more though 👀"
                : "Invention has been built."}</h3> */}
     
      </div>

      <div className="project-card-pledges">
      <div className="project-pg-container-sml-pledges">
        <ul>
        <h4>Pledges:</h4>
        {projectData.pledges &&
          projectData.pledges.map((pledgeData, key) => {
        return (
          <li key={key}>
          <p>$ {pledgeData.amount} from:  {pledgeData.supporter}
          {pledgeData.comment}</p>
          </li>
        );
        })}
        </ul> </div>
        <PledgeForm/>
      </div>

      <div className="project-card-comments">
      <div className="project-pg-container-sml-comments">
        <ul>
        <h4>Comments:</h4>
        {commentData.comments &&
        commentData.comments.map((commentData, key) => {
        return (
          <li key={key}>
          <p>{commentData.commentator}  says ... {commentData.title} </p>
          </li>
          );
          })}
          </ul></div>
        <CommentForm/>
      </div>
    </div>
  </div>

  );
}

export default ProjectPage;