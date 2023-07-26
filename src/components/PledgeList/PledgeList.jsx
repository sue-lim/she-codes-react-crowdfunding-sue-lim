import { Link } from "react-router-dom";

// component to extract the project data 
function PledgeList(props) {
  const { projectData } = props;

  //returning these from API / URL 
  return (
    <div className="pledge-list">
      <Link to={`/pledges/`}>
       
        
      </Link>
    </div>
  );
}


// Export provides permission for it to be reused elsewhere in the project
export default PledgeList;