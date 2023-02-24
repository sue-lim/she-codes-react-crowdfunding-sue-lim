import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

function HomePage() {
  // State
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);

//compare function to show latest stories 
function compare(a,b) {
  if (a.date_created < b.date_created) {
    return 1;
  }
  return 0;
  }
  const latestProject = projectList.sort(compare).slice(0,3); 

  return (
    <div>
      <h1 class="text-3xl font-bold underline"> The ScrubHub !</h1>
      <p> Our current projects - North & South of Perth Western Australia </p>
      <div id="project-list">
        {/* below commented out shows all stories */}
        {/* {projectList.map((project, key) => { */}
        {latestProject.map((project, key) => {
          return <ProjectCard key={key} projectData={project} />;
        })}
      </div>
    </div>
  );
}



export default HomePage;