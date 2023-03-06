import React from "react";

import "./ProgressBar.css";

const ProgressBar = ({ progressPercentage }) => {
  
  return (
    // parent div
      <div className='h-1 w-full bg-gray-300'> 
          {/* child div */}
          <div
              style={{ width: `${progressPercentage}%`}}
              className={`h-full ${
                  progressPercentage < 70 ? 'bg-red-600' : 'bg-green-600'}`}>
          </div>
      </div>
  );
};

// const ProgressBar = ({ goal, total }) => {
//   const progressPercentage = Math.round((total / goal) * 100) + "%";
//   const remainder = Math.round(goal - total, 2);
//   console.log(progressPercentage);
//   const progressStyle = {
//     width: progressPercentage,
//   };
//   return (
//     <div id="progress-container">
//       <div id="progress-bar">
//         <div style={progressStyle} id="progress"></div>
//       </div>
//       <h3 className="sub-text">
//         Progress: ${total} of ${goal}.
//       </h3>
//     </div>
//   );
// };


// const ProgressBar = (props) => {
//   const { bgcolor, completed } = props;
  
//   const containerStyles = {
//     height: 20,
//     width: '100%',
//     backgroundColor: "#e0e0de",
//     borderRadius: 50,
//     margin: 50
//   }

//   const fillerStyles = {
//     height: '100%',
//     width: `${completed}%`,
//     backgroundColor: bgcolor,
//     borderRadius: 'inherit',
//     textAlign: 'right'
//   }

//   const labelStyles = {
//     padding: 5,
//     color: 'white',
//     fontWeight: 'bold'
//   }

//   return (
//     <div style={containerStyles}>
//       <div style={fillerStyles}>
//         <span style={labelStyles}>{`${completed}%`}</span>
//       </div>
//     </div>
//   );
// };
export default ProgressBar;


// """Basically, the component consists of the two parts:

// the main parent div container - represents the whole bar
// the child div - completed part of the bar with the span which will show the completed percentage number.
// Our custom progress bar component will receive just two props:

// bgcolor - background color of the completed part of the bar
// completed - number between 0 and 100"""
