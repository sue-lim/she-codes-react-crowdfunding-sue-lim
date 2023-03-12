import { Link } from "react-router-dom";

// CSS
import "./ProjectCard.css";

function ProjectCard(props) {
  const { projectData } = props;

  return (
    <div className="mx-3">
      <h3>{projectData.title}</h3>

      <Link to={`/projects/${projectData.id}`}>
        <img src={projectData.image} />
        
      </Link>
    </div>
  );
}

export default ProjectCard;