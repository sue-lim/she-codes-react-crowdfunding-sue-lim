import { Link } from "react-router-dom";

// css 
import "./ProjectCard.css";

// component to extract the project data 
function ProjectCard(props) {
  const { projectData } = props;

  return (
    <div className="mx-3">
      {/* returning  project title  */}
      <h3>{projectData.title}</h3>

      {/* returning the data from the APR / URL  */}
      <Link to={`/projects/${projectData.id}`}>

        {/* returning the related imaes  */}
        <img src={projectData.image} />
        
      </Link>
    </div>
  );
}


// Export provides permission for it to be reused elsewhere in the project
export default ProjectCard;