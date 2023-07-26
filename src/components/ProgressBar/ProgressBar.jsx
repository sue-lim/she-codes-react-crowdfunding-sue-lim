import React from "react";

import "./ProgressBar.css";

// function fr a progress bar 
const ProgressBar = ({ goal, sum_pledges }) => {

  // Calculate the progress % based on the sum of pledges and the goal amt
  const progressPercentage = Math.round((sum_pledges / goal) * 100) + "%";

  // Calculate the remaining amount needed to reach the goal
  const remainder = Math.round(goal - sum_pledges, 2);

  console.log(progressPercentage);

   // Create a style for a progress bar object to represent the completed goal (100% width)
  const progressStyle = {
    width: progressPercentage,
  };
  const completeGoalStyle = {
    width: "100%",
  };

  // returns the style of the progress bar 
  return (
    
    <div className="h-6 relative max-w-l rounded-full overflow-hidden flex flex-auto">
      <div className="progress-bar">
         {/* Show the progress bar based on the sum of pledges and the goal */}
        {sum_pledges < goal ? (
          <div style={progressStyle} className="progress">{progressPercentage}</div>
        ) : (
          <div style={completeGoalStyle} className=""></div>
        )}
      </div >
      {/* Display the information about the progress */}
      {sum_pledges < goal ? (
        <div className="">
          <b>${sum_pledges > 0 ? sum_pledges : "0"} raised</b> of ${goal} goal
        </div>
      ) : ( 
        <p>
          Success Goal reached! | ${sum_pledges} raised of ${goal} goal
        </p>
      )}
    </div>
  );
};


// Export provides permission for it to be reused elsewhere in the project
export default ProgressBar;

// Progress Bar - https://tonylea.com/creating-a-progress-bar-with-tailwind 