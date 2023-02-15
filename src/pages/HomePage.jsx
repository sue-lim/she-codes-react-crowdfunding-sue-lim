// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

// Data
import { allProjects } from "../data";


function HomePage() {
  return (
    <div id = "project-list">
      {allProjects.map((project, key) => {
        return <ProjectCard key={key} projectData={project} />;
      })}
    </div>
  );
}

export default HomePage;