import React from "react";

import "./ProgressBar.css";

const ProgressBar = ({ goal, sum_pledges }) => {
  const progressPercentage = Math.round((sum_pledges / goal) * 100) + "%";
  const remainder = Math.round(goal - sum_pledges, 2);
  // const goalPercent = goal + "%";
  console.log(progressPercentage);
  const progressStyle = {
    width: progressPercentage,
  };
  const completeGoalStyle = {
    width: "100%",
  };

  return (
    
    <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
      <div className="progress-bar">
        {sum_pledges < goal ? (
          <div style={progressStyle} className="progress">{progressPercentage}</div>
        ) : (
          <div style={completeGoalStyle} className=""></div>
        )}
      </div>
      {/* test with the sum of the pledges & amount raised so far */}
      {sum_pledges < goal ? (
        <p className="sub-text">
          <b>${sum_pledges > 0 ? sum_pledges : "0"} raised</b> of ${goal} goal
        </p>
      ) : (
        <p>
          Success Goal reached! | ${sum_pledges} raised of ${goal} goal
        </p>
      )}
    </div>
  );
};

export default ProgressBar;

// Progress Bar - https://tonylea.com/creating-a-progress-bar-with-tailwind 