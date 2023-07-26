
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";


function AllProjectsPage() {

  // state variable with function to create an empty list to hold the list of porjects from the API 
  const [projectList, setProjectList] = useState([]);

  // hook to fetch the projects from the API 
  useEffect(() => {
    // fetching from projects url 
    fetch(`${import.meta.env.VITE_API_URL}projects`)
      .then((results) => {

        // returning results in a jsn format 
        return results.json();
      })
      .then((data) => {
        // sets the data projectlist into the list 
        setProjectList(data);
      });
  }, []);

//compare function to show latest stories 
// If a.date_created is less than b.date_created, the function returns 1.
// If a.date_created is greater than or equal to b.date_created, the function returns 0.
function compare(a,b) {
  if (a.date_created < b.date_created) {
    return 1;
  }
  return 0;
  }
  // creates a list of 3 latest projects 
  const latestProject = projectList.sort(compare).slice(0,3); 

  return (
    <div className="mx-10">
    <h6> Our current projects </h6>
    <h6>North & South of Perth Western Australia</h6>
    <div className="grid place-content-start md:place-content-center">
    <div id="project-list">
      {/* below commented out shows all stories */}
      {/* {projectList.map((project, key) => { */}
      {latestProject.map((project, key) => {
        return <ProjectCard key={key} projectData={project} />;
      })}
    </div>
    </div>
    </div>
  );
}



export default AllProjectsPage;